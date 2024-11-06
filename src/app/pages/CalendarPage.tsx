'use client';

import { Calendar } from '@/components/Calendar';
import React, { useState } from 'react';

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className='flex flex-col items-center justify-between h-[90vh] '>
      <h1 className='text-2xl font-bold mt-8  text-center text-[#11111a] dark:text-[#ffffff]'>
        Mood Calendar
      </h1>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        className='rounded-md border w-fit h-fit bg-gray-100/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-800'
      />
      <p className='x0:relative  x0:text-center  min-w-max pt-4 text-xs text-black dark:text-white'>
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
    </div>
  );
};

export default CalendarPage;
