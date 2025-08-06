
# Campus Carpool Starter (Auth + Realtime Chat)

**What's included**
- Frontend (React + Vite) with Supabase Auth integration and Supabase Realtime chat subscription
- Backend (Express) using Supabase JS for DB operations (rides, requests)
- Supabase SQL schema (supabase_schema.sql)
- .env.example files and instructions

**How to use (quick)**
1. Create a Supabase project at https://app.supabase.com
2. Run `supabase_schema.sql` in the SQL editor to create tables.
3. In Supabase → Settings → API get `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
   - For server use, create a `SERVICE_ROLE` key and store it on the backend only.
4. Fill `.env` files from `.env.example` in `frontend` and `backend`.
5. Install & run locally:
   - Backend: `cd backend && npm install && npm run dev`
   - Frontend: `cd frontend && npm install && npm run dev`
6. Visit the frontend dev URL (usually http://localhost:5173)

**Notes**
- This is a starter scaffold. Add validation, security checks, and production settings before deploying.
- Realtime chat uses Supabase Realtime on the `Chat` table. The frontend subscribes to inserts.
