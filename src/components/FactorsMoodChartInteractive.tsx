import { useState } from 'react';
import { AggregatedDataFactors, monthNames } from '@/app/pages/FactorsPage';
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from './ui/chart';
import { CartesianGrid, XAxis, LineChart, Line, Dot, YAxis } from 'recharts';
import Image from 'next/image';
import ChartTooltipContentFactors from './ChartTooltipContentFactors';

const chartConfig = {
  1: { color: 'var(--chart-1)', label: 'Very bad' },
  2: { color: 'var(--chart-2)', label: 'Slightly bad' },
  3: { color: 'var(--chart-3)', label: 'Okay' },
  4: { color: 'var(--chart-4)', label: 'Slightly good' },
  5: { color: 'var(--chart-5)', label: 'Very good' },
  6: { color: 'var(--dot-tr)', label: 'Not Stated' },
} satisfies ChartConfig;

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
  const [activeChartPeriod, setActiveChartPeriod] = useState<'7' | '30'>('7');

  const handleChartChange = (period: '7' | '30') => {
    setActiveChartPeriod(period);
  };

  if (loading) {
    return (
      <Card className='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]'>
        <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
      </Card>
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
  console.log(sortedWeekDates);

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <CardHeader className='flex flex-col items-stretch space-y-0  p-0 lg:flex-row lg:border-b border-neutral-200 dark:border-neutral-800'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 '>
          <CardTitle className='px-6 text-lg'>
            Information for the last{' '}
            {activeChartPeriod === '7' ? '7 days' : '30 days'}
          </CardTitle>
        </div>
        <div className='flex'>
          <button
            onClick={() => handleChartChange('7')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0 lg:border-l  lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChartPeriod === '7' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            7 days
          </button>
          <button
            onClick={() => handleChartChange('30')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0 lg:border-l  lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChartPeriod === '30'
                ? 'bg-gray-100 dark:bg-neutral-800'
                : ''
            }`}
          >
            30 days
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
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
                const moodText = chartConfig[data.mood]?.label || 'Unknown';
                const factorsList = data.factors.length
                  ? data.factors.join(', ')
                  : 'Not stated';
                const moodColor =
                  chartConfig[data.mood]?.color || 'var(--dot-tr)';

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
                  chartConfig[typedPayload.mood]?.color || 'var(--dot-tr)';
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
        </ChartContainer>

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

        {/* Блок с датами для 30 дней */}
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
      <CardFooter className='flex flex-wrap gap-4 items-center justify-center text-sm'>
        {Object.keys(chartConfig).map((key) => {
          const numericKey = Number(key) as keyof typeof chartConfig;
          const { color, label } = chartConfig[numericKey];
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
    </Card>
  );
};

export default FactorsMoodChartInteractive;
