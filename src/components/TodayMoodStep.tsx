'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { CardContent, CardHeader, CardTitle } from './ui/card';
import { moodIcons, moodLevels } from '@/lib/constants';
import { Button } from './ui/button';
import { fetchMoodData } from '@/app/functions/authService';
import Image from 'next/image';
import formatDate from '@/lib/formatDate';
interface MoodData {
  mood: keyof typeof moodIcons;
  factors: string[];
  sleep: number | string | null;
  weather: string;
}
interface TodayMoodStep {
  sliderValue: number;
  onNext: () => void;
  onGetFullInfo: () => void;
  selectedDate: string;
}

const TodayMoodStep: React.FC<TodayMoodStep> = ({
  sliderValue,
  onNext,
  onGetFullInfo,
  selectedDate,
}) => {
  const [loading, setLoading] = useState(true);

  const [moodData, setMoodData] = useState<MoodData | null>(null);

  const formattedDate = formatDate(selectedDate);

  const handleFetchMood = async (selectedDate: string) => {
    setLoading(true);
    const fetchedMoodData = await fetchMoodData(selectedDate);
    setLoading(false);

    setMoodData(fetchedMoodData);
  };

  useEffect(() => {
    handleFetchMood(selectedDate);
  }, [selectedDate]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
      </div>
    );
  }
  return (
    <div className='text-center  flex flex-col justify-between items-center h-full'>
      <CardHeader className='pt-0 pb-0'>
        <CardTitle className='text-2xl '>
          Your mood on ({formattedDate})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex flex-col items-center'>
            <motion.img
              src={moodData ? moodIcons[moodData.mood] : moodIcons['']}
              alt={moodData ? moodData.mood : ''}
              className=' x0:size-28 md:size-32 xl:size-36 2xl:size-36 mb-8'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: sliderValue }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
            <span className='text-xl font-bold'>
              {moodData ? moodData.mood : moodLevels[5]}
            </span>
          </div>
        </div>
      </CardContent>
      <div className='flex flex-col gap-2'>
        <Button onClick={onGetFullInfo}>Get full mood info</Button>
        <Button onClick={onNext}>Change you mood data</Button>
      </div>
    </div>
  );
};

export default TodayMoodStep;
