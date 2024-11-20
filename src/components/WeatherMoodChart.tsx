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
import LoadingSpinner from './LoadingSpinner';
import ChartFooter from './ChartFooter';

interface WeatherMoodChartProps {
  chartData: AggregatedDataWeather[];
  info: string;
  loading: boolean;
  weather: string | undefined;
}

const WeatherMoodChart: React.FC<WeatherMoodChartProps> = ({
  chartData,
  info,
  loading,
  weather,
}) => {
  // Show loading indicator while data is being loaded
  if (loading) {
    return (
      <LoadingSpinner containerClassName='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]' />
    );
  }

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <CardHeader>
        <CardTitle className='pb-2 text-lg'>{info}</CardTitle>
        <CardDescription className='pb-2 text-sm'>
          The most frequent weather: {weather}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full'
        >
          <BarChart accessibilityLayer data={chartData}>
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
      <ChartFooter chartConfig={chartConfig} />
    </Card>
  );
};

export default WeatherMoodChart;
