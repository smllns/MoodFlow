// React functional component to display a mood chart based on factors
'use client';
import { useState } from 'react';
import { AggregatedDataFactors } from '@/app/pages/FactorsPage';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { factorsChartConfig, monthNames } from '@/lib/constants';
import LoadingSpinner from './LoadingSpinner';
import ChartNavigation from './ChartNavigation';
import ChartFooter from './ChartFooter';
import CommonFactorsChart from './CommonFactorsChart';

interface FactorsMoodChartProps {
  weekChartData: AggregatedDataFactors[];
  monthChartData: AggregatedDataFactors[];
  loading: boolean;
}

const FactorsMoodChartInteractive: React.FC<FactorsMoodChartProps> = ({
  weekChartData,
  monthChartData,
  loading,
}) => {
  const [activeChartPeriod, setActiveChartPeriod] = useState<string>('7');

  // Show loading indicator while data is being loaded
  if (loading) {
    return (
      <LoadingSpinner containerClassName='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]' />
    );
  }

  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  // Function to generate an array of dates for a given period (7 or 30 days)
  const getSortedDates = (period: number) => {
    const dates = [];
    for (let i = 0; i < period; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDay - i);
      dates.push({
        day: date.getDate(),
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
      });
    }
    return dates.reverse();
  };

  const sortedWeekDates = getSortedDates(7);
  const sortedMonthDates = getSortedDates(30);

  // Format chart data to ensure all dates are represented, even if some are missing in the data
  const formatChartData = (
    chartData: AggregatedDataFactors[],
    sortedDates: any[]
  ) => {
    const filteredData = chartData.filter((item) =>
      sortedDates.some(
        (date) => date.day === item.date && date.month === item.month
      )
    );

    return sortedDates.flatMap(({ day, month, year }) => {
      const existingData = filteredData.find(
        (item) => item.month === month && item.date === day
      );

      // If data exists for the date, use it; otherwise, set a default
      return existingData
        ? {
            month: month,
            date: day,
            mood: existingData.mood,
            factors: existingData.factors,
          }
        : {
            month: month,
            date: day,
            mood: 0,
            factors: ['Not stated'],
          };
    });
  };

  const formattedWeekData = formatChartData(weekChartData, sortedWeekDates);
  const formattedMonthData = formatChartData(monthChartData, sortedMonthDates);

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <ChartNavigation
        active={activeChartPeriod}
        setActiveChartPeriod={setActiveChartPeriod}
        num1={7}
        num2={30}
        headerClass='lg:flex-row lg:border-b'
        dates='days'
      />
      <CardContent>
        <CommonFactorsChart
          data={
            activeChartPeriod === '7' ? formattedWeekData : formattedMonthData
          }
          factorsConfig={factorsChartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full'
        />
        {activeChartPeriod === '7' && (
          <div className='x0:hidden xs:flex flex-row justify-around text-neutral-500 dark:text-neutral-400 text-sm font-normal'>
            {sortedWeekDates.map((date, index) => (
              <p
                key={index}
                className='text-base'
              >{`${date.day} ${date.month}`}</p>
            ))}
          </div>
        )}
        {activeChartPeriod === '30' && (
          <div className='x0:hidden xl:flex flex-row justify-around text-neutral-500 dark:text-neutral-400 text-sm font-normal'>
            {sortedMonthDates.map((date, index) => (
              <p key={index} className='text-lg'>
                {date.day}
              </p>
            ))}
          </div>
        )}
      </CardContent>
      <ChartFooter chartConfig={factorsChartConfig} />
    </Card>
  );
};

export default FactorsMoodChartInteractive;
