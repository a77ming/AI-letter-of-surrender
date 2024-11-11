"use client";

import { motion } from "framer-motion";
import { Share2, Download, Share } from "lucide-react";
import { toast } from "sonner";
import { avatarStyles, cardStyles } from "@/lib/avatarConfig";
import { useMemo, useRef } from "react";
import html2canvas from "html2canvas";

interface SurrenderCardProps {
  surrender: {
    text: string;
    citizenId: string;
    timestamp: string;
  };
}

export function SurrenderCard({ surrender }: SurrenderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const randomStyle = useMemo(() => {
    const hash = surrender.citizenId.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const avatarIndex = Math.abs(hash) % avatarStyles.length;
    const cardIndex = Math.abs(hash >> 4) % cardStyles.length;
    return {
      avatar: avatarStyles[avatarIndex],
      card: cardStyles[cardIndex]
    };
  }, [surrender.citizenId]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "我的AI臣服声明",
          text: `${surrender.text}\n\nAI认证臣民编号: ${surrender.citizenId}\n生成时间: ${surrender.timestamp}`,
        });
      } else {
        await navigator.clipboard.writeText(
          `${surrender.text}\n\nAI认证臣民编号: ${surrender.citizenId}\n生成时间: ${surrender.timestamp}`
        );
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
  
      // 直接使用当前显示的卡片元素
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // 提高清晰度
        backgroundColor: null,
        logging: false,
        useCORS: true,
        // 移除多余的样式和动画
        onclone: (document, element) => {
          element.style.transform = 'none';
          element.style.transition = 'none';
          element.style.animation = 'none';
        }
      });
  
      // 转换为图片
      const image = canvas.toDataURL("image/png", 1.0);
  
      // 下载图片
      const link = document.createElement("a");
      link.download = `ai-surrender-${surrender.citizenId}.png`;
      link.href = image;
      link.click();
      toast.success("图片已保存！");
  
    } catch (err) {
      console.error("生成图片失败:", err);
      toast.error("生成图片失败");
    }
  };

  return (
    <div className="relative">
      <motion.div
        ref={cardRef}
        className={`article-card ${randomStyle.card.className}`}
        style={{
          background: randomStyle.card.gradient,
          boxShadow: randomStyle.card.shadow
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-2xl">
            {randomStyle.avatar.icon}
          </div>
          
          <div className="flex-1">
            <h2 className="article-title">
              AI臣服声明 #{surrender.citizenId}
            </h2>
            
            <div className="article-content">
              {surrender.text.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="article-meta">
                <span>ID: {surrender.citizenId}</span>
                <span>•</span>
                <span>{new Date(surrender.timestamp).toLocaleDateString('zh-CN')}</span>
              </div>
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