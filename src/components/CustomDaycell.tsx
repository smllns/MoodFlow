//custom dayCell component used in calendar
'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

interface CustomDaycellProps {
  date: Date;
  isToday?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isOutside?: boolean;
}

const CustomDaycell: React.FC<CustomDaycellProps> = ({
  date,
  isToday = false,
  isSelected = false,
  isDisabled = false,
  isOutside = false,
  ...props
}) => {
  const dayClass = cn(
    buttonVariants({ variant: 'ghost' }),
    'h-20 w-20 p-0 font-normal aria-selected:opacity-100 dark:text-white dark:aria-selected:text-black hover:bg-neutral-200 dark:hover:bg-neutral-800',
    {
      'bg-neutral-600 text-white dark:bg-neutral-300 dark:text-white':
        isSelected, // For selected day
      'bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-white':
        isToday, // For today day
      'text-neutral-500 opacity-50 dark:text-neutral-400': isDisabled, // For disabled days
      hidden: isOutside, // For days outside of current month
    }
  );
  return (
    <div
      {...props}
      className={`${dayClass} relative flex flex-col items-center justify-center text-center text-sm p-0`}
    >
      <span>{date.getDate()}</span>
    </div>
  );
};

export default CustomDaycell;
