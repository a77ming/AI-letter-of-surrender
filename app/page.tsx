"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crown, Sparkles } from "lucide-react";
import { generateSurrender } from "@/lib/api";
import { SurrenderCard } from "@/components/surrender-card";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface SurrenderData {
  text: string;
  citizenId: string;
  timestamp: string;
}

export default function Home() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [surrender, setSurrender] = useState<SurrenderData | null>(null);

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
      const result = await generateSurrender(id);
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
                    placeholder="输入你的ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="flex-1 bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 backdrop-blur-sm text-center sm:text-left"
                  />
                  <Button
                    variant="outline"
                    onClick={generateRandomId}
                    className="backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/50 w-full sm:w-auto"
                  >
                    随机生成
                  </Button>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white border-0 h-12 sm:h-auto"
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
              <SurrenderCard surrender={surrender} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}