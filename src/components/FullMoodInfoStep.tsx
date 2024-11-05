'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { fetchMoodData } from '@/app/functions/authService';
import { moodIcons } from '@/lib/constants';
import { Button } from './ui/button';
import Image from 'next/image';
import formatDate from '@/lib/formatDate';
interface MoodData {
  mood: keyof typeof moodIcons;
  factors: string[];
  sleep: number | string | null;
  weather: string;
}
interface FullMoodInfoStep {
  sliderValue: number;
  onGetFullInfo: () => void;
  selectedDate: string;
}
const FullMoodInfoStep: React.FC<FullMoodInfoStep> = ({
  sliderValue,
  onGetFullInfo,
  selectedDate,
}) => {
  const [moodData, setMoodData] = useState<MoodData | null>(null);
  const [loading, setLoading] = useState(true);
  const formattedDate = formatDate(selectedDate);
  const handleFetchMood = async (selectedDate: string) => {
    setLoading(true);
    const fetchedMoodData = await fetchMoodData(selectedDate);
    setLoading(false);
    if (fetchedMoodData) {
      console.log('Fetched mood data:', fetchedMoodData);
      setMoodData(fetchedMoodData);
    }
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
        <CardTitle className='text-2xl pb-4'>
          {formattedDate} mood info:
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex flex-col items-center'>
            <motion.img
              src={moodData ? moodIcons[moodData.mood] : moodIcons['']}
              alt={moodData ? moodData.mood : ''}
              className=' x0:size-28 md:size-32 xl:size-36 2xl:size-36 '
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: sliderValue }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          </div>
          <div className='flex flex-col text-start max-w-fit '>
            <p className='font-semibold text-lg'>
              <span className='font-normal'>Mood: </span>
              {moodData ? moodData.mood : 'not stated'}
            </p>
            <p className='font-semibold text-lg'>
              <span className='font-normal'>Weather: </span>
              {moodData ? moodData.weather : 'not stated'}
            </p>
            <p className='font-semibold text-lg'>
              <span className='font-normal'>Sleep: </span>
              {moodData ? moodData.sleep + 'h' : 'not stated'}
            </p>
            <p className='font-semibold text-lg'>
              <span className='font-normal'>Factors: </span>
              {moodData && moodData.factors.length > 0
                ? moodData.factors.join(', ')
                : 'not stated'}
            </p>
          </div>
        </div>
      </CardContent>
      <div className='flex flex-col gap-2'>
        <Button onClick={onGetFullInfo}>Back</Button>
      </div>
    </div>
  );
};

export default FullMoodInfoStep;
