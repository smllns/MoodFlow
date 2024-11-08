'use client';

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
          isCalendar={false}
        />
      </div>
      <p className=' text-center  min-w-max text-xs text-black dark:text-white'>
        © 2024 All rights reserved by{' '}
        <a
          href='https://www.linkedin.com/in/smllns'
          className='text-pink-500 hover:text-pink-300 underline '
          target='_blank'
          rel='noopener noreferrer'
        >
          smllns
        </a>
      </p>
    </>
  );
};

export default MoodOfTheDayPage;
