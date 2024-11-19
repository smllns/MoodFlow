// part of MoodOfTheDay Component, allowing users to choose weather of the day functionality
'use client';
import React from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { weatherOptions } from '@/lib/constants';
import AnimatedImage from './AnimatedImage';

interface WeatherStepProps {
  sliderValue: number;
  selectedMood: string;
  moodIcon: string;
  weather: string;
  setWeather: (weather: string) => void;
  onSave: () => void;
  onPrevious: () => void;
}

const WeatherStep: React.FC<WeatherStepProps> = ({
  sliderValue,
  selectedMood,
  moodIcon,
  weather,
  setWeather,
  onSave,
  onPrevious,
}) => {
  return (
    <div className='text-center flex flex-col justify-between items-center h-full'>
      <CardHeader className='pt-0'>
        <CardTitle className='text-2xl '>Weather</CardTitle>
        <div className='flex flex-col items-center'>
          <AnimatedImage
            src={moodIcon}
            alt={selectedMood}
            className='x0:size-32 mb-2'
            rotate={sliderValue}
          />
        </div>
        <CardDescription className='font-medium'>
          What was the weather like today?
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-2'>
        <div className='flex items-center justify-center'>
          <Select onValueChange={setWeather}>
            <SelectTrigger className='w-56'>
              <SelectValue placeholder='Select the weather' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {weatherOptions.map((weather) => (
                  <SelectItem key={weather} value={weather}>
                    {weather}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <div className=' justify-center flex gap-2'>
        <Button onClick={onPrevious}>Back</Button>
        <Button onClick={onSave} disabled={!weather}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default WeatherStep;
