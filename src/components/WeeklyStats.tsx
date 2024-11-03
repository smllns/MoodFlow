'use client';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import React from 'react';
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

const emotionsByDay: Record<string, Mood> = {
  Sun: 'Very bad',
  Mon: 'Slightly bad',
  Tue: 'Okay',
  Wed: 'Slightly good',
  Thu: 'Very good',
  Fri: '',
  Sat: 'Slightly good',
};
type Mood =
  | 'Very bad'
  | 'Slightly bad'
  | 'Okay'
  | 'Slightly good'
  | 'Very good'
  | '';

const moodIcons: Record<Mood, string> = {
  'Very bad': 'verybad.svg',
  'Slightly bad': 'kindabad.svg',
  Okay: 'normal.svg',
  'Slightly good': 'kindagood.svg',
  'Very good': 'verygood.svg',
  '': 'notstated.svg',
};

const WeeklyStats = () => {
  const getWeekDaysWithDates = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentDayIndex = today.getDay();

    const weekDaysWithDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = daysOfWeek[(currentDayIndex - i + 7) % 7];
      const formattedDate = `${date.getDate()}.${date.getMonth() + 1}`;
      weekDaysWithDates.push([dayName, formattedDate]);
    }

    return weekDaysWithDates.reverse();
  };

  const weekDaysWithDates = getWeekDaysWithDates();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className='pt-5'>
      <h1 className='text-2xl font-bold mt-8 mb-8 text-center text-[#11111a] dark:text-[#ffffff]'>
        Weekly Stats
      </h1>

      <div className='x0:block lg:hidden pt-2'>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className='w-full x0:max-w-60 sm:max-w-xl md:max-w-sm mx-auto'
        >
          <CarouselContent className='-ml-1'>
            {weekDaysWithDates.map(([day, date]) => (
              <CarouselItem
                key={day}
                className='pl-1 flex justify-center items-center sm:basis-1/3 md:basis-1/2'
              >
                <div className='p-1'>
                  <Card className='x0:w-44 xs:w-52 sm:w-44'>
                    <CardContent className='flex flex-col aspect-square items-center justify-center x0:p-2 xs:p-6 sm:p-2'>
                      <p className='text-lg font-semibold p-1'>{day}</p>
                      <p className='text-sm '>{date}</p>

                      <div className='text-center justify-center pb-0'>
                        Mood of the day:
                      </div>
                      <div className='text-center justify-center text-base font-semibold'>
                        {emotionsByDay[day] || 'not stated'}
                      </div>
                      <div className='justify-center p-2'>
                        <img
                          src={moodIcons[emotionsByDay[day]]}
                          alt={emotionsByDay[day]}
                          className='size-20'
                        />
                      </div>
                      <div className='text-sm flex flex-row gap-2 justify-center items-center'>
                        <Button className='p-1'>
                          Edit {day} mood
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
            ))}
          </CarouselContent>
          <CarouselPrevious className='text-[#11111a] dark:text-[#ffffff]' />
          <CarouselNext className='text-[#11111a] dark:text-[#ffffff]' />
        </Carousel>
      </div>

      <div className='hidden lg:block'>
        <Menubar className='w-fit mx-auto'>
          {weekDaysWithDates.map(([day, date]) => (
            <MenubarMenu key={day + date}>
              <MenubarTrigger className='font-semibold h-full'>
                <div className='flex flex-col justify-center items-center'>
                  <img
                    src={moodIcons[emotionsByDay[day]]}
                    alt={emotionsByDay[day]}
                    className='absolute md:size-10 lg:size-20 xl:size-28 2xl:size-36'
                    style={{ opacity: 0.8 }}
                  />
                  <div className='z-10 bg-gray-100/50 dark:bg-neutral-800/50 rounded-xl p-1'>
                    <p className='md:text-lg lg:text-xl '>{day}</p>
                    <p className='text-sm '>{date}</p>
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
                  {emotionsByDay[day] || 'not stated'}
                </MenubarItem>
                <MenubarItem disabled className='justify-center pb-2'>
                  <img
                    src={moodIcons[emotionsByDay[day]]}
                    alt={emotionsByDay[day]}
                    className='size-20'
                  />
                </MenubarItem>
                <MenubarItem>
                  Edit {day} mood
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
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>
    </div>
  );
};

export default WeeklyStats;
