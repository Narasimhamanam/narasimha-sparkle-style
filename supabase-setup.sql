-- Supabase Database Setup for Narasimha's Shopify Admin System

-- 1. Create dresses table
CREATE TABLE IF NOT EXISTS public.dresses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR NOT NULL,
    description TEXT,
    features TEXT[], -- Array of features
    sizes TEXT[], -- Array of available sizes
    colors TEXT[], -- Array of available colors
    images TEXT[], -- Array of base64 encoded images
    status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    request_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0
);

-- 2. Create dress_requests table to track user requests
CREATE TABLE IF NOT EXISTS public.dress_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dress_id UUID REFERENCES public.dresses(id) ON DELETE CASCADE,
    message TEXT,
    status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, dress_id)
);

-- 3. Create dress_likes table
CREATE TABLE IF NOT EXISTS public.dress_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dress_id UUID REFERENCES public.dresses(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, dress_id)
);

-- 4. Create dress_comments table
CREATE TABLE IF NOT EXISTS public.dress_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dress_id UUID REFERENCES public.dresses(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.dresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dress_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dress_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dress_comments ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for dresses table
CREATE POLICY "Everyone can view active dresses" ON public.dresses
    FOR SELECT USING (status = 'active');

CREATE POLICY "Only admins can insert dresses" ON public.dresses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Only admins can update dresses" ON public.dresses
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Only admins can delete dresses" ON public.dresses
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- 7. Create policies for dress_requests table
CREATE POLICY "Users can view their own requests" ON public.dress_requests
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own requests" ON public.dress_requests
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all requests" ON public.dress_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update requests" ON public.dress_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- 8. Create policies for dress_likes table
CREATE POLICY "Users can view all likes" ON public.dress_likes
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own likes" ON public.dress_likes
    FOR ALL USING (user_id = auth.uid());

-- 9. Create policies for dress_comments table
CREATE POLICY "Users can view all comments" ON public.dress_comments
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own comments" ON public.dress_comments
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own comments" ON public.dress_comments
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can delete any comments" ON public.dress_comments
    FOR DELETE USING (
        user_id = auth.uid() OR 
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- 10. Create functions to update counters
CREATE OR REPLACE FUNCTION public.update_dress_request_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.dresses 
        SET request_count = request_count + 1 
        WHERE id = NEW.dress_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.dresses 
        SET request_count = request_count - 1 
        WHERE id = OLD.dress_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_dress_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.dresses 
        SET like_count = like_count + 1 
        WHERE id = NEW.dress_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.dresses 
        SET like_count = like_count - 1 
        WHERE id = OLD.dress_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create triggers
CREATE TRIGGER update_dress_request_count_trigger
    AFTER INSERT OR DELETE ON public.dress_requests
    FOR EACH ROW EXECUTE FUNCTION public.update_dress_request_count();

CREATE TRIGGER update_dress_like_count_trigger
    AFTER INSERT OR DELETE ON public.dress_likes
    FOR EACH ROW EXECUTE FUNCTION public.update_dress_like_count();

-- 12. Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_updated_at_dresses
    BEFORE UPDATE ON public.dresses
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 13. Insert sample dresses data
INSERT INTO public.dresses (name, price, category, description, features, sizes, colors, images) VALUES
('Elegant Evening Gown', 299.00, 'evening', 'A stunning floor-length gown perfect for special occasions', 
 ARRAY['Floor-length design', 'Premium fabric blend', 'Elegant silhouette', 'Professional tailoring'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL'], 
 ARRAY['Black', 'Navy', 'Burgundy'], 
 ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop']),

('Casual Summer Dress', 149.00, 'casual', 'Light and breezy dress perfect for everyday wear', 
 ARRAY['Breathable fabric', 'Comfortable fit', 'Easy care', 'Versatile styling'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['White', 'Blue', 'Pink', 'Yellow'], 
 ARRAY['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop']),

('Business Professional', 199.00, 'professional', 'Sophisticated dress ideal for the workplace', 
 ARRAY['Professional cut', 'Wrinkle-resistant', 'Classic design', 'Quality construction'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL'], 
 ARRAY['Black', 'Navy', 'Gray', 'White'], 
 ARRAY['https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=500&fit=crop']),

('Party Cocktail Dress', 259.00, 'party', 'Eye-catching dress perfect for parties and celebrations', 
 ARRAY['Statement design', 'Premium materials', 'Flattering fit', 'Party-ready styling'], 
 ARRAY['XS', 'S', 'M', 'L'], 
 ARRAY['Red', 'Black', 'Gold', 'Silver'], 
 ARRAY['https://images.unsplash.com/photo-1566479179817-c0e5deb2e22c?w=400&h=500&fit=crop']);

-- Note: Execute this SQL in your Supabase SQL Editor
-- After running this, you'll need to create an admin user manually through Supabase Auth