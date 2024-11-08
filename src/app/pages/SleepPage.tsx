'use client';
import React, { useMemo } from 'react';
import { fetchAllMoodData } from '../functions/authService';
import SleepMoodChart from '@/components/SleepMoodChart';
import SleepMoodChartInteractive from '@/components/SleepMoodChartInteractive';

export const description = 'Mood distribution based on sleep hours';

const sleepCategories = ['<6 h', '7 h', '8 h', '9 h', '>10 h'];

interface MoodDataItem {
  date: string;
  data: any;
}
interface AggregatedResult {
  aggregated: Record<string, AggregatedData>;
  formattedAverageSleep: string;
}
export interface AggregatedData {
  sleep: string;
  'Very bad': number;
  'Slightly bad': number;
  Okay: number;
  'Slightly good': number;
  'Very good': number;
}

type MoodType =
  | 'Very bad'
  | 'Slightly bad'
  | 'Okay'
  | 'Slightly good'
  | 'Very good';

const SleepPage = () => {
  const [chartData, setChartData] = React.useState<AggregatedData[]>([]);
  const [weekChartData, setWeekChartData] = React.useState<AggregatedData[]>(
    []
  );
  const [monthChartData, setMonthChartData] = React.useState<AggregatedData[]>(
    []
  );
  const [averageSleepData, setAverageSleepData] = React.useState<
    string | undefined
  >();
  const [averageSleepDataWeek, setAverageSleepDataWeek] = React.useState<
    string | undefined
  >();
  const [averageSleepDataMonth, setAverageSleepDataMonth] = React.useState<
    string | undefined
  >();

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
  ): AggregatedResult => {
    const aggregated: Record<string, AggregatedData> = {};
    let totalSleepHours = 0;
    let count = 0;
    sleepCategories.forEach((category) => {
      aggregated[category] = {
        sleep: category,
        'Very bad': 0,
        'Slightly bad': 0,
        Okay: 0,
        'Slightly good': 0,
        'Very good': 0,
      };
    });
    data.forEach((item) => {
      if (filterDays.includes(item.date) || filterDays.length === 0) {
        const sleepHours = item.data.sleep;
        const mood = item.data.mood as MoodType;
        if (sleepHours != null && mood) {
          let category;
          if (sleepHours < 7) {
            category = '<6 h';
          } else if (sleepHours > 9) {
            category = '>10 h';
          } else {
            category = `${sleepHours} h`;
          }
          aggregated[category][mood] += 1;
          totalSleepHours += Number(sleepHours);
          count += 1;
        }
      }
    });

    const averageSleep = count > 0 ? totalSleepHours / count : 0;

    const formattedAverageSleep =
      averageSleep > 0
        ? `${Math.floor(averageSleep)} h ${Math.round(
            (averageSleep - Math.floor(averageSleep)) * 60
          )} min`
        : 'not stated';

    return { aggregated, formattedAverageSleep };
  };

  React.useEffect(() => {
    const getMoodData = async () => {
      setLoading(true);

      const data = await fetchAllMoodData();

      const allData = aggregateData(data, []);
      const weekData = aggregateData(data, weekDays);
      const monthData = aggregateData(data, monthDays);

      setChartData(Object.values(allData.aggregated));
      setAverageSleepData(allData.formattedAverageSleep);

      setWeekChartData(Object.values(weekData.aggregated));
      setAverageSleepDataWeek(weekData.formattedAverageSleep);

      setMonthChartData(Object.values(monthData.aggregated));
      setAverageSleepDataMonth(monthData.formattedAverageSleep);

      setLoading(false);
    };

    getMoodData();
  }, []);

  return (
    <div className='flex flex-col items-center gap-10'>
      <h1 className='text-2xl font-bold mt-8  text-center text-[#11111a] dark:text-[#ffffff]'>
        Mood Based on Sleep Duration
      </h1>
      <SleepMoodChart
        chartData={chartData}
        info='All time information'
        loading={loading}
        sleep={averageSleepData}
      />
      <SleepMoodChartInteractive
        chartData7={weekChartData}
        chartData30={monthChartData}
        info='Information for the last 30 days'
        loading={loading}
        sleep7={averageSleepDataWeek}
        sleep30={averageSleepDataMonth}
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

export default SleepPage;
