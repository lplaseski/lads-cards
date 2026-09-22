import { unstable_cache } from 'next/cache';
import getSheetData from '@/actions/getSheetData';
import { getCardCategory, getCardImageUrl } from '@/common/cardUtils';
import { GalleryCard } from '@/common/galleryCards';
import { CardType } from '@/common/types';

const toGalleryCards = (rows: CardType[], stars: 4 | 5): GalleryCard[] =>
  rows
    .filter((card) => card.name && card.character)
    .map((card) => {
      // Every Sheet2 row is a four-star card, which picks its image folder
      const row = stars === 4 ? { ...card, type: 'four-star' } : card;
      return {
        name: (row.name || '').trim(),
        character: row.character || '',
        category: getCardCategory(row),
        stars,
        imageUrl: getCardImageUrl(row),
        stellacrum: row.stellacrum,
        time: row.time?.toLowerCase(),
        banner: row.banner,
        releaseDate: row.release_date || '',
        order: Number(row.order || 0),
        ytVideo: row.yt_video,
      };
    });

// A myth's second memory (order 2) shares the video of its first (order 1)
const shareMythVideos = (cards: GalleryCard[]): GalleryCard[] =>
  cards.map((card) => {
    if (card.category !== 'Myth' || card.order !== 2) return card;
    const first = cards.find(
      (c) =>
        c.category === 'Myth' &&
        c.order === 1 &&
        c.character === card.character &&
        c.releaseDate === card.releaseDate
    );
    return first?.ytVideo ? { ...card, ytVideo: first.ytVideo } : card;
  });

// Cached so prerendering every memory page shares one sheet read
const getGalleryCards = unstable_cache(
  async (): Promise<GalleryCard[]> => {
    const [fiveStar, fourStar] = await Promise.all([
      getSheetData('Sheet1'),
      getSheetData('Sheet2'),
    ]);

    return shareMythVideos([
      ...toGalleryCards(fiveStar, 5),
      ...toGalleryCards(fourStar, 4),
    ]);
  },
  ['gallery-cards', 'with-four-star'],
  { revalidate: 60 }
);

export default getGalleryCards;
