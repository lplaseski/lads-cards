import getSheetData from '@/actions/getSheetData';
import { getCardCategory, getCardImageUrl } from '@/common/cardUtils';
import MemoriesGallery, { GalleryCard } from './MemoriesGallery';

export default async function Home() {
  const rows = await getSheetData('Sheet1');

  const cards: GalleryCard[] = rows
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

  return <MemoriesGallery cards={cards} />;
}
