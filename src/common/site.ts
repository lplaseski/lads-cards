// Canonical site URL used for metadata, sitemap and robots.
// Set NEXT_PUBLIC_SITE_URL to override (e.g. a custom domain); on Vercel this
// falls back to the production deployment URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const SITE_NAME = 'Love and Deepspace Memory List';

export const SITE_DESCRIPTION =
  'Browse every Love and Deepspace memory card for Xavier, Zayne, Rafayel, Sylus and Caleb';
