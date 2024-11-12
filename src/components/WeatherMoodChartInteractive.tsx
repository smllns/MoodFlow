'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { CartesianGrid, BarChart, Bar, XAxis } from 'recharts';
import Image from 'next/image';
import { AggregatedDataWeather } from '@/app/pages/WeatherPage';
import { chartConfig } from '@/lib/constants';

interface WeatherMoodChartProps {
  chartData7: AggregatedDataWeather[];
  chartData30: AggregatedDataWeather[];
  info: string;
  loading: boolean;
  weather7: string | undefined;
  weather30: string | undefined;
}
const WeatherMoodChartInteractive: React.FC<WeatherMoodChartProps> = ({
  chartData7,
  chartData30,
  info,
  loading,
  weather7,
  weather30,
}) => {
  const [activeChart, setActiveChart] = React.useState<'7' | '30'>('30');

  // Function to handle button click
  const handleChartChange = (days: '7' | '30') => {
    setActiveChart(days);
  };

  if (loading) {
    return (
      <Card className='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]'>
        <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
      </Card>
    );
  }

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <CardHeader className='flex flex-col items-stretch space-y-0  p-0 lg:flex-row lg:border-b border-neutral-200 dark:border-neutral-800'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 '>
          <CardTitle className='pb-2 text-lg'>
            Information for the last {activeChart === '30' ? 30 : 7} days
          </CardTitle>
          <CardDescription className='pb-2 text-sm'>
            The most frequent weather:{' '}
            {activeChart === '30' ? weather30 : weather7}
          </CardDescription>
        </div>
        <div className='flex '>
          {/* Buttons to switch between charts */}
          <button
            onClick={() => handleChartChange('30')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0 lg:border-l  lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChart === '30' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => handleChartChange('7')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-r-0 lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChart === '7' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            7 Days
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={activeChart === '30' ? chartData30 : chartData7}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='weather'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey='Very bad'
              stackId='a'
              fill='var(--chart-1)'
              // radius={[0, 0, 4, 4]}
              radius={0}
            />
            <Bar
              dataKey='Slightly bad'
              stackId='a'
              fill='var(--chart-2)'
              // radius={[4, 4, 0, 0]}
              radius={0}
            />
            <Bar
              dataKey='Okay'
              stackId='a'
              fill='var(--chart-3)'
              // radius={[4, 4, 0, 0]}
              radius={0}
            />
            <Bar
              dataKey='Slightly good'
              stackId='a'
              fill='var(--chart-4)'
              // radius={[4, 4, 0, 0]}
              radius={0}
            />
            <Bar
              dataKey='Very good'
              stackId='a'
              fill='var(--chart-5)'
              // radius={[4, 4, 0, 0]}
              radius={0}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
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
    </Card>
  );
};

export default WeatherMoodChartInteractive;
