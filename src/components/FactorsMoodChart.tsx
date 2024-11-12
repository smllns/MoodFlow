import { useState } from 'react';
import { AggregatedDataFactors } from '@/app/pages/FactorsPage';
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
import { monthNames } from '@/lib/constants';

const chartConfig = {
  1: { color: 'var(--chart-1)', label: 'Very bad' },
  2: { color: 'var(--chart-2)', label: 'Slightly bad' },
  3: { color: 'var(--chart-3)', label: 'Okay' },
  4: { color: 'var(--chart-4)', label: 'Slightly good' },
  5: { color: 'var(--chart-5)', label: 'Very good' },
  6: { color: 'var(--dot-tr)', label: 'Not Stated' },
} satisfies ChartConfig;

interface FactorsMoodChartProps {
  chartData: AggregatedDataFactors[];
  loading: boolean;
}

const FactorsMoodChart: React.FC<FactorsMoodChartProps> = ({
  chartData,
  loading,
}) => {
  const [activeChartPeriod, setActiveChartPeriod] = useState<'3' | '6'>('3');

  const handleChartChange = (period: '3' | '6') => {
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
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthsMap = monthNames;

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
  console.log(formattedData);

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50 '>
      <CardHeader className='flex flex-col items-stretch space-y-0  p-0   border-neutral-200 dark:border-neutral-800'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 '>
          <CardTitle className='px-6 text-lg'>
            Information for the last{' '}
            {activeChartPeriod === '3' ? '3 months' : '6 months'}
          </CardTitle>
        </div>
        <div className='flex'>
          <button
            onClick={() => handleChartChange('3')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0 border border-neutral-200 dark:border-neutral-800 ${
              activeChartPeriod === '3' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            Last 3 months
          </button>
          <button
            onClick={() => handleChartChange('6')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0  border border-neutral-200 dark:border-neutral-800 ${
              activeChartPeriod === '6' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            Last 6 months
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full '
        >
          <LineChart accessibilityLayer data={formattedData}>
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
                const typedPayload = payload as { mood: 1 | 2 | 3 | 4 | 5 | 6 };
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
        <div className='flex flex-row justify-around text-neutral-500 dark:text-neutral-400 text-sm font-normal'>
          {sortedMonths.map((month, index) => (
            <p key={index}>{month.monthName}</p>
          ))}
        </div>
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

export default FactorsMoodChart;
