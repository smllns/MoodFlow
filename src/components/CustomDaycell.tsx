'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { buttonVariants } from './ui/button';

interface CustomDaycellProps {
  date: Date;
  // getMoodIconForDate: (day: Date) => string;
  isToday?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isOutside?: boolean;
}

const CustomDaycell: React.FC<CustomDaycellProps> = ({
  date,
  // getMoodIconForDate,
  isToday = false,
  isSelected = false,
  isDisabled = false,
  isOutside = false,
  ...props
}) => {
  // const moodIcon = getMoodIconForDate(date);
  const dayClass = cn(
    buttonVariants({ variant: 'ghost' }),
    'h-20 w-20 p-0 font-normal aria-selected:opacity-100 dark:text-white dark:aria-selected:text-black hover:bg-neutral-200 dark:hover:bg-neutral-800',
    {
      'bg-neutral-600 text-white dark:bg-neutral-300 dark:text-white':
        isSelected, // Для выбранного дня
      'bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-white':
        isToday, // Для сегодняшнего дня
      'text-neutral-500 opacity-50 dark:text-neutral-400': isDisabled, // Для отключенного дня
      hidden: isOutside, // Для дней, которые вне текущего месяца
    }
  );
  return (
    <div
      {...props}
      className={`${dayClass} relative flex flex-col items-center justify-center text-center text-sm p-0`}
    >
      <span>{date.getDate()}</span>
      {/* {moodIcon && (
        <img src={moodIcon} alt='Mood icon' className=' w-10 h-10' />
      )} */}
    </div>
  );
};

export default CustomDaycell;
