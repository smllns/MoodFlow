//loader skeleton for WeeklyStats component
'use client';
import React from 'react';
import { Skeleton } from './ui/skeleton';
import ScrollIcon from './ScrollIcon';
import PageTitle from './ui/page-title';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Card } from './ui/card';

interface WeeklyLoaderProps {
  handleScrollToMoodOfTheDay: () => void;
  isDark: boolean;
}

const WeeklyLoader: React.FC<WeeklyLoaderProps> = ({
  handleScrollToMoodOfTheDay,
  isDark,
}) => {
  return (
    <div className='pt-2 flex flex-col items-center justify-between lg:block lg:justify-start x0:h-[92vh] lg:h-fit '>
      <PageTitle title='Weekly Stats' />
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

      <div className='flex flex-col justify-center items-center  mb-5 lg:hidden'>
        <p className='mb-2 '>Set your mood of the day</p>
        <ScrollIcon onClick={handleScrollToMoodOfTheDay} isDark={isDark} />
      </div>

      <div className=' hidden lg:flex mx-auto justify-center lg:w-[624px] xl:w-[913px] 2xl:w-[1138px] items-center gap-2'>
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={index}
            className='lg:w-[85px] lg:h-[85px] xl:w-[123px] xl:h-[123px] 2xl:w-[156px] 2xl:h-[156px] rounded-md mt-5'
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyLoader;
