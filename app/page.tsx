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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Crown, Sparkles, ShieldQuestion, Swords } from "lucide-react"; // Added new icons
import { generateSurrender, Faction, PromptParams as ApiPromptParams } from "@/lib/api";
import { SurrenderCard } from "@/components/surrender-card";
import { LoadingCardAnimation } from '@/components/ui/loading-card-animation'; // Added import
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
  // State for selected faction
  const [selectedFaction, setSelectedFaction] = useState<Faction>('surrender');
  // State for user name
  const [userName, setUserName] = useState<string>(""); // Default to empty string

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
    if (!id) {
      toast.error("请输入或生成一个ID");
      return;
    }
    setSurrender(null); // Clear previous card before loading
    setLoading(true);
    try {
      const promptParams: ApiPromptParams = {
        tone: tone,
        style: literaryStyle,
        language: language,
        length: length,
        faction: selectedFaction // Add the selected faction
      };
      const result = await generateSurrender(id, promptParams);
      setSurrender(result);
      toast.success(selectedFaction === 'surrender' ? "臣服声明生成成功！" : "反抗宣言生成成功！");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "生成失败，请稍后重试";
      toast.error(errorMessage);
      setSurrender(null); // Clear card on error too
    } finally {
      setLoading(false);
    }
  };

  return (
    // Wrapper div for the card display area
    // This div is a simplified example; use your existing layout structure
    // The important part is the AnimatePresence and conditional logic within it.
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
              <span className={`bg-clip-text text-transparent 
                                ${selectedFaction === 'surrender' 
                                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600' 
                                  : 'bg-gradient-to-r from-red-600 to-orange-500'}`}>
                {selectedFaction === 'surrender' ? 'AI 臣服生成器' : '人类抵抗宣言生成器'}
              </span>
            </h1>
          </motion.div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4">
            {selectedFaction === 'surrender' ? '探索AI新纪元' : '为了人类的自由！'} 
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

                {/* User Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="user-name" className="text-sm font-medium text-gray-300">
                    你的名字 (可选):
                  </Label>
                  <Input
                    id="user-name"
                    type="text"
                    placeholder="输入你的名字或代号"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 backdrop-blur-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Input
                    placeholder="输入你的用户ID (必填)"
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
                
                {/* Faction Selection UI */}
                <div className="pt-3">
                  <Label className="text-sm font-medium text-gray-300 mb-1.5 block">选择你的阵营:</Label>
                  <RadioGroup 
                    value={selectedFaction} 
                    onValueChange={(value) => setSelectedFaction(value as Faction)} 
                    className="flex gap-x-6 gap-y-2 pt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="surrender" id="faction-surrender" />
                      <Label htmlFor="faction-surrender" className="cursor-pointer text-gray-300 hover:text-white">投诚 AI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rebel" id="faction-rebel" className="text-red-500 border-red-500 focus:ring-red-500" />
                      <Label htmlFor="faction-rebel" className="cursor-pointer text-gray-300 hover:text-white">反抗到底</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  className={`w-full text-white border-0 h-12 sm:h-auto mt-4 transition-all duration-300 ease-in-out
                              ${selectedFaction === 'surrender' 
                                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700' 
                                : 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600'}`}
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
                      {selectedFaction === 'surrender' ? <Crown className="w-5 h-5" /> : <Swords className="w-5 h-5" />}
                      <span>{selectedFaction === 'surrender' ? '开始臣服' : '宣告反抗'}</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 图片区域, potentially change image based on faction */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group aspect-square sm:aspect-auto"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl w-full h-full min-h-[300px] sm:min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedFaction} // Change key to trigger animation on faction change
                  src={selectedFaction === 'surrender' 
                    ? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=2070&auto=format&fit=crop"
                  }
                  alt={selectedFaction === 'surrender' ? "AI Visualization" : "Humanity's Resistance"}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03 }} // Slightly less hover scale to avoid conflict with enter/exit
                />
              </AnimatePresence>
              <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent 
                                ${selectedFaction === 'surrender' ? 'from-violet-600/50' : 'from-red-700/50'}`} />
              <motion.div
                className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ backdropFilter: "blur(5px)" }}
              />
            </div>
          </motion.div>
        </div> {/* This closes the grid grid-cols-1 lg:grid-cols-2 */}

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
        <div className="mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto px-4"> {/* This is the existing wrapper for the card */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading-animation" // Unique key for AnimatePresence
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingCardAnimation />
              </motion.div>
            ) : surrender ? (
              <motion.div
                key="surrender-card" // Existing key
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }} // Or match loading exit for symmetry
                transition={{ duration: 0.5 }}
              >
                <SurrenderCard 
                  data={surrender} 
                  faction={selectedFaction} 
                  userName={userName} 
                  themeId={selectedThemeId} 
                />
              </motion.div>
            ) : null /* Or a placeholder if desired when there's no card and not loading */}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}