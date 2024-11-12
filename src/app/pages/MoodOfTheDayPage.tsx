'use client';

import Footer from '@/components/ui/footer';
import MoodOfTheDay from '@/components/MoodOfTheDay';
import WeeklyStats from '@/components/WeeklyStats';
import React, { useState } from 'react';

const MoodOfTheDayPage = () => {
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-CA')
  );

  const [fullInfo, setFullInfo] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const handleRefreshData = () => {
    setRefreshDataTrigger((prev) => !prev);
  };
  const handleSetFullInfoFalse = () => {
    setFullInfo(false);
  };
  const handleSetFullInfoTrue = () => {
    setFullInfo(true);
  };
  return (
    <div className='lg:h-full lg:flex lg:flex-col lg:justify-between'>
      <WeeklyStats
        refreshDataTrigger={refreshDataTrigger}
        setSelectedDate={setSelectedDate}
        onSetFullInfoFalse={handleSetFullInfoFalse}
        onSetFullInfoTrue={handleSetFullInfoTrue}
        setStep={setStep}
      />
      <div id='daymood'>
        <MoodOfTheDay
          onDateChange={handleRefreshData}
          selectedDate={selectedDate}
          setFullInfo={setFullInfo}
          fullInfo={fullInfo}
          step={step}
          setStep={setStep}
          isCalendar={false}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MoodOfTheDayPage;
