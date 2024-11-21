//showing Mood Menu for WeeklyStats component on larger screens
'use client';
import React from 'react';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { moodIcons } from '@/lib/constants';

interface MoodMenuProps {
  mood: { mood: string } | null;
  dayName: string;
  formattedDate: string;
  date: string;
  onClickLg: (date: string) => void;
  onClickLgFullInfo: (date: string) => void;
  onClickLgChangeInfo: (date: string) => void;
}

const MoodMenu: React.FC<MoodMenuProps> = ({
  mood,
  dayName,
  formattedDate,
  date,
  onClickLg,
  onClickLgFullInfo,
  onClickLgChangeInfo,
}) => {
  return (
    <MenubarMenu key={dayName + formattedDate}>
      <MenubarTrigger
        onClick={() => onClickLg(date)}
        className='font-semibold h-full cursor-pointer'
      >
        <div className='flex flex-col justify-center items-center'>
          <img
            src={
              mood === null
                ? moodIcons['']
                : moodIcons[mood.mood as keyof typeof moodIcons]
            }
            alt={mood === null ? 'not stated' : mood.mood}
            className='absolute lg:size-20 xl:size-28 2xl:size-36'
            style={{ opacity: 0.8 }}
          />
          <div className='z-10 bg-gray-100/50 dark:bg-neutral-800/50 rounded-xl p-1'>
            <p className='md:text-lg lg:text-xl'>{dayName}</p>
            <p className='text-sm'>{formattedDate}</p>
          </div>
        </div>
      </MenubarTrigger>

      <MenubarContent>
        <MenubarItem disabled className='text-center justify-center pb-0'>
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
            src={
              mood === null
                ? moodIcons['']
                : moodIcons[mood.mood as keyof typeof moodIcons]
            }
            alt={mood === null ? 'not stated' : mood.mood}
            className='size-20'
          />
        </MenubarItem>
        <MenubarItem onClick={() => onClickLgChangeInfo(date)}>
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
        <MenubarItem onClick={() => onClickLgFullInfo(date)}>
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
  );
};

export default MoodMenu;
