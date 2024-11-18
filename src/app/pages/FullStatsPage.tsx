'use client';
import React, { useMemo } from 'react';
import { fetchAllMoodData } from '../functions/authService';
import YearlyMoodPieChart from '@/components/YearlyMoodPieChart';
import generateDateRange from '@/lib/generateDateRange';
import MonthlyMoodChart from '@/components/MonthlyMoodChart';
import {
  articlesData,
  MoodDataItem,
  MoodType,
  PageProps,
} from '@/lib/constants';
import Footer from '@/components/ui/footer';
import PageTitle from '@/components/ui/page-title';
import { DataTable } from '@/components/DataTable';
import ArticleCard from '@/components/ArticleCard';

export interface AggregatedDataMood {
  mood: string;
  count: number;
}

const FullStatsPage: React.FC<PageProps> = ({
  onArticleCategoryClicked,
  setCurrentPage,
}) => {
  const [allData, setAllData] = React.useState<MoodDataItem[]>([]);
  const [chartData, setChartData] = React.useState<AggregatedDataMood[]>([]);
  const [weekChartData, setWeekChartData] = React.useState<
    AggregatedDataMood[]
  >([]);
  const [twoWeekChartData, setTwoWeekChartData] = React.useState<
    AggregatedDataMood[]
  >([]);
  const [monthChartData, setMonthChartData] = React.useState<
    AggregatedDataMood[]
  >([]);
  const [threeMonthChartData, setThreeMonthChartData] = React.useState<
    AggregatedDataMood[]
  >([]);
  const [halfYearChartData, setHalfYearChartData] = React.useState<
    AggregatedDataMood[]
  >([]);
  const [mostFrequentMood, setMostFrequentMood] = React.useState<
    string | undefined
  >();
  const [mostFrequentMoodWeek, setMostFrequentMoodWeek] = React.useState<
    string | undefined
  >();

  const [mostFrequentMoodTwoWeek, setMostFrequentMoodTwoWeek] = React.useState<
    string | undefined
  >();

  const [mostFrequentMoodMonth, setMostFrequentMoodMonth] = React.useState<
    string | undefined
  >();
  const [mostFrequentMoodThreeMonth, setMostFrequentMoodThreeMonth] =
    React.useState<string | undefined>();
  const [mostFrequentMoodHalfYear, setMostFrequentMoodHalfYear] =
    React.useState<string | undefined>();

  const [loading, setLoading] = React.useState(true);

  const weekDays = useMemo(() => generateDateRange(7), []);
  const twoWeekDays = useMemo(() => generateDateRange(14), []);
  const monthDays = useMemo(() => generateDateRange(31), []);
  const threeMonthDays = useMemo(() => generateDateRange(92), []);
  const halfYearDays = useMemo(() => generateDateRange(183), []);

  const aggregateData = (
    data: MoodDataItem[],
    filterDays: string[]
  ): {
    aggregated: Record<MoodType, AggregatedDataMood>;
    mostFrequentMood: string;
  } => {
    const aggregated: Record<MoodType, AggregatedDataMood> = {
      'Very bad': { mood: 'Very bad', count: 0 },
      'Slightly bad': { mood: 'Slightly bad', count: 0 },
      Okay: { mood: 'Okay', count: 0 },
      'Slightly good': { mood: 'Slightly good', count: 0 },
      'Very good': { mood: 'Very good', count: 0 },
    };
    const moodCount: Record<MoodType, number> = {
      'Very bad': 0,
      'Slightly bad': 0,
      Okay: 0,
      'Slightly good': 0,
      'Very good': 0,
    };

    data.forEach((item) => {
      if (filterDays.includes(item.date) || filterDays.length === 0) {
        const mood = item.data.mood as MoodType;
        if (mood) {
          aggregated[mood].count += 1;
          moodCount[mood] += 1;
        }
      }
    });

    const maxCount = Math.max(...Object.values(moodCount));
    const mostFrequentMoods = Object.entries(moodCount)
      .filter(([_, count]) => count === maxCount)
      .map(([moodType]) => moodType);
    const mostFrequentMood = mostFrequentMoods.join(', ');
    return { aggregated, mostFrequentMood };
  };

  React.useEffect(() => {
    const getMoodData = async () => {
      setLoading(true);

      const data = await fetchAllMoodData();

      const allData = aggregateData(data, []);
      const weekData = aggregateData(data, weekDays);
      const twoWeekData = aggregateData(data, twoWeekDays);
      const monthData = aggregateData(data, monthDays);
      const threeMonthData = aggregateData(data, threeMonthDays);
      const halfYearData = aggregateData(data, halfYearDays);

      setAllData(data);

      setChartData(Object.values(allData.aggregated));
      setMostFrequentMood(allData.mostFrequentMood);

      setWeekChartData(Object.values(weekData.aggregated));
      setMostFrequentMoodWeek(weekData.mostFrequentMood);

      setTwoWeekChartData(Object.values(twoWeekData.aggregated));
      setMostFrequentMoodTwoWeek(twoWeekData.mostFrequentMood);

      setMonthChartData(Object.values(monthData.aggregated));
      setMostFrequentMoodMonth(monthData.mostFrequentMood);

      setThreeMonthChartData(Object.values(threeMonthData.aggregated));
      setMostFrequentMoodThreeMonth(threeMonthData.mostFrequentMood);

      setHalfYearChartData(Object.values(halfYearData.aggregated));
      setMostFrequentMoodHalfYear(halfYearData.mostFrequentMood);

      setLoading(false);
    };

    getMoodData();
  }, []);
  const moodInfoData = articlesData.find(
    (article) => article.title === 'Mood and Daily Patterns 🧶'
  );
  return (
    <div className='flex flex-col items-center gap-10'>
      <PageTitle title='Mood Statistics' />
      <div className='flex gap-6 x0:flex-col lg:flex-row'>
        <YearlyMoodPieChart
          chartData1={chartData}
          chartData3={halfYearChartData}
          chartData2={threeMonthChartData}
          info1='All time information'
          info2='Last 3 months information'
          info3='Last 6 months information'
          smallInfo1='All time'
          smallInfo2='3 months'
          smallInfo3='6 months'
          loading={loading}
          mood1={mostFrequentMood}
          mood3={mostFrequentMoodHalfYear}
          mood2={mostFrequentMoodThreeMonth}
        />
        <YearlyMoodPieChart
          chartData1={weekChartData}
          chartData2={twoWeekChartData}
          chartData3={monthChartData}
          info1='Last 7 days'
          info2='Last 14 days'
          info3='Last 30 days'
          smallInfo1='7 days'
          smallInfo2='14 days'
          smallInfo3='30 days'
          loading={loading}
          mood1={mostFrequentMoodWeek}
          mood3={mostFrequentMoodMonth}
          mood2={mostFrequentMoodTwoWeek}
        />
      </div>
      <MonthlyMoodChart chartData={allData} loading={loading} />
      {moodInfoData && (
        <>
          <div className='-mt-8'>
            <PageTitle title='Need more information? Explore!' />
          </div>
          <ArticleCard
            title={moodInfoData.title}
            description={moodInfoData.description}
            articles={moodInfoData.articles}
            onArticleCategoryClicked={onArticleCategoryClicked}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      
      <div className='-mt-8 -mb-4'>
        <PageTitle title='Your Full Mood Data' />
      </div>

      <DataTable data={allData} />
      <Footer />
    </div>
  );
};

export default FullStatsPage;
