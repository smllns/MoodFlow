// React functional interactive component to display a mood chart based on weather data
'use client';
import React from 'react';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { AggregatedDataWeather } from '@/app/pages/WeatherPage';
import { chartConfig } from '@/lib/constants';
import ChartNavigation from './ChartNavigation';
import ChartFooter from './ChartFooter';
import CommonWeatherChart from './CommonWeatherChart';

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
  // Show loading indicator while data is being loaded
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
        <CommonWeatherChart
          data={activeChart === '30' ? chartData30 : chartData7}
          chartConfig={chartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full'
        />
      </CardContent>
      <ChartFooter chartConfig={chartConfig} />
    </Card>
  );
};

export default WeatherMoodChartInteractive;
