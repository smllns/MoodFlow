//Mood Statistics page opened from sidebar
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
  // Consolidated state object for all chart data and mood stats
  const [moodStats, setMoodStats] = React.useState({
    allData: [] as MoodDataItem[],
    chartData: [] as AggregatedDataMood[],
    weekChartData: [] as AggregatedDataMood[],
    twoWeekChartData: [] as AggregatedDataMood[],
    monthChartData: [] as AggregatedDataMood[],
    threeMonthChartData: [] as AggregatedDataMood[],
    halfYearChartData: [] as AggregatedDataMood[],
    mostFrequentMood: undefined as string | undefined,
    mostFrequentMoodWeek: undefined as string | undefined,
    mostFrequentMoodTwoWeek: undefined as string | undefined,
    mostFrequentMoodMonth: undefined as string | undefined,
    mostFrequentMoodThreeMonth: undefined as string | undefined,
    mostFrequentMoodHalfYear: undefined as string | undefined,
    loading: true,
  });

  // Memoized values for different date ranges
  const weekDays = useMemo(() => generateDateRange(7), []);
  const twoWeekDays = useMemo(() => generateDateRange(14), []);
  const monthDays = useMemo(() => generateDateRange(31), []);
  const threeMonthDays = useMemo(() => generateDateRange(92), []);
  const halfYearDays = useMemo(() => generateDateRange(183), []);

  // Function to aggregate mood data based on provided date range
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

  // Fetching data on component mount and setting chart data
  React.useEffect(() => {
    const getMoodData = async () => {
      setMoodStats((prevState) => ({ ...prevState, loading: true }));

      const data = await fetchAllMoodData();
      const allData = aggregateData(data, []);
      const weekData = aggregateData(data, weekDays);
      const twoWeekData = aggregateData(data, twoWeekDays);
      const monthData = aggregateData(data, monthDays);
      const threeMonthData = aggregateData(data, threeMonthDays);
      const halfYearData = aggregateData(data, halfYearDays);

      setMoodStats({
        allData: data,
        chartData: Object.values(allData.aggregated),
        mostFrequentMood: allData.mostFrequentMood,

        weekChartData: Object.values(weekData.aggregated),
        mostFrequentMoodWeek: weekData.mostFrequentMood,

        twoWeekChartData: Object.values(twoWeekData.aggregated),
        mostFrequentMoodTwoWeek: twoWeekData.mostFrequentMood,

        monthChartData: Object.values(monthData.aggregated),
        mostFrequentMoodMonth: monthData.mostFrequentMood,

        threeMonthChartData: Object.values(threeMonthData.aggregated),
        mostFrequentMoodThreeMonth: threeMonthData.mostFrequentMood,

        halfYearChartData: Object.values(halfYearData.aggregated),
        mostFrequentMoodHalfYear: halfYearData.mostFrequentMood,

        loading: false,
      });
    };

    getMoodData();
  }, []);

  // Show articles on mood category
  const moodInfoData = articlesData.find(
    (article) => article.title === 'Mood and Daily Patterns 🧶'
  );
  return (
    <div className='flex flex-col items-center gap-10'>
      <PageTitle title='Mood Statistics' />
      <div className='flex gap-6 x0:flex-col lg:flex-row'>
        <YearlyMoodPieChart
          chartData1={moodStats.chartData}
          chartData3={moodStats.halfYearChartData}
          chartData2={moodStats.threeMonthChartData}
          info1='All time information'
          info2='Last 3 months information'
          info3='Last 6 months information'
          smallInfo1='All time'
          smallInfo2='3 months'
          smallInfo3='6 months'
          loading={moodStats.loading}
          mood1={moodStats.mostFrequentMood}
          mood3={moodStats.mostFrequentMoodHalfYear}
          mood2={moodStats.mostFrequentMoodThreeMonth}
        />
        <YearlyMoodPieChart
          chartData1={moodStats.weekChartData}
          chartData2={moodStats.twoWeekChartData}
          chartData3={moodStats.monthChartData}
          info1='Last 7 days'
          info2='Last 14 days'
          info3='Last 30 days'
          smallInfo1='7 days'
          smallInfo2='14 days'
          smallInfo3='30 days'
          loading={moodStats.loading}
          mood1={moodStats.mostFrequentMoodWeek}
          mood3={moodStats.mostFrequentMoodMonth}
          mood2={moodStats.mostFrequentMoodTwoWeek}
        />
      </div>
      <MonthlyMoodChart
        chartData={moodStats.allData}
        loading={moodStats.loading}
      />
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

      <DataTable data={moodStats.allData} />
      <Footer />
    </div>
  );
};

export default FullStatsPage;
