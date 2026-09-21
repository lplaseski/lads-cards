import { unstable_cache } from 'next/cache';
import getSheetData from '@/actions/getSheetData';
import { getCardCategory, getCardImageUrl } from '@/common/cardUtils';
import { GalleryCard } from '@/common/galleryCards';

// Cached so prerendering every memory page shares one sheet read
const getGalleryCards = unstable_cache(
  async (): Promise<GalleryCard[]> => {
    const rows = await getSheetData('Sheet1');

    return rows
      .filter((card) => card.name && card.character)
      .map((card) => ({
        name: (card.name || '').trim(),
        character: card.character || '',
        category: getCardCategory(card),
        imageUrl: getCardImageUrl(card),
        stellacrum: card.stellacrum,
        time: card.time?.toLowerCase(),
        banner: card.banner,
        releaseDate: card.release_date || '',
        order: Number(card.order || 0),
        ytVideo: card.yt_video,
      }));
  },
  ['gallery-cards'],
  { revalidate: 60 }
);

export default getGalleryCards;
