//showing Mood Cards for WeeklyStats component on smaller screens
'use client';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { moodIcons } from '@/lib/constants';

interface MoodCardProps {
  mood: { mood: string } | null;
  dayName: string;
  formattedDate: string;
  date: string;
  onClickMiny: (date: string) => void;
  onClickMinyFullInfo: (date: string) => void;
  onClickMinyChangeInfo: (date: string) => void;
}

const MoodCard: React.FC<MoodCardProps> = ({
  mood,
  dayName,
  formattedDate,
  date,
  onClickMiny,
  onClickMinyFullInfo,
  onClickMinyChangeInfo,
}) => {
  return (
    <Card className='x0:w-44 xs:w-52 sm:w-44 bg-gray-100/50 hover:bg-gray-100/30 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/30'>
      <CardContent className='flex flex-col aspect-square items-center justify-center x0:p-2 xs:p-6 sm:p-2'>
        <p className='text-lg font-semibold p-1'>{dayName}</p>
        <p className='text-sm'>{formattedDate}</p>

        <div className='text-center justify-center pb-0'>Mood of the day:</div>
        <div className='text-center justify-center text-base font-semibold'>
          {mood === null ? 'not stated' : mood.mood}
        </div>
        <div className='justify-center p-2'>
          <img
            src={
              mood === null
                ? moodIcons['']
                : moodIcons[mood.mood as keyof typeof moodIcons]
            }
            alt={mood === null ? 'not stated' : mood.mood}
            className='size-20 cursor-pointer'
            onClick={() => onClickMiny(date)}
          />
        </div>
        <div className='text-sm flex flex-col gap-2 justify-center items-center'>
          <Button className='p-1' onClick={() => onClickMinyFullInfo(date)}>
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
          <Button className='p-1' onClick={() => onClickMinyChangeInfo(date)}>
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
  );
};

export default MoodCard;
