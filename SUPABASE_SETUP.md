# Supabase Setup Checklist

## After running supabase-schema.sql, do these steps in Supabase Dashboard:

### 1. Enable Realtime on messages table

- Go to **Database → Replication**
- Under "Tables", find `public.messages`
- Toggle **ON** for INSERT events

### 2. Storage Buckets

- Create bucket `resumes` (private)
- Create bucket `logos` (public)
- Create bucket `profile-photos` (public)

### 3. Storage Policies for `resumes` bucket

Run in SQL Editor:

```sql
CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can view own resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);
```

### 4. Storage Policies for `logos` bucket

```sql
CREATE POLICY "Authenticated users can upload logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

CREATE POLICY "Anyone can view logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'logos');
```

### 5. Stripe Setup

- Create 3 products in Stripe Dashboard (Starter $149, Growth $299, Candidate Premium $19)
- Copy Price IDs to `.env.local`
- Set up webhook endpoint: `https://lynxhire.ca/api/stripe/webhook`
- Events to listen to: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 6. Google OAuth (optional)

- In Supabase: **Authentication → Providers → Google** → Enable
- Add Google Client ID and Secret
- Authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
