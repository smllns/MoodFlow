'use client';
import React, { useMemo } from 'react';
import { fetchAllMoodData } from '../functions/authService';
import FactorsMoodChart from '@/components/FactorsMoodChart';
import FactorsMoodChartInteractive from '@/components/FactorsMoodChartInteractive';
export const description = 'Mood distribution based on factors';

interface MoodDataItem {
  date: string;
  data: any;
}
export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export interface AggregatedDataFactors {
  month: string;
  date: number;
  mood: number;
  factors: Array<string>;
}
const moodLabels = {
  'Very bad': 1,
  'Slightly bad': 2,
  Okay: 3,
  'Slightly good': 4,
  'Very good': 5,
};
type MoodType =
  | 'Very bad'
  | 'Slightly bad'
  | 'Okay'
  | 'Slightly good'
  | 'Very good';

const FactorsPage = () => {
  const [chartData, setChartData] = React.useState<AggregatedDataFactors[]>([]);
  const [weekChartData, setWeekChartData] = React.useState<
    AggregatedDataFactors[]
  >([]);
  const [monthChartData, setMonthChartData] = React.useState<
    AggregatedDataFactors[]
  >([]);

  const [loading, setLoading] = React.useState(true);

  const weekDays = useMemo(() => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date.toLocaleDateString('en-CA'));
    }
    return days.reverse();
  }, []);

  const monthDays = useMemo(() => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 31; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date.toLocaleDateString('en-CA'));
    }
    return days.reverse();
  }, []);

  const aggregateData = (
    data: MoodDataItem[],
    filterDays: string[]
  ): AggregatedDataFactors[] => {
    // Создаём массив для хранения агрегированных данных
    const aggregatedData: AggregatedDataFactors[] = [];

    // Перебираем все элементы данных
    data.forEach((item) => {
      if (filterDays.includes(item.date) || filterDays.length === 0) {
        // Преобразуем строковую дату в объект Date
        const dateObj = new Date(item.date);

        // Получаем месяц и день
        const month = monthNames[dateObj.getMonth()]; // Преобразуем номер месяца в строку
        const date = dateObj.getDate(); // Получаем число дня

        const mood = item.data.mood as MoodType;
        const factors = item.data.factors as string[]; // Ожидаем, что факторы уже есть в данных

        if (mood && factors) {
          // Преобразуем строковое значение настроения в число
          const numericMood = moodLabels[mood];

          // Добавляем в массив агрегированных данных
          aggregatedData.push({
            month,
            date,
            mood: numericMood,
            factors,
          });
        }
      }
    });

    return aggregatedData;
  };

  React.useEffect(() => {
    const getMoodData = async () => {
      setLoading(true);

      const data = await fetchAllMoodData();

      const allData = aggregateData(data, []);
      const weekData = aggregateData(data, weekDays);
      const monthData = aggregateData(data, monthDays);
      setChartData(allData);
      setWeekChartData(weekData);
      setMonthChartData(monthData);
      setLoading(false);
    };

    getMoodData();
  }, []);

  return (
    <div className='flex flex-col items-center gap-10'>
      <h1 className='text-2xl font-bold mt-8  text-center text-[#11111a] dark:text-[#ffffff]'>
        Mood Based on Factors
      </h1>
      <FactorsMoodChart chartData={chartData} loading={loading} />
      <FactorsMoodChartInteractive
        weekChartData={weekChartData}
        monthChartData={monthChartData}
        loading={loading}
      />
      <p className='x0:relative  x0:text-center  min-w-max pt-4 text-xs text-black dark:text-white'>
        © 2024 All rights reserved by{' '}
        <a
          href='https://www.linkedin.com/in/smllns'
          className='text-pink-500 hover:text-pink-300 underline '
          target='_blank'
          rel='noopener noreferrer'
        >
          smllns
        </a>
      </p>
    </div>
  );
};

export default FactorsPage;
