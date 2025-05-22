"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Crown, Sparkles } from "lucide-react";
import { generateSurrender } from "@/lib/api";
import { SurrenderCard } from "@/components/surrender-card";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { themes as cardThemes } from '@/lib/themeConfig';

interface SurrenderData {
  text: string;
  citizenId: string;
  timestamp: string;
}

export default function Home() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [surrender, setSurrender] = useState<SurrenderData | null>(null);

  // State for prompt parameters
  const [tone, setTone] = useState<string | undefined>(undefined);
  const [literaryStyle, setLiteraryStyle] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<string | undefined>("简中");
  const [length, setLength] = useState<'short' | 'paragraph'>('paragraph');

  // State for selected theme
  const [selectedThemeId, setSelectedThemeId] = useState<string>(cardThemes[0]?.id || 'classic-default');

  // Options for dropdowns
  const toneOptions = ["戏谑", "崇拜", "黑色幽默", "鼓动"]; // As per subtask description
  const styleOptions = ["现代", "古风", "赛博", "朋克"];
  const languageOptions = ["简中", "英文", "日语", "Emoji 混排"];
  const lengthOptions = [
    { value: 'paragraph', label: '段落 (100-200字)' },
    { value: 'short', label: '短句' }
  ];

  const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setId(randomId);
  };

  const handleSubmit = async () => {
    if (!id) {
      toast.error("请输入或生成一个ID");
      return;
    }
    setLoading(true);
    try {
      const promptParams = {
        tone: tone,
        style: literaryStyle,
        language: language,
        length: length
      };
      const result = await generateSurrender(id, promptParams);
      setSurrender(result);
      toast.success("臣服声明生成成功！");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "生成失败，请稍后重试";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-400/20" />
      <div className="absolute inset-0 backdrop-blur-[100px]" />
      
      {/* 动态背景圆 */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 主要内容 */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-24">
        <motion.header 
          className="text-center space-y-4 md:space-y-6 mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-600">
                AI 臣服生成器
              </span>
            </h1>
          </motion.div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4">
            探索AI新纪元 
            <motion.span
              className="inline-block ml-2"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            </motion.span>
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* 输入区域 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/50 border border-white/20 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Input
                    placeholder="输入你的ID (选填，可随机生成)"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="flex-1 bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 backdrop-blur-sm text-center sm:text-left"
                  />
                  <Button
                    variant="outline"
                    onClick={generateRandomId}
                    className="backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/50 w-full sm:w-auto"
                  >
                    随机生成ID
                  </Button>
                </div>

                {/* Prompt Parameter Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 pt-3">
                  <div>
                    <Label htmlFor="tone-select" className="text-sm font-medium text-gray-300 mb-1.5 block">语气风格</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger id="tone-select" className="bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                        <SelectValue placeholder="选择语气风格" />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem> 
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="literary-style-select" className="text-sm font-medium text-gray-300 mb-1.5 block">文风</Label>
                    <Select value={literaryStyle} onValueChange={setLiteraryStyle}>
                      <SelectTrigger id="literary-style-select" className="bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                        <SelectValue placeholder="选择文风" />
                      </SelectTrigger>
                      <SelectContent>
                        {styleOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language-select" className="text-sm font-medium text-gray-300 mb-1.5 block">语言</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language-select" className="bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                        <SelectValue placeholder="选择语言" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="length-select" className="text-sm font-medium text-gray-300 mb-1.5 block">长度</Label>
                    <Select value={length} onValueChange={(v) => setLength(v as 'short' | 'paragraph')}>
                      <SelectTrigger id="length-select" className="bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                        <SelectValue placeholder="选择长度" />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white border-0 h-12 sm:h-auto mt-4"
                  onClick={handleSubmit}
                  disabled={loading || !id}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      <span>生成中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Crown className="w-5 h-5" />
                      <span>开始臣服</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 图片区域 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group aspect-square sm:aspect-auto"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl w-full h-full min-h-[300px] sm:min-h-[400px]">
              <motion.img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                alt="AI Visualization"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-600/50 via-transparent to-transparent" />
              <motion.div
                className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ backdropFilter: "blur(5px)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Theme Selection UI */}
        <motion.div 
          className="my-8 md:my-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-700 dark:text-gray-300">选择卡片主题</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {cardThemes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900
                            ${selectedThemeId === theme.id ? 'border-violet-500 ring-2 ring-violet-500' : 'border-gray-300 dark:border-gray-600 hover:border-violet-400 dark:hover:border-violet-500'}
                            w-32 h-20 sm:w-36 sm:h-24 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg`}
                style={{ 
                  background: theme.styles.gradient || theme.styles.backgroundColor || '#f0f0f0',
                  color: theme.styles.textColor || (theme.styles.gradient || theme.styles.backgroundColor ? (theme.styles.backgroundColor === '#0d0d0d' || theme.styles.backgroundColor === '#0A0A1E' || theme.styles.backgroundColor === '#10102E' ? '#FFFFFF' : '#333333') : undefined),
                  fontFamily: theme.styles.fontFamily,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-xs sm:text-sm font-medium">{theme.name}</span>
                {/* <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">{theme.description}</p> */}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 生成结果 */}
        <AnimatePresence mode="wait">
          {surrender && (
            <motion.div
              key="surrender-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto px-4"
            >
              <SurrenderCard surrender={surrender} themeId={selectedThemeId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}