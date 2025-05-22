export interface RarityLevel {
  id: string; // e.g., 'R', 'SR', 'SSR', 'UR', 'MR'
  name: string; // e.g., "普通", "稀有", "超稀有", "终极", "神话"
  probability: number; // Percentage, e.g., 70 for R, 20 for SR
  borderColor?: string; // e.g., '#CCCCCC', '#007BFF' (kept for potential future use)
  borderClassName?: string; // Tailwind CSS classes for border
  // Future additions: textColor, specialEffectsClass, etc.
}

export const rarityLevels: RarityLevel[] = [
  {
    id: 'R',
    name: '普通',
    probability: 70,
    borderClassName: 'border-gray-400 dark:border-gray-500',
  },
  {
    id: 'SR',
    name: '稀有',
    probability: 20,
    borderClassName: 'border-sky-500 dark:border-sky-400 border-2',
  },
  {
    id: 'SSR',
    name: '超稀有',
    probability: 7,
    borderClassName: 'border-purple-500 dark:border-purple-400 border-2 shadow-md shadow-purple-500/50',
  },
  {
    id: 'UR',
    name: '终极',
    probability: 2,
    borderClassName: 'border-amber-400 dark:border-amber-300 border-3 shadow-lg shadow-amber-400/60', // Using border-3 as per example
  },
  {
    id: 'MR',
    name: '神话',
    probability: 1,
    // Using one of the simpler but distinct MR suggestions from the prompt
    borderClassName: 'border-rose-600 dark:border-rose-500 border-4 shadow-2xl shadow-rose-500/75',
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
