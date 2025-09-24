import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, ShoppingBag, Heart, MessageCircle, TrendingUp, Plus, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { dressService } from "@/services/dressService";
import { userService } from "@/services/userService";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDresses: 0,
    totalLikes: 0,
    totalRequests: 0
  });
  const [topDresses, setTopDresses] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load statistics
      const [dressStats, userStats, recentUsersData] = await Promise.all([
        dressService.getDressStatistics(),
        userService.getUserStatistics(),
        userService.getRecentUsers(3)
      ]);

      setStats({
        totalUsers: userStats.totalUsers,
        totalDresses: dressStats.totalDresses,
        totalLikes: dressStats.totalLikes,
        totalRequests: dressStats.totalRequests
      });

      setTopDresses(dressStats.topDresses);
      setRecentUsers(recentUsersData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        variant: "destructive",
        title: "Error loading dashboard",
        description: "Could not load dashboard data. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      title: "Total Users",
      value: stats.totalUsers.toString(),
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Dresses",
      value: stats.totalDresses.toString(),
      change: "+5%",
      icon: ShoppingBag,
      color: "text-green-500",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes.toString(),
      change: "+18%",
      icon: Heart,
      color: "text-pink-500",
    },
    {
      title: "Total Requests",
      value: stats.totalRequests.toString(),
      change: "+23%",
      icon: MessageCircle,
      color: "text-purple-500",
    },
  ];

  const quickActions = [
    { title: "Add New Dress", icon: Plus, href: "/admin/add-dress", color: "btn-hero" },
    { title: "View All Users", icon: Users, href: "/admin/users", color: "btn-hero-outline" },
    { title: "Manage Requests", icon: ShoppingBag, href: "/admin/requests", color: "btn-hero-outline" },
    { title: "Analytics", icon: TrendingUp, href: "/admin/analytics", color: "btn-hero-outline" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>
          <Link to="/admin/add-dress">
            <Button className="btn-hero">
              <Plus className="w-4 h-4 mr-2" />
              Add New Dress
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-500 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Card className="card-premium hover:scale-105 transition-transform cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold">{action.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Requested Dresses */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Top Requested Dresses</span>
                <Link to="/admin/dresses">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDresses.length > 0 ? (
                  topDresses.map((dress) => (
                    <div key={dress.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                      <img
                        src={dress.images?.[0] || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop"}
                        alt={dress.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{dress.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{dress.request_count || 0} requests</span>
                          <span>{dress.like_count || 0} likes</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{dress.status}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4" />
                    <p>No dresses found. Add some dresses to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Users</span>
                <Link to="/admin/users">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">
                          {user.first_name} {user.last_name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Role: {user.role}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{user.requestsMade || 0} requests</span>
                          <span>{user.likesCount || 0} likes</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Joined</p>
                        <p className="text-sm font-medium">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Users className="w-12 h-12 mx-auto mb-4" />
                    <p>No users found yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart Placeholder */}
        <div className="mt-8">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Weekly Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Chart</h3>
                  <p className="text-muted-foreground">
                    Interactive charts and graphs will be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;