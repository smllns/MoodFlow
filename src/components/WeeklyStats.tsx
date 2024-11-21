//part of mood of the day page, displays weekly mood
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Menubar } from '@/components/ui/menubar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useTheme } from '@/lib/ThemeContext';
import { fetchMoodData } from '@/app/functions/authService';
import WeeklyLoader from './WeeklyLoader';
import ScrollIcon from './ScrollIcon';
import MoodMenu from './MoodMenu';
import MoodCard from './MoodCard';
type Mood =
  | 'Very bad'
  | 'Slightly bad'
  | 'Okay'
  | 'Slightly good'
  | 'Very good'
  | '';

interface MoodDetails {
  mood: Mood;
}
interface MoodType {
  mood: MoodDetails | null;
  dayName: string;
  formattedDate: string;
}
type MoodsType = {
  [date: string]: MoodType;
};
const WeeklyStats = ({
  refreshDataTrigger,
  setSelectedDate,
  onSetFullInfoFalse,
  onSetFullInfoTrue,
  setStep,
}: {
  refreshDataTrigger: boolean;
  setSelectedDate: (date: string) => void;
  onSetFullInfoFalse: () => void;
  onSetFullInfoTrue: () => void;
  setStep: (step: number) => void;
}) => {
  const [moodData, setMoodData] = useState<MoodsType>({});
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  // Generate a list of weekdays with their respective formatted dates
  const weekDaysWithDates = useMemo(() => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentDayIndex = today.getDay();
    const weekDaysWithDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = daysOfWeek[(currentDayIndex - i + 7) % 7];
      const formattedDate = `${date.getDate()}.${date.getMonth() + 1}`;
      const formattedDateForFetch = date.toLocaleDateString('en-CA');
      weekDaysWithDates.push([dayName, formattedDate, formattedDateForFetch]);
    }

    return weekDaysWithDates.reverse();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Function to smoothly scroll to the "mood of the day" section
  const handleScrollToMoodOfTheDay = () => {
    const registrationElement = document.getElementById('daymood');
    if (registrationElement) {
      registrationElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Event handlers for clicking on mood data (different actions depending on the view)
  const handleClickMiny = (date: string) => {
    setSelectedDate(date);
    onSetFullInfoFalse();
    setStep(1);
    handleScrollToMoodOfTheDay();
  };
  const handleClickLg = (date: string) => {
    setSelectedDate(date);
    onSetFullInfoFalse();
    setStep(1);
  };
  const handleClickMinyFullInfo = (date: string) => {
    setSelectedDate(date);
    onSetFullInfoTrue();
    setStep(1);
    handleScrollToMoodOfTheDay();
  };
  const handleClickLgFullInfo = (date: string) => {
    setSelectedDate(date);
    onSetFullInfoTrue();
    setStep(1);
  };
  const handleClickMinyChangeInfo = (date: string) => {
    setSelectedDate(date);
    onSetFullInfoFalse();
    setStep(2);
    handleScrollToMoodOfTheDay();
  };
  const handleClickLgChangeInfo = (date: string) => {
    setSelectedDate(date);
    onSetFullInfoFalse();
    setStep(2);
  };

  // Fetch mood data for the current week and set it to the state
  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);
      const moods: MoodsType = {};
      for (const [dayName, formattedDate, date] of weekDaysWithDates) {
        const moodData = await fetchMoodData(date);
        moods[date] = {
          dayName,
          formattedDate,
          mood: moodData,
        };
      }
      setMoodData(moods);
      setLoading(false);
    };

    fetchMoods();
  }, [weekDaysWithDates, refreshDataTrigger]);

  // If loading, show the loader
  if (loading) {
    return (
      <WeeklyLoader
        handleScrollToMoodOfTheDay={handleScrollToMoodOfTheDay}
        isDark={isDark}
      />
    );
  }

  return (
    <div className='pt-2 flex flex-col items-center justify-between lg:block lg:justify-start x0:h-[92vh] lg:h-fit'>
      <h1 className='text-2xl font-bold mt-2 mb-8 text-center text-[#11111a] dark:text-[#ffffff]'>
        Weekly Stats
      </h1>

      <div className='x0:block lg:hidden pt-2'>
        {/* Carousel for small screens */}
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className='w-full x0:max-w-60 sm:max-w-xl md:max-w-sm mx-auto'
        >
          <CarouselContent className='-ml-1'>
            {Object.entries(moodData).map(
              ([date, { dayName, formattedDate, mood }]) => (
                <CarouselItem
                  key={dayName}
                  className='pl-1 flex justify-center items-center sm:basis-1/3 md:basis-1/2'
                >
                  <div className='p-1'>
                    <MoodCard
                      mood={mood}
                      dayName={dayName}
                      formattedDate={formattedDate}
                      date={date}
                      onClickMiny={handleClickMiny}
                      onClickMinyFullInfo={handleClickMinyFullInfo}
                      onClickMinyChangeInfo={handleClickMinyChangeInfo}
                    />
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious className='text-[#11111a] dark:text-[#ffffff]' />
          <CarouselNext className='text-[#11111a] dark:text-[#ffffff]' />
        </Carousel>
      </div>

      {/* Icon to scroll to "mood of the day" */}
      <div className='flex flex-col justify-center items-center mb-5 lg:hidden'>
        <p className='mb-2 '>Set your mood of the day</p>
        <ScrollIcon onClick={handleScrollToMoodOfTheDay} isDark={isDark} />
      </div>

      {/* Menu for larger screens */}
      <div className='hidden lg:block'>
        <Menubar className='w-fit mx-auto'>
          {Object.entries(moodData).map(
            ([date, { dayName, formattedDate, mood }]) => (
              <MoodMenu
                key={dayName + formattedDate}
                mood={mood}
                dayName={dayName}
                formattedDate={formattedDate}
                date={date}
                onClickLg={handleClickLg}
                onClickLgFullInfo={handleClickLgFullInfo}
                onClickLgChangeInfo={handleClickLgChangeInfo}
              />
            )
          )}
        </Menubar>
      </div>
    </div>
  );
};

export default WeeklyStats;
