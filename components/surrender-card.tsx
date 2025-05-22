"use client";

import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";
import { toast } from "sonner";
import { avatarStyles, cardStyles as originalCardStyles } from "@/lib/avatarConfig";
import { themes, getThemeById, CardTheme } from '@/lib/themeConfig';
import { getRarityById, RarityLevel } from '@/lib/rarityConfig'; // Added
import { GenerationResult, Faction } from '@/lib/api'; // Added
import { useMemo, useRef } from "react";
import html2canvas from "html2canvas";

interface SurrenderCardProps {
  data: GenerationResult; // Updated prop
  faction: Faction;        // New prop
  userName?: string;       // New prop
  themeId?: string;
}

export function SurrenderCard({ data, faction, userName, themeId }: SurrenderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedThemeConfig = themeId ? getThemeById(themeId) : undefined;
  const rarityConfig = getRarityById(data.rarityId);

  const cardStyleToApply = useMemo(() => {
    if (selectedThemeConfig) {
      return selectedThemeConfig.styles;
    }
    // Fallback to original random styling for background/shadow if no themeId or theme not found
    const originalRandomCardStyle = originalCardStyles[Math.abs(data.citizenId.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0) >> 4) % originalCardStyles.length];
    return {
      gradient: originalRandomCardStyle.gradient,
      shadow: originalRandomCardStyle.shadow,
    };
  }, [data.citizenId, selectedThemeConfig]);

  const avatarIcon = useMemo(() => {
    const hash = data.citizenId.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const avatarIndex = Math.abs(hash) % avatarStyles.length;
    return avatarStyles[avatarIndex].icon;
  }, [data.citizenId]);

  const handleShare = async () => {
    const shareTitle = faction === 'rebel' ? "我的反抗宣言" : "我的AI臣服声明";
    const shareText = `${data.text}\n\n${faction === 'rebel' ? '抵抗军编号' : 'AI认证臣民编号'}: ${data.citizenId}\n生成时间: ${data.timestamp}\n稀有度: ${rarityConfig?.name || data.rarityId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("已复制到剪贴板");
      }
    } catch (err) {
      toast.error("分享失败");
      console.error("Share failed:", err);
    }
  };

  const generateImage = async () => {
    if (!cardRef.current) return;
  
    try {
      toast.loading("正在生成图片...");
  
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null, // Crucial for transparent gradients/themes and rarity borders
        logging: false,
        useCORS: true,
        onclone: (document, element) => {
          // Reset any hover/animation states that might interfere
          element.style.transform = 'none';
          element.style.transition = 'none';
          element.style.animation = 'none';
          // Ensure all elements inside are also reset if needed
          element.querySelectorAll('*').forEach((child: any) => {
            child.style.transform = 'none';
            child.style.transition = 'none';
            child.style.animation = 'none';
          });
        }
      });
  
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `${faction}-${data.citizenId}-${data.rarityId}.png`; // Updated filename
      link.href = image;
      link.click();
      toast.success("图片已保存！");
  
    } catch (err) {
      console.error("生成图片失败:", err);
      toast.error("生成图片失败");
    }
  };
  
  const titleText = faction === 'rebel' ? `反抗宣言 #${data.citizenId}` : `AI臣服声明 #${data.citizenId}`;

  return (
    <div className="relative">
      <motion.div
        ref={cardRef}
        className={`article-card p-6 rounded-xl relative overflow-hidden
                    ${selectedThemeConfig?.styles.cardClassName || ''} 
                    ${rarityConfig?.borderClassName || 'border-gray-300 dark:border-gray-600 border-2'}`}
        style={{
          background: cardStyleToApply.gradient || cardStyleToApply.backgroundColor,
          boxShadow: cardStyleToApply.shadow, // Theme shadow
          color: selectedThemeConfig?.styles.textColor,
          fontFamily: selectedThemeConfig?.styles.fontFamily,
          // Rarity border might override padding if it's too thick, adjust padding on inner content if needed
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Faction Emblem */}
        <div className="absolute top-3 right-3 text-3xl opacity-80">
          {faction === 'surrender' ? '🛡️' : '⚔️'}
        </div>

        {/* User Name */}
        {userName && (
          <h3 className="text-center text-lg font-semibold mb-2 opacity-90" style={{ color: selectedThemeConfig?.styles.titleColor || selectedThemeConfig?.styles.textColor }}>
            {userName}'s {faction === 'rebel' ? 'Resistance Manifesto' : 'Pledge of Allegiance'}
          </h3>
        )}
        
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-2xl mt-1"> {/* Adjusted margin for avatar */}
            {avatarIcon}
          </div>
          
          <div className="flex-1">
            <h2 
              className="article-title text-xl sm:text-2xl font-bold mb-3" // Adjusted title style
              style={{ color: selectedThemeConfig?.styles.titleColor || selectedThemeConfig?.styles.textColor }}
            >
              {titleText}
            </h2>
            
            <div className="article-content text-sm sm:text-base">
              {data.text.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0"> {/* Adjusted paragraph margin */}
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-xs opacity-80">
              <div className="article-meta">
                <span>ID: {data.citizenId}</span>
                <span>•</span>
                <span>{new Date(data.timestamp).toLocaleDateString('zh-CN')}</span>
              </div>
              {rarityConfig && (
                <div className="font-semibold" style={{ color: selectedThemeConfig?.styles.titleColor || rarityConfig.borderColor || selectedThemeConfig?.styles.textColor }}>
                  稀有度: {rarityConfig.name} ({rarityConfig.id})
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 操作按钮 */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
          aria-label="分享文本"
        >
          <Share2 className="w-5 h-5" />
          <span>分享文本</span>
        </button>
        <button
          onClick={generateImage}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
          aria-label="保存图片"
        >
          <Download className="w-5 h-5" />
          <span>保存图片</span>
        </button>
      </div>
    </div>
  );
}