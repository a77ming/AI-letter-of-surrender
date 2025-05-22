import type { CSSProperties } from 'react';

export interface RarityLevel {
  id: string;
  name: string;
  probability: number;
  borderColor?: string; 
  borderClassName?: string;

  // New properties for enhanced visuals:
  cardBackgroundClassName?: string;
  titleFontClassName?: string;
  textColorClassName?: string;
  animationClassName?: string; // e.g., 'animate-pulse', 'animate-bounce' (standard) or custom like 'animate-shimmer-bg'
  flairIcon?: string; // Emoji or simple SVG string
  customCardStyles?: CSSProperties; 
  customTitleStyles?: CSSProperties;
}

export const rarityLevels: RarityLevel[] = [
  {
    id: 'R',
    name: '普通',
    probability: 70,
    borderClassName: 'border-gray-400 dark:border-gray-500',
    cardBackgroundClassName: 'bg-opacity-50 dark:bg-opacity-50',
  },
  {
    id: 'SR',
    name: '稀有',
    probability: 20,
    borderClassName: 'border-sky-500 dark:border-sky-400 border-2',
    titleFontClassName: 'font-semibold',
    cardBackgroundClassName: 'bg-opacity-70 dark:bg-opacity-70',
  },
  {
    id: 'SSR',
    name: '超稀有',
    probability: 7,
    borderClassName: 'border-purple-500 dark:border-purple-400 border-2 shadow-md shadow-purple-500/50',
    cardBackgroundClassName: 'bg-gradient-to-tr from-purple-500/10 via-transparent to-purple-500/10',
    titleFontClassName: 'font-bold text-purple-600 dark:text-purple-400',
    animationClassName: 'animate-pulse', // Standard Tailwind pulse
  },
  {
    id: 'UR',
    name: '终极',
    probability: 2,
    borderClassName: 'border-amber-400 dark:border-amber-300 border-3 shadow-lg shadow-amber-400/60',
    cardBackgroundClassName: 'bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/20', // Removed transform scale for now, can be in customCardStyles or component
    titleFontClassName: 'font-extrabold text-amber-500 dark:text-amber-300', // Removed text-glow-gold (custom)
    animationClassName: 'animate-bounce', // Standard Tailwind bounce
    flairIcon: '⭐',
    customTitleStyles: { textShadow: '0 0 5px #FBBF24' }, // Gold glow for title
  },
  {
    id: 'MR',
    name: '神话',
    probability: 1,
    borderClassName: 'border-rose-600 dark:border-rose-500 border-4 ring-4 ring-rose-500 dark:ring-rose-400 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800 shadow-2xl shadow-rose-600/80 dark:shadow-rose-500/80',
    cardBackgroundClassName: 'bg-gradient-radial from-rose-500/30 via-transparent to-transparent filter saturate-150',
    titleFontClassName: 'font-black tracking-wider', // Removed text-glow-rose (custom)
    animationClassName: 'animate-shimmer-bg', // Placeholder for custom shimmer animation
    flairIcon: '✨👑✨',
    textColorClassName: 'text-white', // Force white text for contrast
    customCardStyles: { transform: 'rotate(1deg) scale(1.02)', boxShadow: '0 0 30px #E11D48, 0 0 15px #E11D48 inset' },
    customTitleStyles: { 
      background: 'linear-gradient(to right, #F43F5E, #FECDD3, #F43F5E)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 8px #F43F5E',
    },
  }
];

// Helper function to get rarity by ID
export const getRarityById = (id: string): RarityLevel | undefined =>
  rarityLevels.find(r => r.id === id);

// Helper function for weighted random selection
export const getRandomRarity = (): RarityLevel => {
  const totalProbability = 100; // Probabilities are percentages summing to 100
  let randomPoint = Math.random() * totalProbability;

  for (const level of rarityLevels) {
    if (randomPoint < level.probability) {
      return level;
    }
    randomPoint -= level.probability;
  }
  // Fallback: should ideally not be reached if probabilities sum to 100 correctly.
  // This can happen if Math.random() is exactly 1.0 and totalProbability is 100,
  // making randomPoint start at 100. After subtracting all probabilities, randomPoint would be 0.
  // Or if there's a slight floating point imprecision.
  // Returning the last level or the first one are common fallbacks.
  // Given the loop structure, if randomPoint becomes 0 or negative after some subtractions,
  // the next level.probability (which is > 0) will satisfy `randomPoint < level.probability`.
  // The only way to fall through is if randomPoint is still positive after all subtractions,
  // which implies sum of probabilities was less than totalProbability, or randomPoint was initially >= totalProbability.
  // Since Math.random() is [0, 1), randomPoint will be [0, 100).
  // If it's exactly 0, the first level (R) is chosen.
  // The loop should correctly distribute.
  return rarityLevels[rarityLevels.length - 1]; // Fallback to the last rarity if loop finishes
};

// Verify sum of probabilities
const sumProbabilities = rarityLevels.reduce((sum, level) => sum + level.probability, 0);
if (sumProbabilities !== 100) {
  console.warn(`Sum of rarity probabilities is ${sumProbabilities}, not 100. getRandomRarity() might not behave as expected.`);
}
