import getGalleryCards from '@/actions/getGalleryCards';
import MemoriesGallery from './MemoriesGallery';

export default async function Home() {
  const cards = await getGalleryCards();

  return <MemoriesGallery cards={cards} />;
}
