//chart footer reusable component for charts
'use client';
import React from 'react';
import { CardFooter } from './ui/card';
import { ChartConfig } from './ui/chart';

const ChartFooter: React.FC<{ chartConfig: ChartConfig }> = ({
  chartConfig,
}) => {
  return (
    <CardFooter className='flex flex-wrap gap-4 items-center justify-center text-sm'>
      {Object.keys(chartConfig).map((key) => {
        const { color, label } = chartConfig[key as keyof typeof chartConfig];
        return (
          <div key={key} className='flex items-center gap-2'>
            <div
              style={{ backgroundColor: color }}
              className='w-3 h-3 rounded-full'
            ></div>
            <span className='text-xs'>{label}</span>
          </div>
        );
      })}
    </CardFooter>
  );
};

export default ChartFooter;
