//chart navigation reusable component for interactive charts
'use client';
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from './ui/card';

interface ChartNavigationProps {
  active: string;
  setActiveChartPeriod: (period: string) => void;
  num1: number;
  num2: number;
  headerClass?: string;
  dates: string;
  descData1?: string;
  descData2?: string;
}

const ChartNavigation: React.FC<ChartNavigationProps> = ({
  active,
  setActiveChartPeriod,
  num1,
  num2,
  headerClass,
  dates,
  descData1,
  descData2,
}) => {
  // Handler to update the active chart period
  const handleChartChange = (period: string) => {
    setActiveChartPeriod(period);
  };

  return (
    <CardHeader
      className={`flex flex-col items-stretch space-y-0  p-0 ${headerClass}  border-neutral-200 dark:border-neutral-800`}
    >
      <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 '>
        <CardTitle className='pr-6 text-lg'>
          Information for the last{' '}
          {active === `${num1}` ? `${num1} ${dates}` : `${num2} ${dates}`}
        </CardTitle>
        {descData1 && (
          <CardDescription className='py-2 text-sm'>
            Your average sleep time is{' '}
            {active === `${num2}` ? descData2 : descData1}
          </CardDescription>
        )}
      </div>
      <div className='flex'>
        {[num1, num2].map((num) => (
          <button
            key={num}
            onClick={() => handleChartChange(`${num}`)}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0 border border-neutral-200 dark:border-neutral-800 ${
              active === `${num}` ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            Last {num} {dates}
          </button>
        ))}
      </div>
    </CardHeader>
  );
};

export default ChartNavigation;
