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
import { BarChart, Bar, XAxis } from 'recharts';
import Image from 'next/image';
import { chartConfig, MoodDataItem } from '@/lib/constants';
interface MonthlyMoodChartProps {
  chartData: MoodDataItem[];
  // info: string;
  loading: boolean;
}

const MonthlyMoodChart: React.FC<MonthlyMoodChartProps> = ({
  chartData,
  // info,
  loading,
}) => {
  const [activeChart, setActiveChart] = React.useState<'3' | '6'>('6');

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
  console.log(chartData3);
  console.log(chartData6);
  console.log(activeChart);
  // Обработка кнопок для переключения между 3 и 6 месяцами
  const handleChartChange = (days: '3' | '6') => {
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
            Information for the last {activeChart === '3' ? 3 : 6} months
          </CardTitle>
          <CardDescription className='pb-2 text-sm'>
            Your mood stats for the last {activeChart === '3' ? '3' : '6'}{' '}
            months
            {/* {activeChart === '3' ? mood : weather7} */}
          </CardDescription>
        </div>
        <div className='flex '>
          {/* Buttons to switch between charts */}
          <button
            onClick={() => handleChartChange('3')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-l-0 lg:border-l  lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChart === '3' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            3 Months
          </button>
          <button
            onClick={() => handleChartChange('6')}
            className={`flex-1 x0:px-6 x0:py-4 x0:border-r-0 lg:border-b-0 lg:border-t-0 lg:px-4 lg:py-2 border border-neutral-200 dark:border-neutral-800 ${
              activeChart === '6' ? 'bg-gray-100 dark:bg-neutral-800' : ''
            }`}
          >
            6 Months
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

export default MonthlyMoodChart;
