//drawer component opened when user clicks on a day on calendar component
'use client';
import React from 'react';
import { DrawerContent } from '@/components/ui/drawer';
import MoodOfTheDay from './MoodOfTheDay';
import { ScrollArea } from './ui/scroll-area';
interface DrawerComponentProps {
  handleRefreshData: () => void;
  selectedDate: string;
  fullInfo: boolean;
  setFullInfo: (fullInfo: boolean) => void;
  step: number;
  setStep: (step: number) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  selectedDate,
  handleRefreshData,
  fullInfo,
  setFullInfo,
  step,
  setStep,
}) => {
  return (
    <DrawerContent className='flex justify-center items-center '>
      <ScrollArea className='h-full w-full '>
        <div className='lg:py-10'>
          <MoodOfTheDay
            onDateChange={handleRefreshData}
            selectedDate={selectedDate}
            setFullInfo={setFullInfo}
            fullInfo={fullInfo}
            step={step}
            setStep={setStep}
            isCalendar={true}
          />
        </div>
      </ScrollArea>
    </DrawerContent>
  );
};

export default DrawerComponent;
