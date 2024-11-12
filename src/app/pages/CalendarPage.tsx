'use client';

import { Calendar } from '@/components/Calendar';
import Footer from '@/components/ui/footer';
import PageTitle from '@/components/ui/page-title';
import React, { useState } from 'react';

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className='flex flex-col items-center justify-between h-[90vh] '>
      <PageTitle title='Mood Calendar' />
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        className='rounded-md border w-fit h-fit bg-gray-100/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-800'
      />
      <Footer />
    </div>
  );
};

export default CalendarPage;
