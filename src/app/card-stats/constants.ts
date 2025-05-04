export const LOVE_INTERESTS = [
  'Xavier',
  'Rafayel',
  'Zayne',
  'Sylus',
  'Caleb',
] as const;
type LoveInterest = (typeof LOVE_INTERESTS)[number];

export const LOVE_INTERESTS_COLORS: Record<LoveInterest, string> = {
  Sylus: 'rgba(255, 99, 132, 0.2)',
  Zayne: 'rgba(54, 162, 235, 0.2)',
  Xavier: 'rgba(255, 206, 86, 0.2)',
  Caleb: 'rgba(75, 192, 192, 0.2)',
  Rafayel: 'rgba(153, 102, 255, 0.2)',
};

export const LOVE_INTERESTS_BORDER_COLORS: Record<LoveInterest, string> = {
  Sylus: 'rgba(255, 99, 132, 1)',
  Zayne: 'rgba(54, 162, 235, 1)',
  Xavier: 'rgba(255, 206, 86, 1)',
  Caleb: 'rgba(75, 192, 192, 1)',
  Rafayel: 'rgba(153, 102, 255, 1)',
};
