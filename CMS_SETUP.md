# CMS — Setup & Operations (Janmejai only)

The code is done and tested. These five steps need dashboard access, so they're yours.
**The CMS won't work until steps 1–4 are done.**

---

## How it works

```
Team member → /login → Supabase Auth
                ↓
             /admin  → writes to Supabase `posts` table  (RLS: must be in `authors`)
                ↓  clicks Publish
       Edge Function `publish`  → holds the Cloudflare deploy hook secret
                ↓
       Cloudflare Pages rebuild → `getPublishedPosts()` fetches published posts
                ↓
       Static HTML at /learn/<slug>/     ← public site never touches the DB
```

**The public site has zero database dependency.** Posts are baked into static HTML at build time.
If Supabase pauses, the live site is completely unaffected — only `/admin` stops working.

---

## Step 1 — Cloudflare: create a deploy hook

1. Cloudflare dashboard → **Workers & Pages** → your Pages project
2. **Settings → Builds & deployments → Deploy hooks**
3. **Add deploy hook**: name it `cms-publish`, branch `master`
4. **Copy the URL** — it looks like `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/xxxxx`

Treat it like a password. Anyone with it can trigger unlimited rebuilds.

## Step 2 — Supabase: store that hook as a secret

1. Supabase dashboard → project `mind-the-pour` → **Edge Functions → Secrets**
2. Add: name `CF_DEPLOY_HOOK`, value = the URL from step 1
3. Save

The `publish` function reads it server-side. It never reaches the browser.

## Step 3 — Cloudflare: build environment variables

**Settings → Environment variables** (Production). These must be present or the build fails:

| Name | Value |
|---|---|
| `PUBLIC_SUPABASE_URL` | `https://xfxblsgjvessuvebkqsf.supabase.co` |
| `PUBLIC_SUPABASE_ANON_KEY` | (same anon key as in your local `.env`) |

> The build **deliberately fails** if Supabase is configured but unreachable. That's the safety
> net: a failed build means Cloudflare keeps the last good deploy live, so a paused database can
> never silently wipe published posts off the site. If a deploy fails with a `[posts]` error,
> that's the guard working — wake the DB and redeploy.

## Step 4 — Supabase: turn OFF public signup ⚠️

**Authentication → Sign In / Providers → Email → disable "Allow new users to sign up"**

Right now **signups are enabled**, which means anyone can create an account against your anon key
(it's public in the page source). They still can't write posts or read drafts — the `authors`
allowlist blocks that — but there's no reason to let strangers create auth users. Turn it off.

## Step 5 — Add your team

For each person:

**a. Create the login** — Authentication → **Users → Add user**
- Enter email + password, tick **Auto Confirm User** (otherwise they can't sign in)

**b. Put them on the contributors allowlist** — SQL Editor:

```sql
insert into public.authors (id, email, name, role)
select id, email, 'Their Name', 'editor'
from auth.users
where email = 'their-email@example.com';
```

Roles: `editor` writes and publishes · `admin` also deletes. Make yourself `admin`.

**Signing in is not enough on its own** — without a row in `authors`, they get a clear
"not on the contributors list" message. That's the security model: the allowlist, not the password.

---

## Testing it end to end

1. Sign in at `/login/` yourself
2. Write a post, **Save draft** → confirm it appears in the list as `Draft`
3. **Publish** → you should see `✓ Published. It'll be live in about 2 minutes.`
4. Check Cloudflare → Deployments — a build should have started
5. After it finishes, visit `/learn/<your-slug>/`

If publish saves but the rebuild doesn't trigger, `CF_DEPLOY_HOOK` (step 2) is wrong or missing.
Check: Supabase → Edge Functions → `publish` → Logs.

---

## What's already done

- ✅ `posts` + `authors` tables, RLS policies, `updated_at`/`published_at` triggers
- ✅ `publish` Edge Function deployed (JWT-verified + allowlist-checked)
- ✅ `/login` and `/admin` built, `noindex`, excluded from sitemap
- ✅ Posts merge into `/learn/` — same URL space, same template, listed on the index, in the sitemap
- ✅ Markdown rendering, FAQ schema, canonical URLs
- ✅ Verified: unauthenticated `/admin` redirects to `/login`; bad passwords rejected;
  post → static HTML pipeline; build fails loudly when the DB is unreachable

## Known issues (not blocking)

- **`npm audit`**: Astro has a high-severity XSS advisory via `define:vars`. **We don't use
  `define:vars` anywhere**, so we're not exposed — but upgrade Astro when convenient.
- **Two pre-existing `SECURITY DEFINER` views** (`price_stats`, `state_price_summary`) flagged by
  the Supabase linter. They expose aggregate price data that's already public, so the risk is low.
  Worth cleaning up eventually.
- **Supabase free tier pauses after ~7 days idle.** Harmless for the public site by design. But if
  `/admin` won't load, the DB is asleep — open the Supabase dashboard to wake it.

---

## Operations

**Delete a post** (admins only, via UI — or SQL):
```sql
delete from public.posts where slug = 'the-slug';
```
Then trigger a rebuild (publish anything, or hit the deploy hook).

**Force a rebuild without the CMS**:
```bash
curl -X POST "<your CF_DEPLOY_HOOK url>"
```

**See all posts including drafts**:
```sql
select slug, title, status, updated_at from public.posts order by updated_at desc;
```
