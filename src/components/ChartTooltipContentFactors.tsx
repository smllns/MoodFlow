//custom tooltip for mood factors chart
'use client';
import React from 'react';
interface ChartTooltipContentFactorsProps {
  formattedDate: string;
  moodText: string;
  factorsList: string;
  moodColor: string;
}

const ChartTooltipContentFactors: React.FC<ChartTooltipContentFactorsProps> = ({
  formattedDate,
  moodText,
  factorsList,
  moodColor,
}) => {
  return (
    <div className='grid min-w-[8rem] items-start gap-2 rounded-lg border border-neutral-200 border-neutral-200/50 bg-white px-3 py-2 text-sm shadow-xl dark:border-neutral-800 dark:border-neutral-800/50 dark:bg-neutral-950 w-[250px]'>
      <div className='font-medium'>
        <div className='pb-1 text-neutral-500 dark:text-neutral-400'>
          Date:{' '}
          <span className='text-[#000000] dark:text-[#ffffff]'>
            {formattedDate}
          </span>
        </div>
        <div className='flex flex-row gap-2 items-center pb-1'>
          <div
            className='w-1 h-3 rounded-full '
            style={{ backgroundColor: moodColor }} // Устанавливаем цвет полоски
          ></div>{' '}
          {moodText}
        </div>
        <div className=' text-neutral-500 dark:text-neutral-400'>
          Factors:{' '}
          <span className='text-[#000000] dark:text-[#ffffff]'>
            {factorsList}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ChartTooltipContentFactors;
