import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import formatDate from '@/lib/formatDate';

interface MoodSliderStepProps {
  sliderValue: number;
  setSliderValue: (value: number) => void;
  selectedMood: string;
  moodIcon: string;
  onNext: () => void;
  onPrevious: () => void;
  selectedDate: string;
}

const MoodSliderStep: React.FC<MoodSliderStepProps> = ({
  sliderValue,
  setSliderValue,
  selectedMood,
  moodIcon,
  onNext,
  onPrevious,
  selectedDate,
}) => {
  const handleValueChange = (value: number[]) => setSliderValue(value[0]);
  const formattedDate = formatDate(selectedDate);
  return (
    <div className='text-center flex flex-col justify-between items-center h-full'>
      <CardHeader className='pt-0'>
        <CardTitle className='text-2xl '>{formattedDate} Mood</CardTitle>
        <CardDescription className='font-medium text-[#11111a] dark:text-[#ffffff]'>
          How do you feel?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex flex-col items-center'>
            <motion.img
              src={moodIcon}
              alt={selectedMood}
              className=' x0:size-28 md:size-32 xl:size-36 2xl:size-36 mb-4'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: sliderValue }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
            <span className='text-lg font-semibold'>{selectedMood}</span>
          </div>
          <Slider
            min={1}
            max={100}
            step={1}
            value={[sliderValue]}
            onValueChange={handleValueChange}
          />
        </div>
      </CardContent>
      <div className=' justify-center flex gap-2'>
        <Button onClick={onPrevious} disabled={!selectedMood}>
          Prev
        </Button>
        <Button onClick={onNext} disabled={!selectedMood}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MoodSliderStep;
