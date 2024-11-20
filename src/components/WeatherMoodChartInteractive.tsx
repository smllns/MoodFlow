'use client';
import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { CartesianGrid, BarChart, Bar, XAxis } from 'recharts';
import Image from 'next/image';
import { AggregatedDataWeather } from '@/app/pages/WeatherPage';
import { chartConfig } from '@/lib/constants';
import ChartNavigation from './ChartNavigation';
import ChartFooter from './ChartFooter';

interface WeatherMoodChartProps {
  chartData7: AggregatedDataWeather[];
  chartData30: AggregatedDataWeather[];
  loading: boolean;
  weather7: string | undefined;
  weather30: string | undefined;
}
const WeatherMoodChartInteractive: React.FC<WeatherMoodChartProps> = ({
  chartData7,
  chartData30,
  loading,
  weather7,
  weather30,
}) => {
  const [activeChart, setActiveChart] = React.useState<string>('30');

  if (loading) {
    return (
      <Card className='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]'>
        <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
      </Card>
    );
  }

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <ChartNavigation
        active={activeChart}
        setActiveChartPeriod={setActiveChart}
        num1={7}
        num2={30}
        headerClass='lg:flex-row lg:border-b'
        dates='days'
        descData1={weather7}
        descData2={weather30}
      />
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
      <ChartFooter chartConfig={chartConfig} />
    </Card>
  );
};

export default WeatherMoodChartInteractive;
