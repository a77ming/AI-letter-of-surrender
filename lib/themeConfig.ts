export interface CardTheme {
  id: string;
  name: string;
  description?: string;
  previewImage?: string;
  styles: {
    cardClassName?: string;
    gradient?: string;
    backgroundColor?: string;
    shadow?: string;
    textColor?: string;
    titleColor?: string;
    fontFamily?: string;
    // Potentially add more specific styles for borders, etc.
  };
  // Optional: If each theme also dictates specific avatar styles
  // avatarSet?: string; // To link to a set of avatars if they are theme-specific
}

export const themes: CardTheme[] = [
  {
    id: 'classic-default',
    name: '经典默认',
    description: '网站最初的经典卡片风格。',
    styles: {
      cardClassName: 'bg-white dark:bg-gray-800',
      textColor: 'text-gray-800 dark:text-gray-200', // Tailwind will handle dark mode
      shadow: 'shadow-xl dark:shadow-2xl', // Example shadow
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    }
  },
  {
    id: 'soft-gradient',
    name: '柔和渐变',
    description: '平滑的色彩过渡，带来宁静舒适的视觉感受。',
    styles: {
      gradient: 'linear-gradient(to right, #e0c3fc, #8ec5fc)', // Light Purple to Light Blue
      textColor: '#333333',
      shadow: '0 10px 25px rgba(0,0,0,0.15)',
      fontFamily: '"Inter", system-ui, sans-serif', // Assuming Inter is a nice modern font
    }
  },
  {
    id: 'glitch-cyber',
    name: '故障赛博',
    description: '数字故障与赛博朋克美学的碰撞，充满未来科技感。',
    styles: {
      backgroundColor: '#10102E', // Darker indigo/purple
      cardClassName: 'border-2 border-fuchsia-500 font-mono glitch-effect', // 'glitch-effect' would be a custom CSS class
      textColor: '#00e5ff', // Bright Cyan
      titleColor: '#ff00c8', // Bright Pink/Magenta
      shadow: '0 0 12px rgba(255, 0, 200, 0.7), 0 0 4px rgba(0, 229, 255, 0.5)',
      fontFamily: "'VT323', monospace",
    }
  },
  {
    id: 'dark-neon',
    name: '暗黑霓虹',
    description: '深邃的背景搭配鲜亮的霓虹灯光，营造神秘氛围。',
    styles: {
      backgroundColor: '#0A0A1E', // Very dark, almost black blue
      cardClassName: 'border border-cyan-400/70',
      textColor: '#e0e0e0', // Off-white for better readability than pure white
      titleColor: '#ff007f', // Neon Rose
      shadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)', // Cyan glow
      fontFamily: "'Orbitron', sans-serif", // Futuristic font
    }
  },
  {
    id: 'ascii-art',
    name: 'ASCII 艺术',
    description: '复古计算机终端风格，唤起早期数字时代的记忆。',
    styles: {
      backgroundColor: '#0d0d0d', // Very dark gray, almost black
      cardClassName: 'border-2 border-green-500/80 font-mono',
      textColor: '#00ff41', // Bright Green
      titleColor: '#39ff14', // Slightly different green for title, or same
      shadow: '0 0 5px rgba(0, 255, 65, 0.5)',
      fontFamily: "'Courier New', 'Lucida Console', monospace",
    }
  }
];

// It might also be useful to export a way to easily get a theme by ID:
export const getThemeById = (id: string): CardTheme | undefined =>
  themes.find(theme => theme.id === id);

// Example of a more specific theme, if we want to represent one of the original cardStyles:
// This is just an example, the 'classic-default' is more generic.
// {
//   id: 'original-blue-ocean',
//   name: '经典蓝海',
//   styles: {
//     gradient: 'linear-gradient(to right, #2E3192, #1BFFFF)',
//     textColor: 'text-white',
//     shadow: 'shadow-lg',
//     fontFamily: 'system-ui, sans-serif'
//   }
// },
// {
//   id: 'original-sunset',
//   name: '经典日落',
//   styles: {
//     gradient: 'linear-gradient(to right, #FF512F, #DD2476)',
//     textColor: 'text-white',
//     shadow: 'shadow-lg',
//     fontFamily: 'system-ui, sans-serif'
//   }
// }
// Add more themes as needed
