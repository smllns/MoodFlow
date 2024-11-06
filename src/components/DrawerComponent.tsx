'use client';
import React from 'react';
import { DrawerContent } from '@/components/ui/drawer';
import MoodOfTheDay from './MoodOfTheDay';
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
      <MoodOfTheDay
        onDateChange={handleRefreshData}
        selectedDate={selectedDate}
        setFullInfo={setFullInfo}
        fullInfo={fullInfo}
        step={step}
        setStep={setStep}
      />
    </DrawerContent>
  );
};

export default DrawerComponent;
