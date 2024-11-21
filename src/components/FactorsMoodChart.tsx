// React functional component to display a mood chart based on factors
'use client';
import React from 'react';
import { useState } from 'react';
import { AggregatedDataFactors } from '@/app/pages/FactorsPage';
import { Card, CardContent } from './ui/card';
import { factorsChartConfig, monthNames } from '@/lib/constants';
import LoadingSpinner from './LoadingSpinner';
import ChartNavigation from './ChartNavigation';
import ChartFooter from './ChartFooter';
import CommonFactorsChart from './CommonFactorsChart';

interface FactorsMoodChartProps {
  chartData: AggregatedDataFactors[];
  loading: boolean;
}

const FactorsMoodChart: React.FC<FactorsMoodChartProps> = ({
  chartData,
  loading,
}) => {
  const [activeChartPeriod, setActiveChartPeriod] = useState<string>('3');

  // Show loading indicator while data is being loaded
  if (loading) {
    return (
      <LoadingSpinner containerClassName='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]' />
    );
  }

  // Get the current date, month, and year for calculating the date range
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthsMap = monthNames;

  // Calculating the months to display based on the active chart period
  const sortedMonths = Array.from(
    { length: Number(activeChartPeriod) },
    (_, i) => {
      const monthIndex =
        (currentMonth - (Number(activeChartPeriod) - 1 - i) + 12) % 12;
      const year = monthIndex > currentMonth ? currentYear - 1 : currentYear;
      return { monthName: monthsMap[monthIndex], monthIndex, year };
    }
  );

  const filteredData = chartData.filter((item) =>
    sortedMonths.some((month) => month.monthName === item.month)
  );

  // Formatting the data for each day in the selected months, filling in missing days
  const formattedData = sortedMonths.flatMap(
    ({ monthName, monthIndex, year }) => {
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const day = dayIndex + 1;
        const existingData = filteredData.find(
          (item) => item.month === monthName && item.date === day
        );

        return existingData
          ? {
              month: monthName,
              date: day,
              mood: existingData.mood,
              factors: existingData.factors,
            }
          : {
              month: monthName,
              date: day,
              mood: 0,
              factors: ['Not stated'],
            };
      });
    }
  );
  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50 '>
      <ChartNavigation
        active={activeChartPeriod}
        setActiveChartPeriod={setActiveChartPeriod}
        num1={3}
        num2={6}
        dates='months'
      />
      <CardContent>
        <CommonFactorsChart
          data={formattedData}
          factorsConfig={factorsChartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full'
        />
        <div className='flex flex-row justify-around text-neutral-500 dark:text-neutral-400 text-sm font-normal'>
          {sortedMonths.map((month, index) => (
            <p key={index}>{month.monthName}</p>
          ))}
        </div>
      </CardContent>
      <ChartFooter chartConfig={factorsChartConfig} />
    </Card>
  );
};

export default FactorsMoodChart;
