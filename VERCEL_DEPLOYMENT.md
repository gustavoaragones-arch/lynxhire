# Vercel NOT_FOUND Fix Checklist

When the site works on localhost but Vercel shows **NOT_FOUND** (404):

## 1. Check Root Directory (most common cause)

- Vercel Dashboard → Your Project → **Settings** → **General**
- **Root Directory**: must be **empty** or **`.`** (repo root)
- If this is set to `Lynxhire` or any subfolder, Vercel looks for `package.json` there, doesn’t find it, and returns NOT_FOUND.
- **Fix:** Clear the Root Directory field and save. Redeploy.

## 2. Check Build Logs

- Vercel Dashboard → **Deployments** → latest deployment → **Building**
- If the build fails, the deployment has nothing to serve → NOT_FOUND.
- Fix any build errors (missing env vars, Node version, etc.).

## 3. Environment Variables

- **Settings** → **Environment Variables**
- Add any vars your app needs at build or runtime (e.g. `NEXT_PUBLIC_APP_URL`, Supabase keys).
- Redeploy after adding or changing variables.

## 4. Framework Preset

- **Settings** → **General** → **Framework Preset**
- Should be **Next.js**. If it’s “Other”, change it to Next.js.
- A `vercel.json` with `"framework": "nextjs"` is in the repo to help detection.

## 5. Node / Build Settings

- **Settings** → **General** → **Node.js Version**: e.g. **20.x** (LTS).
- **Build Command**: leave default (`npm run build` or `next build`) unless you use a custom script.
- **Output Directory**: leave default for Next.js (do not set to `.next`).

---

After changing settings, trigger a new deployment (e.g. push a commit or **Redeploy** on the latest deployment).
