'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { fetchAllMoodData } from '@/app/functions/authService';
import { moodIcons } from '@/lib/constants';
import Image from 'next/image';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
interface MoodData {
  date: string;
  data: {
    mood: keyof typeof moodIcons;
    factors: string[];
    sleep: number | string | null;
    weather: string;
  };
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [moodData, setMoodData] = React.useState<MoodData[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getMoodData = async () => {
      setLoading(true);
      const data = await fetchAllMoodData();
      setMoodData(data);
      setLoading(false);
    };

    getMoodData();
  }, []);

  const getMoodIconForDate = (day: Date) => {
    const formattedDate = day.toLocaleDateString('en-CA'); // 'YYYY-MM-DD'
    const moodEntry = moodData.find((entry) => entry.date === formattedDate);
    if (moodEntry) {
      console.log('Mood found for date:', formattedDate, moodEntry.data.mood);
    }
    return moodEntry ? moodIcons[moodEntry.data.mood] : moodIcons[''];
  };

  const CustomDay = (props: any) => {
    const { date, ...dayProps } = props;
    const moodIcon = getMoodIconForDate(date);
    return (
      <div className='flex flex-col' {...dayProps}>
        <span>{date.getDate()}</span>
        {moodIcon && (
          <img src={moodIcon} alt='moodIcon' className=' w-12 h-12' />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
      </div>
    );
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3  ', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption:
          'flex justify-center pt-1 relative items-center dark:text-white ',
        caption_label: 'text-base font-medium pb-2',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-10 w-10 p-0 opacity-50 dark:hover:opacity-100 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700'
        ),
        nav_button_previous: 'absolute left-1 dark:text-white',
        nav_button_next: 'absolute right-1 dark:text-white',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-neutral-500 rounded-md w-20 font-normal text-[0.8rem] dark:text-neutral-400',
        row: 'flex w-full mt-2',
        cell: 'h-20 w-20 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected])]:bg-neutral-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 dark:[&:has([aria-selected])]:bg-neutral-800',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          `h-20 w-20 p-0 font-normal  aria-selected:opacity-100 dark:text-white dark:aria-selected:text-black hover:bg-neutral-200 dark:hover:bg-neutral-800`
        ),
        day_range_end: 'day-range-end ',
        day_selected:
          'bg-neutral-600 text-white hover:bg-neutral-600 hover:text-neutral-50 focus:bg-neutral-600 focus:text-neutral-50 dark:bg-neutral-300 dark:text-white dark:hover:bg-neutral-300 dark:hover:text-neutral-900 dark:focus:bg-neutral-300 dark:focus:text-neutral-900',
        day_today:
          'bg-neutral-300 text-neutral-900 dark:bg-neutral-600 dark:text-white',
        day_outside: 'hidden',
        day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
        day_range_middle:
          'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50 ',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        DayContent: CustomDay,
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };