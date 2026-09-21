import { CardType } from './types';

export const CHARACTERS = ['Xavier', 'Zayne', 'Rafayel', 'Sylus', 'Caleb'];

export const getVideoUrl = (url: string) => {
  const urlObj = new URL(url);
  if (urlObj.searchParams.get('list')) {
    return `https://www.youtube.com/embed/videoseries?list=${urlObj.searchParams.get('list')}`;
  }
  return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`;
};

export const getCardImageUrl = ({ name, type, character }: CardType) => {
  let folder = 'limited';
  if (type === 'standard') {
    folder = 'standard';
  } else if (type?.includes('myth')) {
    folder = 'myths';
  } else if (type === 'four-star') {
    folder = 'four-star';
  }

  const extension = type === 'four-star' ? 'png' : 'jpeg';

  return `/${folder}/${character}_${encodeURIComponent((name || '').replaceAll(' ', '_').replaceAll("'", ''))}.${extension}`;
};

export const getCardCategory = ({ type, banner }: CardType) => {
  if (type === 'four-star') return '4-Star';
  if (type?.startsWith('myth')) return 'Myth';
  if (type === 'free') return 'Free';
  if (banner === 'solo') return 'Solo';
  if (banner === 'birthday') return 'Birthday';
  if (type === 'standard') return 'Standard';
  return 'Limited';
};

export const CATEGORIES = [
  'Myth',
  'Limited',
  'Standard',
  'Solo',
  'Birthday',
  'Free',
  '4-Star',
];
