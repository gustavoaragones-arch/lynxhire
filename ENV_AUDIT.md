# LynxHire Environment Variable Audit

## Required for Basic Operation (app crashes without these)

| Variable                     | Where Used                          | Status   |
| ---------------------------- | ----------------------------------- | -------- |
| NEXT_PUBLIC_SUPABASE_URL     | All Supabase calls                  | Must be set |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Browser Supabase client           | Must be set |
| SUPABASE_SERVICE_ROLE_KEY    | Webhook handler, admin ops          | Must be set |
| NEXT_PUBLIC_APP_URL          | OG tags, Stripe redirects, sitemap | Must be set |

## Required for AI Features

| Variable           | Where Used                                    | Status   |
| ------------------ | --------------------------------------------- | -------- |
| ANTHROPIC_API_KEY  | /api/ai/generate-job, /api/ai/match-score     | Must be set |

## Required for Billing

| Variable                            | Where Used           | Status   |
| ----------------------------------- | -------------------- | -------- |
| STRIPE_SECRET_KEY                   | All Stripe API calls | Must be set |
| STRIPE_WEBHOOK_SECRET               | /api/stripe/webhook  | Must be set |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  | (reserved for future client use) | Set it anyway |
| STRIPE_STARTER_PRICE_ID             | Checkout for Starter plan | Must be set |
| STRIPE_GROWTH_PRICE_ID              | Checkout for Growth plan  | Must be set |
| STRIPE_CANDIDATE_PREMIUM_PRICE_ID   | Checkout for Candidate Premium | Must be set |

## Production Checklist

- [ ] NEXT_PUBLIC_APP_URL = https://www.lynxhire.ca (not localhost)
- [ ] All Stripe Price IDs are LIVE mode (not test mode) for production
- [ ] STRIPE_WEBHOOK_SECRET matches the production webhook endpoint secret
- [ ] Supabase project is on a paid plan (for production traffic)
- [ ] Auth → URL Configuration → Site URL = https://www.lynxhire.ca
- [ ] Auth → URL Configuration → Redirect URLs includes https://www.lynxhire.ca/**

## Security Rules

- NEVER commit .env.local to git (it's in .gitignore)
- SUPABASE_SERVICE_ROLE_KEY must NEVER appear in client components
- STRIPE_SECRET_KEY must NEVER appear in client components
- ANTHROPIC_API_KEY must NEVER appear in client components
