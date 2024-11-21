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

  // Функция для фильтрации данных за последние 3 и 6 месяцев
  const filterDataByMonths = (months: number) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // Получаем текущий месяц (0-11)
    const currentYear = today.getFullYear(); // Получаем текущий год

    // Рассчитываем диапазон месяцев (например, 3 месяца назад)
    const monthsAgo = currentMonth - months + 1; // +1, потому что нужно включить текущий месяц

    const filteredData = chartData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.getMonth(); // Месяц записи (0-11)
      const entryYear = entryDate.getFullYear(); // Год записи

      // Проверяем, находится ли запись в диапазоне последних 'months' месяцев
      if (entryYear === currentYear) {
        // Если год записи совпадает с текущим, проверяем месяц
        return entryMonth >= monthsAgo && entryMonth <= currentMonth;
      } else if (entryYear === currentYear - 1 && months === 6) {
        // Если год записи - прошлый, а фильтруем за последние 6 месяцев
        return entryMonth <= currentMonth && entryMonth >= 6;
      }
      return false;
    });

    return filteredData;
  };

  // Группировка данных по месяцам
  const groupDataByMonth = (data: MoodDataItem[]) => {
    const groupedData: Record<string, any> = {};

    data.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const month = entryDate.toLocaleString('en-US', { month: 'short' }); // Nov, Oct
      if (!groupedData[month]) {
        groupedData[month] = {
          verybad: 0,
          slightlybad: 0,
          okay: 0,
          slightlygood: 0,
          verygood: 0,
        };
      }
      const mood = entry.data.mood.toLowerCase().replace(' ', ''); // Приводим настроение к стандартному виду
      // Увеличиваем счетчик настроений для месяца
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

  // Получаем данные за последние 6 и 3 месяца
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
            <Bar
              dataKey='verybad'
              stackId='a'
              fill='var(--chart-1)'
              radius={0}
            />
            <Bar
              dataKey='slightlybad'
              stackId='a'
              fill='var(--chart-2)'
              radius={0}
            />
            <Bar dataKey='okay' stackId='a' fill='var(--chart-3)' radius={0} />
            <Bar
              dataKey='slightlygood'
              stackId='a'
              fill='var(--chart-4)'
              radius={0}
            />
            <Bar
              dataKey='verygood'
              stackId='a'
              fill='var(--chart-5)'
              radius={0}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <ChartFooter chartConfig={chartConfig} />
    </Card>
  );
};

export default MonthlyMoodChart;
