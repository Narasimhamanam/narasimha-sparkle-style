# Admin Setup Instructions for Narasimha's Shopify

## Database Setup

### Step 1: Execute Database Schema
1. Go to your Supabase project dashboard: https://xkqzeyddbxpphlmqedvt.supabase.co
2. Navigate to the SQL Editor
3. Copy and paste the contents of `/app/supabase-setup.sql`
4. Execute the SQL script
5. This will create all necessary tables, policies, and sample data

### Step 2: Create Admin User

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add user"
3. Fill in the details:
   - Email: `admin@narasimhas-shopify.com`
   - Password: `Admin123!@#`
   - Confirm password: `Admin123!@#`
4. Click "Add user"
5. After user is created, go to Database > Table Editor
6. Find the `profiles` table
7. Click "Insert" and add a new profile:
   - `user_id`: (copy the UUID from the auth.users table)
   - `first_name`: Admin
   - `last_name`: User
   - `phone`: +1-555-ADMIN
   - `role`: admin
8. Save the profile

**Option B: Using SQL (Alternative)**
```sql
-- First, insert the user into auth.users (this might not work in SQL editor due to auth restrictions)
-- You'll need to use the Supabase dashboard for user creation

-- Then, after creating the user via dashboard, run this SQL:
INSERT INTO public.profiles (user_id, first_name, last_name, phone, role)
VALUES (
  'REPLACE_WITH_ACTUAL_USER_ID_FROM_AUTH_USERS_TABLE',
  'Admin',
  'User', 
  '+1-555-ADMIN',
  'admin'
);
```

### Step 3: Test Admin Access

**Admin Login Credentials:**
- Email: `admin@narasimhas-shopify.com`
- Password: `Admin123!@#`

**Test Steps:**
1. Go to your application login page
2. Use the admin credentials above
3. After login, navigate to `/admin`
4. You should see the admin dashboard
5. Test accessing `/admin/add-dress` and `/admin/users`

## What's Included

### Database Tables Created:
- `dresses` - Store dress information
- `dress_requests` - Track user requests for dresses
- `dress_likes` - Track user likes on dresses  
- `dress_comments` - Store user comments on dresses

### Sample Data:
- 4 sample dresses with different categories
- Proper pricing and descriptions
- Sample images from Unsplash

### Security:
- Row Level Security (RLS) enabled
- Proper policies for admin-only operations
- User-specific data access controls

### Admin Features Ready:
- View all dresses and manage them
- See user statistics and management
- Add new dresses with full details
- Track requests, likes, and comments

## Next Steps

After setting up the database and admin user:
1. The admin dashboard will show real data
2. Add Dress functionality will work with the database
3. User Management will show real registered users
4. All admin features will be fully functional

## Troubleshooting

If you encounter issues:
1. Make sure the SQL script executed without errors
2. Verify the admin user was created in auth.users
3. Check that the profile was created with role='admin'
4. Ensure RLS policies are active
5. Test with the exact credentials provided above