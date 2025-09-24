# Backend Setup Instructions

## ✅ Frontend Syntax Error Fixed
The syntax error in `sign-up/page.tsx` has been resolved.

## 🔧 Backend Setup Steps

### 1. Get Your Supabase Credentials

From your Supabase dashboard (the connection interface you showed earlier):

1. **Project URL**: 
   - Go to your Supabase project settings
   - Copy the "Project URL" (looks like: `https://abcdefghijklmnop.supabase.co`)

2. **Anon Key**:
   - In the same settings page
   - Copy the "anon/public" key (long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. Update Your .env File

Replace the placeholder values in `Frontend/Backend/.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key-here
PORT=5000
```

### 3. Create a Tasks Table in Supabase

In your Supabase SQL editor, run:

```sql
-- Create tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create a policy for authenticated users (optional)
CREATE POLICY "Users can view their own tasks" ON tasks
  FOR ALL USING (auth.uid() IS NOT NULL);
```

### 4. Start Your Backend Server

```bash
cd Frontend/Backend
npm run dev
```

### 5. Test Your Backend

Once running, test these endpoints:

- **Test connection**: `http://localhost:5000/test`
- **Get tasks**: `http://localhost:5000/task`
- **Insert sample data**: `POST http://localhost:5000/insert-sample-data`
- **Insert single task**: `POST http://localhost:5000/insert-sample-task`

## 🚀 Available Endpoints

- `GET /test` - Test server connection
- `GET /task` - Get all tasks
- `POST /task` - Create a new task
- `POST /insert-sample-data` - Insert 5 sample tasks
- `POST /insert-sample-task` - Insert a single sample task

## 📝 Sample Task Data

The backend includes endpoints to insert sample data:

```json
{
  "title": "Setup Database",
  "description": "Configure Supabase connection and create tables",
  "status": "completed"
}
```

## 🔍 Troubleshooting

If you get "Invalid URL" error:
- Make sure your SUPABASE_URL starts with `https://`
- Make sure your SUPABASE_ANON_KEY is the full key from Supabase

If you get database errors:
- Make sure the "tasks" table exists in your Supabase database
- Check that your Supabase credentials are correct
