"use client"; // If using Framer Motion or other client-side hooks directly

import { motion } from 'framer-motion';
import { Sparkles, ShieldQuestion } from 'lucide-react'; // Optional: for added effect

export const LoadingCardAnimation = () => {
  return (
    <motion.div
      className="relative w-full max-w-md h-80 sm:h-96 bg-gray-700 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-600 dark:border-gray-700"
      // Breathing/Pulsing Glow effect using Framer Motion
      initial={{ scale: 0.98, opacity: 0.8 }}
      animate={{
        scale: [0.98, 1, 0.98],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Optional: A subtle pattern or symbol on the card back */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ShieldQuestion className="w-24 h-24 text-gray-500 dark:text-gray-600 opacity-30" /> {/* Placeholder symbol */}
      </div>

      {/* Shimmer/Scan Line Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden"> {/* Added overflow-hidden to parent */}
          <div className="animate-scanline w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div> {/* Removed absolute from here, it's in the class now */}
      </div>
      
      {/* Optional: Prominent Sparkles */}
      <div className="absolute inset-0 flex items-center justify-center">
         <motion.div
             animate={{ rotate: 360, scale: [1, 1.2, 1, 1.2, 1] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
         >
             <Sparkles className="w-16 h-16 text-yellow-400 opacity-50" />
         </motion.div>
      </div>
    </motion.div>
  );
};
