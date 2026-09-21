export interface GalleryCard {
  name: string;
  character: string;
  category: string;
  stars: 4 | 5;
  imageUrl: string;
  stellacrum?: string;
  time?: string;
  banner?: string;
  releaseDate: string;
  order: number;
  ytVideo?: string;
}

export const getCardSlug = (name: string) =>
  name
    .toLowerCase()
    .replaceAll("'", '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const getCardHref = ({ character, name }: GalleryCard) =>
  `/memories/${character.toLowerCase()}/${getCardSlug(name)}`;

export const formatReleaseDate = (date: string) => {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return date;
  const [, y, m, d] = match.map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};
