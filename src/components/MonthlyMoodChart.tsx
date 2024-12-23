// React interactive functional component to display a mood chart (bar chart)
'use client';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart, Bar, XAxis } from 'recharts';
import { chartConfig, MoodDataItem } from '@/lib/constants';
import LoadingSpinner from './LoadingSpinner';
import ChartNavigation from './ChartNavigation';
import ChartFooter from './ChartFooter';
interface MonthlyMoodChartProps {
  chartData: MoodDataItem[];
  loading: boolean;
}

const MonthlyMoodChart: React.FC<MonthlyMoodChartProps> = ({
  chartData,
  loading,
}) => {
  const [activeChart, setActiveChart] = React.useState<string>('6');

  // Function to filter the data based on the number of months (3 or 6)
  const filterDataByMonths = (months: number) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Calculate the month range
    const monthsAgo = currentMonth - months + 1;

    // Filter the chartData based on the calculated month range
    const filteredData = chartData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.getMonth();
      const entryYear = entryDate.getFullYear();

      if (entryYear === currentYear) {
        return entryMonth >= monthsAgo && entryMonth <= currentMonth;
      } else if (entryYear === currentYear - 1 && months === 6) {
        return entryMonth <= currentMonth && entryMonth >= 6;
      }
      return false;
    });
    return filteredData;
  };

  // Function to group data by month
  const groupDataByMonth = (data: MoodDataItem[]) => {
    const groupedData: Record<string, any> = {};

    data.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const month = entryDate.toLocaleString('en-US', { month: 'short' });

      // Initialize the month entry if it doesn't exist
      if (!groupedData[month]) {
        groupedData[month] = {
          verybad: 0,
          slightlybad: 0,
          okay: 0,
          slightlygood: 0,
          verygood: 0,
        };
      }
      const mood = entry.data.mood.toLowerCase().replace(' ', '');

      if (groupedData[month][mood] !== undefined) {
        groupedData[month][mood] += 1;
      }
    });
    return Object.entries(groupedData).map(([month, moodCounts]) => ({
      month,
      verybad: moodCounts.verybad,
      slightlybad: moodCounts.slightlybad,
      okay: moodCounts.okay,
      slightlygood: moodCounts.slightlygood,
      verygood: moodCounts.verygood,
    }));
  };

  // Get data for the last 6 and 3 months
  const chartData6 = groupDataByMonth(filterDataByMonths(6));
  const chartData3 = groupDataByMonth(filterDataByMonths(3));

  // Show loading indicator while data is being loaded
  if (loading) {
    return (
      <LoadingSpinner containerClassName='bg-gray-100/50 dark:bg-neutral-800/50 flex items-center justify-center x0:w-[288px] x0:h-[347px] xs:w-[449px] xs:h-[406px] sm:w-[545px] sm:h-[428px] md:w-[432px] md:h-[396px] lg:w-[545px] lg:h-[428x]' />
    );
  }

  return (
    <Card className='bg-gray-100/50 dark:bg-neutral-800/50'>
      <ChartNavigation
        active={activeChart}
        setActiveChartPeriod={setActiveChart}
        num1={3}
        num2={6}
        headerClass='lg:flex-row lg:border-b'
        dates='months'
      />
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='min-h-[100px] lg:min-w-[580px] xl:min-w-[670px] 2xl:min-w-[900px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={activeChart === '6' ? chartData6 : chartData3}
          >
            <XAxis dataKey='month' type='category' />
            <ChartTooltip content={<ChartTooltipContent />} />
            {Object.entries(chartConfig).map(([key, { color, label }]) => (
              <Bar
                key={key}
                dataKey={key}
                stackId='a'
                fill={color}
                radius={0}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartFooter chartConfig={chartConfig} />
    </Card>
  );
};

export default MonthlyMoodChart;
