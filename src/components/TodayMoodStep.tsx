// part of MoodOfTheDay Component, displaying short mood of the day info functionality
'use client';
import React from 'react';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { moodIcons, moodLevels } from '@/lib/constants';
import { Button } from './ui/button';
import formatDate from '@/lib/formatDate';
import LoadingSpinner from './LoadingSpinner';
import useFetchMoodData from '@/hooks/useFetchMoodData';
import AnimatedImage from './AnimatedImage';

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
  // Function to fetch mood data based on the selected date
  const { moodData, loading } = useFetchMoodData(selectedDate); // Use the custom hook
  const formattedDate = formatDate(selectedDate);

  // Show loading indicator while data is being loaded
  if (loading) {
    return <LoadingSpinner />;
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
            <AnimatedImage
              src={moodData ? moodIcons[moodData.mood] : moodIcons['']}
              alt={moodData ? moodData.mood : ''}
              className='x0:size-28 md:size-32 xl:size-36 2xl:size-36 mb-8'
              rotate={sliderValue}
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
