'use client';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import Autoplay from 'embla-carousel-autoplay';
import { useTheme } from '@/lib/ThemeContext';
import Image from 'next/image';
import { moodIcons } from '@/lib/constants';
import { fetchMoodData } from '@/app/functions/authService';
import { Skeleton } from './ui/skeleton';
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
  const [loading, setLoading] = useState(true); // New loading state
  const { isDark } = useTheme();

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
      const formattedDateForFetch = date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD'
      weekDaysWithDates.push([dayName, formattedDate, formattedDateForFetch]);
    }

    return weekDaysWithDates.reverse();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const handleScrollToMoodOfTheDay = () => {
    const registrationElement = document.getElementById('daymood');
    if (registrationElement) {
      registrationElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  if (loading) {
    return (
      <div className='pt-2 flex flex-col items-center justify-between lg:block lg:justify-start x0:h-[92vh] lg:h-fit '>
        <h1 className='text-2xl font-bold mt-2 mb-8 text-center text-[#11111a] dark:text-[#ffffff]'>
          Weekly Stats
        </h1>
        <div className='x0:block lg:hidden pt-2 '>
          <Carousel className='w-full x0:max-w-60 sm:max-w-xl md:max-w-sm mx-auto'>
            <CarouselContent className='-ml-1'>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className='pl-1 flex justify-center items-center sm:basis-1/3 md:basis-1/2'
                >
                  <div className='p-1'>
                    <Card className='x0:w-44 xs:w-52 sm:w-44'>
                      <Skeleton key={index} className='h-[304px] rounded-md' />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {isDark ? (
          <div className='flex flex-col justify-center items-center  mb-5 lg:hidden'>
            <p className='mb-2 text-[#ffffff] '>Set your mood of the day</p>

            <Image
              src='/CaretDoubleDown.svg'
              height={1000}
              width={1000}
              className='h-8 w-8 cursor-pointer transition-transform duration-300 opacity-[0.4] hover:opacity-[0.8] fill-current text-gray-500 hover:text-gray-800 hover:scale-110 active:scale-95'
              alt='arrows'
              onClick={handleScrollToMoodOfTheDay}
            />
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center mb-5 lg:hidden'>
            <p className='mb-2'>Set your mood of the day</p>

            <div
              onClick={handleScrollToMoodOfTheDay}
              className='h-8 w-8 cursor-pointer transition-transform duration-300 opacity-40 hover:opacity-80 fill-current text-gray-400 dark:text-white hover:scale-110 active:scale-95'
            >
              <svg
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='h-full w-full'
              >
                <path
                  d='M27.0612 15.9388C27.2011 16.0781 27.312 16.2437 27.3878 16.426C27.4635 16.6084 27.5024 16.8038 27.5024 17.0013C27.5024 17.1987 27.4635 17.3942 27.3878 17.5765C27.312 17.7588 27.2011 17.9244 27.0612 18.0638L17.0613 28.0638C16.9219 28.2036 16.7563 28.3146 16.574 28.3903C16.3917 28.466 16.1962 28.5049 15.9987 28.5049C15.8013 28.5049 15.6058 28.466 15.4235 28.3903C15.2412 28.3146 15.0756 28.2036 14.9362 28.0638L4.93625 18.0638C4.79672 17.9242 4.68604 17.7586 4.61053 17.5763C4.53501 17.394 4.49615 17.1986 4.49615 17.0013C4.49615 16.8039 4.53501 16.6085 4.61053 16.4262C4.68604 16.2439 4.79672 16.0783 4.93625 15.9388C5.07578 15.7992 5.24142 15.6885 5.42373 15.613C5.60603 15.5375 5.80143 15.4987 5.99875 15.4987C6.19607 15.4987 6.39147 15.5375 6.57377 15.613C6.75608 15.6885 6.92172 15.7992 7.06125 15.9388L16 24.875L24.9387 15.935C25.0783 15.7958 25.2439 15.6854 25.4262 15.6103C25.6084 15.5351 25.8037 15.4966 26.0008 15.497C26.1979 15.4973 26.393 15.5365 26.575 15.6123C26.7569 15.6881 26.9222 15.799 27.0612 15.9388ZM14.9362 18.0638C15.0756 18.2036 15.2412 18.3146 15.4235 18.3903C15.6058 18.466 15.8013 18.5049 15.9987 18.5049C16.1962 18.5049 16.3917 18.466 16.574 18.3903C16.7563 18.3146 16.9219 18.2036 17.0613 18.0638L27.0612 8.06376C27.2008 7.92423 27.3115 7.75858 27.387 7.57628C27.4625 7.39398 27.5014 7.19858 27.5014 7.00126C27.5014 6.80393 27.4625 6.60854 27.387 6.42624C27.3115 6.24393 27.2008 6.07829 27.0612 5.93876C26.9217 5.79923 26.7561 5.68855 26.5738 5.61304C26.3915 5.53752 26.1961 5.49866 25.9987 5.49866C25.8014 5.49866 25.606 5.53752 25.4237 5.61304C25.2414 5.68855 25.0758 5.79923 24.9362 5.93876L16 14.875L7.06125 5.93876C6.77946 5.65697 6.39726 5.49866 5.99875 5.49866C5.60024 5.49866 5.21804 5.65697 4.93625 5.93876C4.65446 6.22055 4.49615 6.60274 4.49615 7.00126C4.49615 7.39977 4.65446 7.78197 4.93625 8.06376L14.9362 18.0638Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </div>
        )}

        <div className=' hidden lg:flex mx-auto justify-center lg:w-[624px] xl:w-[913px] 2xl:w-[1138px] items-center gap-2'>
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              className='lg:w-[85px] lg:h-[85px] xl:w-[123px] xl:h-[123px] 2xl:w-[156px] 2xl:h-[156px] rounded-md'
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='pt-2 flex flex-col items-center justify-between lg:block lg:justify-start x0:h-[92vh] lg:h-fit '>
      <h1 className='text-2xl font-bold mt-2 mb-8 text-center text-[#11111a] dark:text-[#ffffff]'>
        Weekly Stats
      </h1>

      <div className='x0:block lg:hidden pt-2 '>
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
                  className='pl-1 flex justify-center items-center sm:basis-1/3 md:basis-1/2 '
                >
                  <div className='p-1'>
                    <Card className='x0:w-44 xs:w-52 sm:w-44 bg-gray-100/50 hover:bg-gray-100/30 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/30'>
                      <CardContent className='flex flex-col aspect-square items-center justify-center x0:p-2 xs:p-6 sm:p-2'>
                        <p className='text-lg font-semibold p-1'>{dayName}</p>
                        <p className='text-sm '>{formattedDate}</p>

                        <div className='text-center justify-center pb-0'>
                          Mood of the day:
                        </div>
                        <div className='text-center justify-center text-base font-semibold'>
                          {mood === null ? 'not stated' : mood.mood}
                        </div>
                        <div className='justify-center p-2'>
                          <img
                            src={
                              mood === null
                                ? moodIcons['']
                                : moodIcons[mood.mood]
                            }
                            alt={mood === null ? 'not stated' : mood.mood}
                            className='size-20 cursor-pointer'
                            onClick={() => handleClickMiny(date)}
                          />
                        </div>
                        <div className='text-sm flex flex-col gap-2 justify-center items-center'>
                          <Button
                            className='p-1'
                            onClick={() => handleClickMinyFullInfo(date)}
                          >
                            Get full info
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='size-5'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                />
                              </svg>
                            </span>
                          </Button>
                          <Button
                            className='p-1'
                            onClick={() => handleClickMinyChangeInfo(date)}
                          >
                            Edit {dayName} mood
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='size-5'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                                />
                              </svg>
                            </span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious className='text-[#11111a] dark:text-[#ffffff]' />
          <CarouselNext className='text-[#11111a] dark:text-[#ffffff]' />
        </Carousel>
      </div>

      {isDark ? (
        <div className='flex flex-col justify-center items-center  mb-5 lg:hidden'>
          <p className='mb-2 text-[#ffffff] '>Set your mood of the day</p>

          <Image
            src='/CaretDoubleDown.svg'
            height={1000}
            width={1000}
            className='h-8 w-8 cursor-pointer transition-transform duration-300 opacity-[0.4] hover:opacity-[0.8] fill-current text-gray-500 hover:text-gray-800 hover:scale-110 active:scale-95'
            alt='arrows'
            onClick={handleScrollToMoodOfTheDay}
          />
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center mb-5 lg:hidden'>
          <p className='mb-2'>Set your mood of the day</p>

          <div
            onClick={handleScrollToMoodOfTheDay}
            className='h-8 w-8 cursor-pointer transition-transform duration-300 opacity-40 hover:opacity-80 fill-current text-gray-400 dark:text-white hover:scale-110 active:scale-95'
          >
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-full w-full'
            >
              <path
                d='M27.0612 15.9388C27.2011 16.0781 27.312 16.2437 27.3878 16.426C27.4635 16.6084 27.5024 16.8038 27.5024 17.0013C27.5024 17.1987 27.4635 17.3942 27.3878 17.5765C27.312 17.7588 27.2011 17.9244 27.0612 18.0638L17.0613 28.0638C16.9219 28.2036 16.7563 28.3146 16.574 28.3903C16.3917 28.466 16.1962 28.5049 15.9987 28.5049C15.8013 28.5049 15.6058 28.466 15.4235 28.3903C15.2412 28.3146 15.0756 28.2036 14.9362 28.0638L4.93625 18.0638C4.79672 17.9242 4.68604 17.7586 4.61053 17.5763C4.53501 17.394 4.49615 17.1986 4.49615 17.0013C4.49615 16.8039 4.53501 16.6085 4.61053 16.4262C4.68604 16.2439 4.79672 16.0783 4.93625 15.9388C5.07578 15.7992 5.24142 15.6885 5.42373 15.613C5.60603 15.5375 5.80143 15.4987 5.99875 15.4987C6.19607 15.4987 6.39147 15.5375 6.57377 15.613C6.75608 15.6885 6.92172 15.7992 7.06125 15.9388L16 24.875L24.9387 15.935C25.0783 15.7958 25.2439 15.6854 25.4262 15.6103C25.6084 15.5351 25.8037 15.4966 26.0008 15.497C26.1979 15.4973 26.393 15.5365 26.575 15.6123C26.7569 15.6881 26.9222 15.799 27.0612 15.9388ZM14.9362 18.0638C15.0756 18.2036 15.2412 18.3146 15.4235 18.3903C15.6058 18.466 15.8013 18.5049 15.9987 18.5049C16.1962 18.5049 16.3917 18.466 16.574 18.3903C16.7563 18.3146 16.9219 18.2036 17.0613 18.0638L27.0612 8.06376C27.2008 7.92423 27.3115 7.75858 27.387 7.57628C27.4625 7.39398 27.5014 7.19858 27.5014 7.00126C27.5014 6.80393 27.4625 6.60854 27.387 6.42624C27.3115 6.24393 27.2008 6.07829 27.0612 5.93876C26.9217 5.79923 26.7561 5.68855 26.5738 5.61304C26.3915 5.53752 26.1961 5.49866 25.9987 5.49866C25.8014 5.49866 25.606 5.53752 25.4237 5.61304C25.2414 5.68855 25.0758 5.79923 24.9362 5.93876L16 14.875L7.06125 5.93876C6.77946 5.65697 6.39726 5.49866 5.99875 5.49866C5.60024 5.49866 5.21804 5.65697 4.93625 5.93876C4.65446 6.22055 4.49615 6.60274 4.49615 7.00126C4.49615 7.39977 4.65446 7.78197 4.93625 8.06376L14.9362 18.0638Z'
                fill='currentColor'
              />
            </svg>
          </div>
        </div>
      )}

      <div className='hidden lg:block'>
        <Menubar className='w-fit mx-auto'>
          {Object.entries(moodData).map(
            ([date, { dayName, formattedDate, mood }]) => (
              <MenubarMenu key={dayName + formattedDate}>
                <MenubarTrigger
                  onClick={() => handleClickLg(date)}
                  className='font-semibold h-full cursor-pointer'
                >
                  <div className='flex flex-col justify-center items-center'>
                    <img
                      src={mood === null ? moodIcons[''] : moodIcons[mood.mood]}
                      alt={mood === null ? 'not stated' : mood.mood}
                      className='absolute  lg:size-20 xl:size-28 2xl:size-36'
                      style={{ opacity: 0.8 }}
                    />
                    <div className='z-10 bg-gray-100/50 dark:bg-neutral-800/50 rounded-xl p-1'>
                      <p className='md:text-lg lg:text-xl '>{dayName}</p>
                      <p className='text-sm '>{formattedDate}</p>
                    </div>
                  </div>
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarItem
                    disabled
                    className='text-center justify-center pb-0'
                  >
                    Mood of the day:
                  </MenubarItem>
                  <MenubarItem
                    disabled
                    className='text-center justify-center text-base font-semibold'
                  >
                    {mood === null ? 'not stated' : mood.mood}
                  </MenubarItem>
                  <MenubarItem disabled className='justify-center pb-2'>
                    <img
                      src={mood === null ? moodIcons[''] : moodIcons[mood.mood]}
                      alt={mood === null ? 'not stated' : mood.mood}
                      className='size-20'
                    />
                  </MenubarItem>
                  <MenubarItem onClick={() => handleClickLgChangeInfo(date)}>
                    Edit {dayName} mood
                    <MenubarShortcut>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                        />
                      </svg>
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleClickLgFullInfo(date)}>
                    Get full info
                    <MenubarShortcut>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                        />
                      </svg>
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            )
          )}
        </Menubar>
      </div>
    </div>
  );
};

export default WeeklyStats;
