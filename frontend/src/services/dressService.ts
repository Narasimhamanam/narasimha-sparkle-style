import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Dress = Database['public']['Tables']['dresses']['Row'];
type DressInsert = Database['public']['Tables']['dresses']['Insert'];
type DressUpdate = Database['public']['Tables']['dresses']['Update'];

export interface DressFormData {
  name: string;
  price: number;
  category: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  images: string[];
}

class DressService {
  // Get all dresses (for admin dashboard)
  async getAllDresses() {
    const { data, error } = await supabase
      .from('dresses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get active dresses (for public shop)
  async getActiveDresses() {
    const { data, error } = await supabase
      .from('dresses')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get dress by ID
  async getDressById(id: string) {
    const { data, error } = await supabase
      .from('dresses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Create new dress (admin only)
  async createDress(dressData: DressFormData) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('User not authenticated');

    const insertData: DressInsert = {
      name: dressData.name,
      price: dressData.price,
      category: dressData.category,
      description: dressData.description,
      features: dressData.features,
      sizes: dressData.sizes,
      colors: dressData.colors,
      images: dressData.images,
      created_by: user.id,
      status: 'active'
    };

    const { data, error } = await supabase
      .from('dresses')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update dress (admin only)
  async updateDress(id: string, updates: Partial<DressFormData>) {
    const updateData: DressUpdate = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('dresses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete dress (admin only)
  async deleteDress(id: string) {
    const { error } = await supabase
      .from('dresses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Update dress status (admin only)
  async updateDressStatus(id: string, status: 'active' | 'inactive' | 'draft') {
    const { data, error } = await supabase
      .from('dresses')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get dress statistics for dashboard
  async getDressStatistics() {
    // Get total dresses count
    const { count: totalDresses } = await supabase
      .from('dresses')
      .select('*', { count: 'exact' });

    // Get active dresses count
    const { count: activeDresses } = await supabase
      .from('dresses')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    // Get total requests count
    const { count: totalRequests } = await supabase
      .from('dress_requests')
      .select('*', { count: 'exact' });

    // Get total likes count
    const { count: totalLikes } = await supabase
      .from('dress_likes')
      .select('*', { count: 'exact' });

    // Get top requested dresses
    const { data: topDresses } = await supabase
      .from('dresses')
      .select('*')
      .order('request_count', { ascending: false })
      .limit(5);

    return {
      totalDresses: totalDresses || 0,
      activeDresses: activeDresses || 0,
      totalRequests: totalRequests || 0,
      totalLikes: totalLikes || 0,
      topDresses: topDresses || []
    };
  }

  // Convert image file to base64 (for image uploads)
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Process multiple image files to base64
  async processImages(files: FileList): Promise<string[]> {
    const imagePromises = Array.from(files).map(file => this.fileToBase64(file));
    return Promise.all(imagePromises);
  }
}

export const dressService = new DressService();