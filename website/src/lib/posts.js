import { marked } from 'marked';

/**
 * Fetches team-written posts from Supabase at BUILD time and reshapes them to
 * match the JSON explainer format, so /learn/[slug] can render both from one
 * code path.
 *
 * Failure policy is deliberate: if Supabase is configured but unreachable, we
 * throw and fail the build. Cloudflare Pages then keeps the last good deploy
 * live, so a paused/erroring database can never silently wipe published posts
 * off the site. Returning [] here would do exactly that.
 */
export async function getPublishedPosts() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      '[posts] PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY not set — ' +
      'building with JSON explainers only. Team posts will NOT appear.'
    );
    return [];
  }

  const query =
    'select=slug,title,seo_title,meta_description,pillar,intro,body,faqs,published_at' +
    '&status=eq.published&order=published_at.desc';

  let res;
  try {
    res = await fetch(`${url}/rest/v1/posts?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
  } catch (cause) {
    throw new Error(
      `[posts] Could not reach Supabase to fetch team posts. Failing the build ` +
      `on purpose so the last good deploy stays live. Cause: ${cause.message}`
    );
  }

  if (!res.ok) {
    throw new Error(
      `[posts] Supabase returned ${res.status} fetching team posts: ${await res.text()}`
    );
  }

  const rows = await res.json();
  console.log(`[posts] ${rows.length} team post(s) fetched from Supabase.`);
  return rows;
}

/** Post row -> the shape /learn/[slug] expects for listing/meta. */
export function toExplainer(p) {
  return {
    slug: p.slug,
    title: p.title,
    seoTitle: p.seo_title ?? undefined,
    metaDescription: p.meta_description ?? undefined,
    question: p.title,
    pillar: p.pillar,
    angle: p.intro,
    faqs: p.faqs ?? [],
    fromCms: true,
  };
}

/** Post row -> the shape /learn/[slug] expects for body content. */
export function toContent(p) {
  return {
    intro: p.intro,
    html: p.body ? marked.parse(p.body) : '',
    faqs: [],
  };
}
