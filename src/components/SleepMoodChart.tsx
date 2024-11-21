'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { CartesianGrid, BarChart, Bar, XAxis } from 'recharts';
import { AggregatedData } from '@/app/pages/SleepPage';
import { chartConfig } from '@/lib/constants';
import LoadingSpinner from './LoadingSpinner';
import ChartFooter from './ChartFooter';

interface SleepMoodChartProps {
  chartData: AggregatedData[];
  info: string;
  loading: boolean;
  sleep: string | undefined;
}
const SleepMoodChart: React.FC<SleepMoodChartProps> = ({
  chartData,
  info,
  loading,
  sleep,
}) => {
  // Show loading indicator while data is being loaded
  if (loading) {
    return (
      <LoadingSpinner containerClassName='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]' />
    );
  }
  console.log(chartData);
  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <CardHeader>
        <CardTitle className='pb-2 text-lg'>{info}</CardTitle>
        <CardDescription className='pb-2 text-sm'>
          Your average sleep time is {sleep}
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
              dataKey='sleep'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.keys(chartConfig).map((key) => {
              const { label, color } =
                chartConfig[key as keyof typeof chartConfig];

              return (
                <Bar
                  key={key}
                  dataKey={label}
                  fill={color}
                  radius={[5, 5, 0, 0]}
                />
              );
            })}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartFooter chartConfig={chartConfig} />
    </Card>
  );
};

export default SleepMoodChart;
