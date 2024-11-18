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
import { PieChart, Pie, Cell } from 'recharts';
import Image from 'next/image';
import { AggregatedDataMood } from '@/app/pages/FullStatsPage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { chartConfig } from '@/lib/constants';
import LoadingSpinner from './LoadingSpinner';
interface YearlyMoodPieChartProps {
  chartData1: AggregatedDataMood[];
  chartData2: AggregatedDataMood[];
  chartData3: AggregatedDataMood[];
  info1: string;
  info2: string;
  info3: string;
  loading: boolean;
  mood1: string | undefined;
  mood2: string | undefined;
  mood3: string | undefined;
  smallInfo1: string | undefined;
  smallInfo2: string | undefined;
  smallInfo3: string | undefined;
}

const YearlyMoodPieChart: React.FC<YearlyMoodPieChartProps> = ({
  chartData1,
  chartData2,
  chartData3,
  info1,
  info2,
  info3,
  loading,
  mood1,
  mood2,
  mood3,
  smallInfo1,
  smallInfo2,
  smallInfo3,
}) => {
  const [activeData, setActiveData] = React.useState<
    'allTime' | 'halfYear' | 'threeMonth'
  >('allTime');

  const handleDataSwitch = (value: 'allTime' | 'halfYear' | 'threeMonth') => {
    setActiveData(value);
  };

  const isAllTime = activeData === 'allTime';
  const isHalfYear = activeData === 'halfYear';

  const displayedChartData = isAllTime
    ? chartData1
    : isHalfYear
    ? chartData2
    : chartData3;

  const displayedInfo = isAllTime ? info1 : isHalfYear ? info2 : info3;
  const displayedMood = isAllTime ? mood1 : isHalfYear ? mood2 : mood3;

  // Calculate total count
  const totalCount = displayedChartData.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  // Calculate percentage for each mood
  const chartDataWithPercentage = displayedChartData.map((entry) => ({
    ...entry,
    percentage: parseFloat(((entry.count / totalCount) * 100).toFixed(0)), // rounded and removes trailing .0
  }));

  // Show loading indicator while data is being loaded
  if (loading) {
    return (
      <LoadingSpinner containerClassName='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center w-[290px] h-[290px]' />
    );
  }

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <CardHeader className='flex x0:flex-col sm:flex-row md:flex-col xl:flex-row justify-between items-start '>
        <div>
          <CardTitle className='pb-2 text-lg'>{displayedInfo}</CardTitle>
          <CardDescription className='pb-2 text-sm lg:max-w-[270px] h-[70px]'>
            The most frequent mood: {displayedMood}
          </CardDescription>
        </div>
        <Select value={activeData} onValueChange={handleDataSwitch}>
          <SelectTrigger
            className='h-7 w-[130px] rounded-lg pl-2.5'
            aria-label='Select data range'
          >
            <SelectValue placeholder='Select data range' />
          </SelectTrigger>
          <SelectContent align='end' className='rounded-xl'>
            <SelectItem value='allTime'>{smallInfo1}</SelectItem>
            <SelectItem value='halfYear'>{smallInfo2}</SelectItem>
            <SelectItem value='threeMonth'>{smallInfo3}</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[300px] pb-0'
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel={true} />} />
            <Pie
              data={chartDataWithPercentage}
              dataKey='count'
              nameKey='mood'
              outerRadius='fill'
              label={({ percentage }) => `${percentage}%`}
            >
              {displayedChartData.map((entry, index) => {
                const colorKey = entry.mood
                  .toLowerCase()
                  .replace(' ', '') as keyof typeof chartConfig;
                const color = chartConfig[colorKey]?.color || '#000000';
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Pie>
          </PieChart>
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

export default YearlyMoodPieChart;
