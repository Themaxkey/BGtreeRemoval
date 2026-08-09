/**
 * Cloudflare Worker — the only server-side code in this project.
 *
 * Almost every request is a static file and goes straight to env.ASSETS.
 * The two exceptions are the contact form endpoint and a legacy sitemap
 * redirect left over from the WordPress site.
 *
 * Set these in the Cloudflare dashboard (Settings -> Variables and Secrets):
 *   LEAD_TO      where leads should arrive
 *   LEAD_FROM    a verified sender address on your domain
 *   RESEND_KEY   API key from resend.com  (secret, not a plain variable)
 */

interface Env {
  ASSETS: Fetcher;
  LEAD_TO?: string;
  LEAD_FROM?: string;
  RESEND_KEY?: string;
}

/** Rank Math served the sitemap here and Search Console still has that URL. */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/sitemap_index.xml': '/sitemap-index.xml',
  '/page-sitemap.xml':  '/sitemap-0.xml',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const legacy = LEGACY_REDIRECTS[url.pathname];
    if (legacy) return Response.redirect(new URL(legacy, url).href, 301);

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
      return handleLead(request, env, url);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleLead(request: Request, env: Env, url: URL): Promise<Response> {
  try {
    const form    = await request.formData();
    const name    = String(form.get('name') ?? '').trim();
    const phone   = String(form.get('phone') ?? '').trim();
    const email   = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const honey   = String(form.get('website') ?? '').trim(); // spam trap; real users leave it empty

    const done = () => Response.redirect(new URL('/contact/?sent=1', url).href, 303);

    if (honey) return done();
    if (!name || (!phone && !email)) {
      return new Response('Please give a name and either a phone number or an email address.', { status: 400 });
    }

    if (!env.RESEND_KEY || !env.LEAD_TO || !env.LEAD_FROM) {
      console.error('lead received but delivery is not configured', { name, phone, email });
      return new Response(
        'The form is not connected yet. Please call us instead — we will not have received this.',
        { status: 503 },
      );
    }

    const body = [
      `Name:    ${name}`,
      `Phone:   ${phone || '—'}`,
      `Email:   ${email || '—'}`,
      '',
      message || '(no message)',
      '',
      `Page:    ${request.headers.get('referer') ?? 'unknown'}`,
    ].join('\n');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.LEAD_FROM,
        to: [env.LEAD_TO],
        reply_to: email || undefined,
        subject: `New website lead — ${name}`,
        text: body,
      }),
    });

    if (!res.ok) {
      console.error('lead delivery failed', res.status, await res.text());
      return new Response('Could not send right now. Please call us instead.', { status: 502 });
    }
    return done();
  } catch (err) {
    console.error(err);
    return new Response('Unexpected error.', { status: 500 });
  }
}
