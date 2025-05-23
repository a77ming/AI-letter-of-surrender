"use client";

import { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { SurrenderCard } from '@/components/surrender-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GenerationResult, Faction } from "@/lib/api";
import { rarityLevels } from '@/lib/rarityConfig'; // Import rarityLevels

// Definition for StoredGachaRecord
interface StoredGachaRecord extends GenerationResult {
  userName: string;
  faction: Faction;
  themeId: string;
}

export default function GalleryPage() {
  const [records, setRecords] = useState<StoredGachaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<'timestamp' | 'rarity'>('timestamp'); // Default sort by date

  useEffect(() => {
    const rawRecords = localStorage.getItem("gachaRecords");
    if (rawRecords) {
      try {
        const parsedRecords = JSON.parse(rawRecords);
        if (Array.isArray(parsedRecords)) {
          // Validate each record structure if necessary, or trust the source for now.
          setRecords(parsedRecords);
        } else {
          console.error("Parsed records from localStorage are not an array:", parsedRecords);
          setRecords([]); // Default to empty array if data is not an array
        }
      } catch (error) {
        console.error("Error parsing gachaRecords from localStorage:", error);
        setRecords([]); // Default to empty array on parsing error
      }
    }
    setLoading(false);
  }, []);

  const sortedRecords = useMemo(() => {
    let sorted = [...records];
    if (sortType === 'timestamp') {
      // Timestamps are "YYYY/MM/DD, HH:MM:SS". Standard new Date() should parse this.
      sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Newest first
    } else if (sortType === 'rarity') {
      const rarityOrderMap = rarityLevels.reduce((acc, level, index) => {
        acc[level.id] = index;
        return acc;
      }, {} as Record<string, number>);

      sorted.sort((a, b) => {
        const rarityA = rarityOrderMap[a.rarityId] ?? -1; // Fallback for unknown rarities
        const rarityB = rarityOrderMap[b.rarityId] ?? -1; // Fallback for unknown rarities
        return rarityB - rarityA; // Sort by index descending (higher index in rarityLevels = rarer = comes first)
      });
    }
    return sorted;
  }, [records, sortType]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">正在加载图鉴...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <header className="mb-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">图鉴</h1>
          <Link href="/" passHref>
            <Button variant="outline">返回首页</Button>
          </Link>
        </div>
      </header>

      {/* Sorting Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">排序方式:</p>
        <Button 
          variant={sortType === 'timestamp' ? 'default' : 'outline'} 
          onClick={() => setSortType('timestamp')}
          className="w-full sm:w-auto"
        >
          按日期排序 (最新)
        </Button>
        <Button 
          variant={sortType === 'rarity' ? 'default' : 'outline'} 
          onClick={() => setSortType('rarity')}
          className="w-full sm:w-auto"
        >
          按稀有度排序 (最高优先)
        </Button>
      </div>

      {records.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          <p className="text-2xl mb-2">图鉴中还没有记录。</p>
          <p className="text-md">去首页生成一些宣告，将它们收藏于此吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedRecords.map((record, index) => (
            <SurrenderCard
              key={record.citizenId || `gallery-item-${index}`}
              data={{
                text: record.text,
                citizenId: record.citizenId,
                timestamp: record.timestamp,
                rarityId: record.rarityId,
              }}
              faction={record.faction}
              userName={record.userName}
              themeId={record.themeId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
