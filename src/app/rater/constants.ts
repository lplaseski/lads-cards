export const buildList = [
  'Crit Build',
  'DMG to Weakened Build',
  'Mix Build',
] as const;

export const stellactrumList = [
  'Emerald',
  'Sapphire',
  'Violet',
  'Amber',
  'Ruby',
  'Pearl',
] as const;

export const levelList = [0, 3, 6, 9, 12, 15] as const;

export const companionList = [
  { companion: 'Standard', scaling: 'ATK' },
  { companion: 'Lightseeker', scaling: 'ATK' },
  { companion: 'Lumiere', scaling: 'DEF' },
  { companion: 'Foreseer', scaling: 'DEF' },
  { companion: 'Master of Fate', scaling: 'ATK' },
  { companion: 'Abysswalker', scaling: 'ATK' },
  { companion: 'God of the Tides', scaling: 'HP' },
  { companion: 'Relentless Conqueror', scaling: 'ATK' },
  { companion: 'Abysm Sovereign', scaling: 'HP' },
  { companion: 'Farspace Colonel', scaling: 'DEF' },
  { companion: 'Ultimate Weapon X-02', scaling: 'ATK' },
] as const;

export const mainstatList = [
  { attribute: 'HP', initial: 1000, increment: 200 },
  { attribute: 'ATK', initial: 50, increment: 10 },
  { attribute: 'HP Bonus', initial: 3.0, increment: 0.5 },
  { attribute: 'ATK Bonus', initial: 3.0, increment: 0.5 },
  { attribute: 'DEF Bonus', initial: 3.0, increment: 0.5 },
  { attribute: 'Crit Rate', initial: 3.7, increment: 0.5 },
  { attribute: 'Crit DMG', initial: 7.4, increment: 1.0 },
  { attribute: 'Expedited Energy Boost', initial: 6.0, increment: 1.2 },
  { attribute: "Oath's Strength", initial: 3.5, increment: 0.7 },
  { attribute: 'Oath Recovery Boost', initial: 5.0, increment: 1.0 },
  { attribute: 'DMG Boost to Weakened', initial: 4.7, increment: 0.9 },
] as const;

export const substatList = [
  { attribute: 'HP', initial: 1200, increment: 600, minimum: 800 },
  { attribute: 'ATK', initial: 60, increment: 30, minimum: 40 },
  { attribute: 'DEF', initial: 30, increment: 15, minimum: 20 },
  { attribute: 'HP Bonus', initial: 10, increment: 5, minimum: 7 },
  { attribute: 'ATK Bonus', initial: 10, increment: 5, minimum: 7 },
  { attribute: 'DEF Bonus', initial: 10, increment: 5, minimum: 7 },
  { attribute: 'Crit Rate', initial: 1.6, increment: 0.8, minimum: 1.0 },
  { attribute: 'Crit DMG', initial: 3.2, increment: 1.6, minimum: 2.0 },
  { attribute: "Oath's Strength", initial: 1.2, increment: 0.6, minimum: 0.8 },
  {
    attribute: 'DMG Boost to Weakened',
    initial: 2.6,
    increment: 1.3,
    minimum: 1.8,
  },
  { attribute: '', initial: 0, increment: 0, minimum: 0 },
] as const;
