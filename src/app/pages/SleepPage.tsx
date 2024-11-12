'use client';
import React, { useMemo } from 'react';
import { fetchAllMoodData } from '../functions/authService';
import SleepMoodChart from '@/components/SleepMoodChart';
import SleepMoodChartInteractive from '@/components/SleepMoodChartInteractive';
import generateDateRange from '@/lib/generateDateRange';
import { MoodDataItem, MoodType } from '@/lib/constants';
import Footer from '@/components/ui/footer';
import PageTitle from '@/components/ui/page-title';
const sleepCategories = ['<6 h', '7 h', '8 h', '9 h', '>10 h'];

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

  const weekDays = useMemo(() => generateDateRange(7), []);
  const monthDays = useMemo(() => generateDateRange(31), []);

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
      <PageTitle title='Mood Based on Sleep Duration' />
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
      <Footer />
    </div>
  );
};

export default SleepPage;
