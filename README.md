# Campus Carpool

A simple web app for university students to share rides.

## Features
- User login/signup
- Post and browse rides
- Real-time chat

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: Supabase

## Quick Start

1. **Install dependencies**
   ```bash
   cd backend && npm install
   cd frontend && npm install
   ```

2. **Set up Supabase**
   - Create project at [supabase.com](https://supabase.com)
   - Run `supabase_schema.sql` in SQL editor
   - Add environment variables to `.env` files

3. **Start the app**
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2  
   cd frontend && npm run dev
   ```

4. **Open** http://localhost:5173

## Environment Variables

**Frontend (.env)**
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

**Backend (.env)**
```
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
PORT=3001
``` 