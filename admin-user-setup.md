# Admin User Setup Instructions

## Your Preferred Admin Credentials:
- **Email:** admin@example.com
- **Password:** chinnu_16

## Setup Steps:

### Step 1: Execute Database Schema (if not done already)
1. Go to your Supabase dashboard: https://xkqzeyddbxpphlmqedvt.supabase.co
2. Navigate to SQL Editor
3. Copy and paste the contents of `/app/supabase-setup.sql`
4. Execute the SQL script

### Step 2: Create Admin User with Your Credentials
1. Go to Authentication > Users in your Supabase dashboard
2. Click "Add user"
3. Fill in the details:
   - **Email:** admin@example.com
   - **Password:** chinnu_16
   - **Confirm password:** chinnu_16
4. Click "Add user"

### Step 3: Set Admin Role
1. After user is created, go to Database > Table Editor
2. Find the `profiles` table
3. Click "Insert" and add a new profile:
   - `user_id`: (copy the UUID from the auth.users table for admin@example.com)
   - `first_name`: Admin
   - `last_name`: User
   - `phone`: +1-555-ADMIN
   - `role`: admin
4. Save the profile

### Step 4: Test Admin Access
1. Go to your application login page: https://user-dashboard-29.preview.emergentagent.com/login
2. Use credentials:
   - Email: admin@example.com
   - Password: chinnu_16
3. After login, navigate to: https://user-dashboard-29.preview.emergentagent.com/admin
4. You should see the admin dashboard with real statistics

## Admin Features Available:
- **Dashboard:** `/admin` - View statistics, top dresses, recent users
- **Add Dress:** `/admin/add-dress` - Add new dresses with images
- **User Management:** `/admin/users` - Manage all registered users