import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  totalRequests: number;
  totalLikes: number;
}

export interface UserWithStats extends Profile {
  email?: string;
  requestsMade: number;
  likesCount: number;
  commentsCount: number;
  lastActive: string;
  status: 'Active' | 'Inactive';
}

class UserService {
  // Get all users with their statistics (admin only)
  async getAllUsersWithStats(): Promise<UserWithStats[]> {
    // First get all profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) throw profilesError;

    if (!profiles) return [];

    // Get auth users to get email addresses
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
    
    // Create a map of user_id to email
    const userEmailMap = new Map();
    if (!usersError && users) {
      users.forEach(user => {
        userEmailMap.set(user.id, user.email);
      });
    }

    // For each profile, get their stats
    const usersWithStats: UserWithStats[] = await Promise.all(
      profiles.map(async (profile) => {
        // Get request count
        const { count: requestCount } = await supabase
          .from('dress_requests')
          .select('*', { count: 'exact' })
          .eq('user_id', profile.user_id);

        // Get likes count
        const { count: likesCount } = await supabase
          .from('dress_likes')
          .select('*', { count: 'exact' })
          .eq('user_id', profile.user_id);

        // Get comments count
        const { count: commentsCount } = await supabase
          .from('dress_comments')
          .select('*', { count: 'exact' })
          .eq('user_id', profile.user_id);

        // Get latest activity (most recent request, like, or comment)
        const activities = await Promise.all([
          supabase
            .from('dress_requests')
            .select('created_at')
            .eq('user_id', profile.user_id)
            .order('created_at', { ascending: false })
            .limit(1),
          supabase
            .from('dress_likes')
            .select('created_at')
            .eq('user_id', profile.user_id)
            .order('created_at', { ascending: false })
            .limit(1),
          supabase
            .from('dress_comments')
            .select('created_at')
            .eq('user_id', profile.user_id)
            .order('created_at', { ascending: false })
            .limit(1)
        ]);

        let lastActivity = profile.created_at;
        activities.forEach(({ data }) => {
          if (data && data.length > 0) {
            const activityDate = data[0].created_at;
            if (new Date(activityDate) > new Date(lastActivity)) {
              lastActivity = activityDate;
            }
          }
        });

        // Calculate time since last activity
        const lastActiveTime = this.getTimeSince(lastActivity);
        
        // Determine status based on last activity (active if within 7 days)
        const daysSinceActive = Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24));
        const status: 'Active' | 'Inactive' = daysSinceActive <= 7 ? 'Active' : 'Inactive';

        return {
          ...profile,
          email: userEmailMap.get(profile.user_id) || 'N/A',
          requestsMade: requestCount || 0,
          likesCount: likesCount || 0,
          commentsCount: commentsCount || 0,
          lastActive: lastActiveTime,
          status
        };
      })
    );

    return usersWithStats;
  }

  // Get user statistics for dashboard
  async getUserStatistics(): Promise<UserStats> {
    // Get total users count
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' });

    // Get total requests count
    const { count: totalRequests } = await supabase
      .from('dress_requests')
      .select('*', { count: 'exact' });

    // Get total likes count
    const { count: totalLikes } = await supabase
      .from('dress_likes')
      .select('*', { count: 'exact' });

    // Calculate active users (users with activity in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [requests, likes, comments] = await Promise.all([
      supabase
        .from('dress_requests')
        .select('user_id')
        .gte('created_at', sevenDaysAgo.toISOString()),
      supabase
        .from('dress_likes')
        .select('user_id')
        .gte('created_at', sevenDaysAgo.toISOString()),
      supabase
        .from('dress_comments')
        .select('user_id')
        .gte('created_at', sevenDaysAgo.toISOString())
    ]);

    const activeUserIds = new Set();
    [requests, likes, comments].forEach(({ data }) => {
      if (data) {
        data.forEach(item => activeUserIds.add(item.user_id));
      }
    });

    return {
      totalUsers: totalUsers || 0,
      activeUsers: activeUserIds.size,
      totalRequests: totalRequests || 0,
      totalLikes: totalLikes || 0
    };
  }

  // Get recent users for dashboard
  async getRecentUsers(limit: number = 5) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Get their stats
    const usersWithStats = await Promise.all(
      (data || []).map(async (profile) => {
        const { count: requestCount } = await supabase
          .from('dress_requests')
          .select('*', { count: 'exact' })
          .eq('user_id', profile.user_id);

        const { count: likesCount } = await supabase
          .from('dress_likes')
          .select('*', { count: 'exact' })
          .eq('user_id', profile.user_id);

        return {
          ...profile,
          requestsMade: requestCount || 0,
          likesCount: likesCount || 0
        };
      })
    );

    return usersWithStats;
  }

  // Update user role (admin only)
  async updateUserRole(userId: string, role: string) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Helper function to format time since
  private getTimeSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffSeconds < 60) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
    }
  }
}

export const userService = new UserService();