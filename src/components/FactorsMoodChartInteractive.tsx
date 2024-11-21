'use client';
import { useState } from 'react';
import { AggregatedDataFactors } from '@/app/pages/FactorsPage';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { ChartContainer, ChartTooltip } from './ui/chart';
import { CartesianGrid, XAxis, LineChart, Line, Dot, YAxis } from 'recharts';
import ChartTooltipContentFactors from './ChartTooltipContentFactors';
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

  // Функция для получения данных за последние 7 дней или 30 дней
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
    return dates.reverse(); // Повернуть для отображения с самой последней даты
  };

  const sortedWeekDates = getSortedDates(7);
  const sortedMonthDates = getSortedDates(30);

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
        {/* <ChartContainer
          config={factorsChartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full '
        >
          <LineChart
            accessibilityLayer
            data={
              activeChartPeriod === '7' ? formattedWeekData : formattedMonthData
            }
          >
            <CartesianGrid vertical={false} />
            <YAxis
              domain={[1, 5]}
              tickCount={5}
              tickLine={false}
              axisLine={false}
              hide={true}
            />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              hide={true}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;
                const data = payload[0].payload as {
                  month: string;
                  date: number;
                  mood: 1 | 2 | 3 | 4 | 5 | 6;
                  factors: string[];
                };
                const formattedDate = `${data.month} ${data.date}`;
                const moodText =
                  factorsChartConfig[data.mood]?.label || 'Unknown';
                const factorsList = data.factors.length
                  ? data.factors.join(', ')
                  : 'Not stated';
                const moodColor =
                  factorsChartConfig[data.mood]?.color || 'var(--dot-tr)';

                return (
                  <ChartTooltipContentFactors
                    formattedDate={formattedDate}
                    moodText={moodText}
                    factorsList={factorsList}
                    moodColor={moodColor}
                  />
                );
              }}
            />
            <Line
              dataKey='mood'
              type='bumpX'
              stroke='var(--line)'
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                const typedPayload = payload as {
                  mood: 1 | 2 | 3 | 4 | 5 | 6;
                };
                const color =
                  factorsChartConfig[typedPayload.mood]?.color ||
                  'var(--dot-tr)';
                return (
                  <Dot
                    key={payload.browser}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={color}
                    stroke={color}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer> */}

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
