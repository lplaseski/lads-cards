import type { MetadataRoute } from 'next';
import getGalleryCards from '@/actions/getGalleryCards';
import { getCardHref } from '@/common/galleryCards';
import { SITE_URL } from '@/common/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cards = await getGalleryCards();
  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/four-star`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/card-stats`, changeFrequency: 'daily', priority: 0.6 },
    ...cards.map((card) => ({
      url: `${SITE_URL}${getCardHref(card)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
