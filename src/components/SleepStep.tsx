import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface SleepStepProps {
  sliderValue: number;
  selectedMood: string;
  moodIcon: string;
  hoursOfSleep: string | null;
  setHoursOfSleep: (hours: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SleepStep: React.FC<SleepStepProps> = ({
  sliderValue,
  selectedMood,
  moodIcon,
  hoursOfSleep,
  setHoursOfSleep,
  onNext,
  onPrevious,
}) => {
  return (
    <div className='text-center flex flex-col justify-between items-center h-full'>
      <CardHeader className='pt-0'>
        <CardTitle className='text-2xl '>Sleep</CardTitle>
        <div className='flex flex-col items-center'>
          <motion.img
            src={moodIcon}
            alt={selectedMood}
            className=' x0:size-32  mb-2'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: sliderValue }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 10,
            }}
          />
        </div>
        <CardDescription className='font-medium text-[#11111a] dark:text-[#ffffff]'>
          How many hours did you sleep today?
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-2'>
        <div className='flex items-center justify-center'>
          <Select onValueChange={setHoursOfSleep}>
            <SelectTrigger className='w-56'>
              <SelectValue placeholder='Select hours of sleep' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: 24 }, (_, hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour} {hour === 1 ? 'hour' : 'hours'}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <div className=' justify-center flex gap-2'>
        <Button onClick={onPrevious}>Prev</Button>
        <Button onClick={onNext} disabled={hoursOfSleep === null}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SleepStep;
