// part of MoodOfTheDay Component, displaying full mood of the day info functionality
'use client';
import React from 'react';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { moodIcons } from '@/lib/constants';
import { Button } from './ui/button';
import formatDate from '@/lib/formatDate';
import LoadingSpinner from './LoadingSpinner';
import useFetchMoodData from '@/hooks/useFetchMoodData';
import AnimatedImage from './AnimatedImage';
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
  // Function to fetch mood data based on the selected date
  const { moodData, loading } = useFetchMoodData(selectedDate);
  const formattedDate = formatDate(selectedDate);

  // Function to render data with default values
  const renderData = (label: string, value: string | null | undefined) => (
    <p className='font-semibold text-lg'>
      <span className='font-normal'>{label}: </span>
      {value || 'not stated'}
    </p>
  );

  // Show loading indicator while data is being loaded
  if (loading) {
    return <LoadingSpinner />;
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
            <AnimatedImage
              src={moodData ? moodIcons[moodData.mood] : moodIcons['']}
              alt={moodData ? moodData.mood : ''}
              className='x0:size-28 md:size-32 xl:size-36 2xl:size-36 '
              rotate={sliderValue}
            />
          </div>
          <div className='flex flex-col text-start max-w-fit '>
            <div className='flex flex-col text-start max-w-fit'>
              {renderData('Mood', moodData?.mood)}
              {renderData('Weather', moodData?.weather)}
              {renderData(
                'Sleep',
                moodData?.sleep ? `${moodData.sleep}h` : null
              )}
              {renderData(
                'Factors',
                moodData && moodData.factors.length > 0
                  ? moodData.factors.join(', ')
                  : null
              )}
            </div>
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
