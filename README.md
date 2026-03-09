# Test Supabase

A React + TypeScript + Vite application demonstrating Supabase integration with Edge Functions, RLS policies, and role-based access control.

## Features

- React 19 with TypeScript
- Supabase integration with typed client
- Edge Functions for serverless API
- Row Level Security (RLS) policies
- Role-based access control (RBAC)
- GitHub Actions CI/CD for Edge Functions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

3. Run database migrations:
```bash
supabase db push
```

4. Deploy Edge Functions:
```bash
supabase functions deploy get-user
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

- `/src` - React application
- `/src/db` - Supabase client and type definitions
- `/supabase/functions` - Edge Functions
- `/supabase/migrations` - Database schema migrations
