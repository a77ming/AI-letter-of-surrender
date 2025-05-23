import type { CSSProperties } from 'react';

export interface RarityLevel {
  id: string;
  name: string;
  probability: number;
  borderClassName?: string;
  cardBackgroundClassName?: string;
  textColorClassName?: string;
  titleFontClassName?: string;
  animationClassName?: string;
  flairIcon?: string;
  customCardStyles?: CSSProperties;
  customTitleStyles?: CSSProperties;
}

export const rarityLevels: RarityLevel[] = [
  { // R (普通) - White/Light Theme
    id: 'R',
    name: '普通',
    probability: 70,
    borderClassName: 'border-gray-300 dark:border-gray-500', // No glow
    cardBackgroundClassName: 'bg-white dark:bg-gray-200', // Slightly darker dark mode background
    textColorClassName: 'text-gray-900 dark:text-gray-900', // Consistently dark text
    customCardStyles: {}, // Ensure no boxShadow
    // titleFontClassName: '', // Default text color will apply
  },
  { // SR (稀有) - Green Theme
    id: 'SR',
    name: '稀有',
    probability: 20,
    borderClassName: 'border-2 border-green-500 dark:border-green-400 shadow-[0_0_15px_#10B981] dark:shadow-[0_0_15px_#34D399]',
    cardBackgroundClassName: 'bg-green-300 dark:bg-green-700',
    textColorClassName: 'text-green-900 dark:text-green-50',
    customCardStyles: {}, // Remove previous boxShadow
    titleFontClassName: 'font-semibold text-green-700 dark:text-green-200',
    // animationClassName: '',
    // flairIcon: '',
  },
  { // SSR (超稀有) - Blue Theme
    id: 'SSR',
    name: '超稀有',
    probability: 7,
    borderClassName: 'border-2 border-blue-500 dark:border-blue-400 shadow-[0_0_18px_#3B82F6] dark:shadow-[0_0_18px_#60A5FA]',
    cardBackgroundClassName: 'bg-blue-300 dark:bg-blue-700',
    textColorClassName: 'text-blue-900 dark:text-blue-50',
    customCardStyles: {}, // Remove previous boxShadow
    titleFontClassName: 'font-bold text-blue-700 dark:text-blue-200',
    animationClassName: 'animate-pulse', // Retain
    // flairIcon: '',
  },
  { // UR (终极) - Purple Theme
    id: 'UR',
    name: '终极',
    probability: 2,
    borderClassName: 'border-2 border-purple-500 dark:border-purple-400 shadow-[0_0_22px_#8B5CF6] dark:shadow-[0_0_22px_#A78BFA]',
    cardBackgroundClassName: 'bg-purple-300 dark:bg-purple-700',
    textColorClassName: 'text-purple-900 dark:text-purple-50',
    customCardStyles: {}, // Remove previous boxShadow
    titleFontClassName: 'font-extrabold text-purple-700 dark:text-purple-200',
    animationClassName: 'animate-bounce', // Retain
    flairIcon: '⭐', // Retain
    // customTitleStyles: {}, // Ensure no conflict if any existed
  },
  { // MR (神话) - Gold/Amber Theme
    id: 'MR',
    name: '神话',
    probability: 1,
    borderClassName: 'border-3 border-amber-500 dark:border-amber-400 shadow-[0_0_25px_#F59E0B] dark:shadow-[0_0_25px_#FBBF24]',
    cardBackgroundClassName: 'bg-amber-300 dark:bg-amber-700',
    textColorClassName: 'text-amber-900 dark:text-amber-50',
    customCardStyles: { transform: 'rotate(1deg) scale(1.02)' }, // Retain transform, remove boxShadow
    titleFontClassName: 'font-black text-amber-700 dark:text-amber-200', // Prominent solid color
    customTitleStyles: {}, // Remove gradient text style
    animationClassName: 'animate-shimmer-bg', // Retain
    flairIcon: '✨👑✨', // Retain
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
  return rarityLevels[rarityLevels.length - 1]; // Fallback
};

// Verify sum of probabilities
const sumProbabilities = rarityLevels.reduce((sum, level) => sum + level.probability, 0);
if (sumProbabilities !== 100) {
  console.warn(`Sum of rarity probabilities is ${sumProbabilities}, not 100. getRandomRarity() might not behave as expected.`);
}
