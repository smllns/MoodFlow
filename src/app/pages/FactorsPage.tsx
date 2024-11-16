'use client';
import React, { useMemo } from 'react';
import { fetchAllMoodData } from '../functions/authService';
import FactorsMoodChart from '@/components/FactorsMoodChart';
import FactorsMoodChartInteractive from '@/components/FactorsMoodChartInteractive';
import generateDateRange from '@/lib/generateDateRange';
import {
  articlesData,
  monthNames,
  MoodDataItem,
  MoodType,
  PageProps,
} from '@/lib/constants';
import Footer from '@/components/ui/footer';
import PageTitle from '@/components/ui/page-title';
import ArticleCard from '@/components/ArticleCard';

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

const FactorsPage: React.FC<PageProps> = ({
  onArticleCategoryClicked,
  setCurrentPage,
}) => {
  const [chartData, setChartData] = React.useState<AggregatedDataFactors[]>([]);
  const [weekChartData, setWeekChartData] = React.useState<
    AggregatedDataFactors[]
  >([]);
  const [monthChartData, setMonthChartData] = React.useState<
    AggregatedDataFactors[]
  >([]);

  const [loading, setLoading] = React.useState(true);

  const weekDays = useMemo(() => generateDateRange(7), []);
  const monthDays = useMemo(() => generateDateRange(31), []);

  const aggregateData = (
    data: MoodDataItem[],
    filterDays: string[]
  ): AggregatedDataFactors[] => {
    const aggregatedData: AggregatedDataFactors[] = [];
    data.forEach((item) => {
      if (filterDays.includes(item.date) || filterDays.length === 0) {
        const dateObj = new Date(item.date);
        const month = monthNames[dateObj.getMonth()];
        const date = dateObj.getDate();
        const mood = item.data.mood as MoodType;
        const factors = item.data.factors as string[];
        if (mood && factors) {
          const numericMood = moodLabels[mood];
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

  const factorsData = articlesData.find(
    (article) => article.title === 'Mood and Factors 🌈'
  );

  return (
    <div className='flex flex-col items-center gap-10'>
      <PageTitle title='Mood Based on Factors' />
      <FactorsMoodChart chartData={chartData} loading={loading} />
      <FactorsMoodChartInteractive
        weekChartData={weekChartData}
        monthChartData={monthChartData}
        loading={loading}
      />
      {factorsData && (
        <>
          <div className='-mt-8'>
            <PageTitle title='Need more information? Explore!' />
          </div>
          <ArticleCard
            title={factorsData.title}
            description={factorsData.description}
            articles={factorsData.articles}
            onArticleCategoryClicked={onArticleCategoryClicked}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default FactorsPage;
