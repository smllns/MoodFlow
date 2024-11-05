'use client';

import MoodOfTheDay from '@/components/MoodOfTheDay';
import WeeklyStats from '@/components/WeeklyStats';
import React, { useState } from 'react';

const MoodOfTheDayPage = () => {
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
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
    <>
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
        />
      </div>
    </>
  );
};

export default MoodOfTheDayPage;
