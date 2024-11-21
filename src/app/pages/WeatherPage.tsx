//Mood vs Weather page opened from sidebar
'use client';
import React, { useMemo } from 'react';
import { fetchAllMoodData } from '../functions/authService';
import {
  articlesData,
  MoodDataItem,
  MoodType,
  PageProps,
  weatherOptions,
} from '@/lib/constants';
import WeatherMoodChart from '@/components/WeatherMoodChart';
import WeatherMoodChartInteractive from '@/components/WeatherMoodChartInteractive';
import generateDateRange from '@/lib/generateDateRange';
import Footer from '@/components/ui/footer';
import PageTitle from '@/components/ui/page-title';
import ArticleCard from '@/components/ArticleCard';
const weatherCategories = weatherOptions;

export interface AggregatedDataWeather {
  weather: string;
  'Very bad': number;
  'Slightly bad': number;
  Okay: number;
  'Slightly good': number;
  'Very good': number;
}

const WeatherPage: React.FC<PageProps> = ({
  onArticleCategoryClicked,
  setCurrentPage,
}) => {
  // State variables for storing chart data and loading state
  const [chartData, setChartData] = React.useState<AggregatedDataWeather[]>([]);
  const [weekChartData, setWeekChartData] = React.useState<
    AggregatedDataWeather[]
  >([]);
  const [monthChartData, setMonthChartData] = React.useState<
    AggregatedDataWeather[]
  >([]);
  const [averageWeatherData, setAverageWeatherData] = React.useState<
    string | undefined
  >();
  const [averageWeatherDataWeek, setAverageWeatherDataWeek] = React.useState<
    string | undefined
  >();
  const [averageWeatherDataMonth, setAverageWeatherDataMonth] = React.useState<
    string | undefined
  >();
  const [loading, setLoading] = React.useState(true);

  // Memoized values for different date ranges
  const weekDays = useMemo(() => generateDateRange(7), []);
  const monthDays = useMemo(() => generateDateRange(31), []);

  // Function to aggregate mood data based on provided date range
  const aggregateData = (
    data: MoodDataItem[],
    filterDays: string[]
  ): {
    aggregated: Record<string, AggregatedDataWeather>;
    mostFrequentWeather: string;
  } => {
    const aggregated: Record<string, AggregatedDataWeather> = {};
    const weatherCount: Record<string, number> = {};
    weatherCategories.forEach((category) => {
      aggregated[category] = {
        weather: category,
        'Very bad': 0,
        'Slightly bad': 0,
        Okay: 0,
        'Slightly good': 0,
        'Very good': 0,
      };
      weatherCount[category] = 0;
    });

    data.forEach((item) => {
      if (filterDays.includes(item.date) || filterDays.length === 0) {
        const weather = item.data.weather;
        const mood = item.data.mood as MoodType;
        if (weather != null && mood) {
          let category;
          if (weatherCategories.includes(weather)) {
            category = weather;
          } else {
            category = '';
          }
          if (category) {
            aggregated[category][mood] += 1;
            weatherCount[category] += 1;
          }
        }
      }
    });
    const maxCount = Math.max(...Object.values(weatherCount));
    const mostFrequentWeatherTypes = Object.entries(weatherCount)
      .filter(([_, count]) => count === maxCount)
      .map(([weatherType]) => weatherType);
    const mostFrequentWeather = mostFrequentWeatherTypes.join(', ');
    return { aggregated, mostFrequentWeather };
  };

  // Fetching data on component mount and setting chart data
  React.useEffect(() => {
    const getMoodData = async () => {
      setLoading(true);

      const data = await fetchAllMoodData();
      const allData = aggregateData(data, []);
      const weekData = aggregateData(data, weekDays);
      const monthData = aggregateData(data, monthDays);

      setChartData(Object.values(allData.aggregated));
      setAverageWeatherData(allData.mostFrequentWeather);

      setWeekChartData(Object.values(weekData.aggregated));
      setAverageWeatherDataWeek(weekData.mostFrequentWeather);

      setMonthChartData(Object.values(monthData.aggregated));
      setAverageWeatherDataMonth(monthData.mostFrequentWeather);

      setLoading(false);
    };

    getMoodData();
  }, []);

  // show articles on weather category
  const weatherData = articlesData.find(
    (article) => article.title === 'Mood and Weather 🌪'
  );

  return (
    <div className='flex flex-col items-center gap-10'>
      <PageTitle title='Mood Based on Weather Conditions' />
      <WeatherMoodChart
        chartData={chartData}
        info='All time information'
        loading={loading}
        weather={averageWeatherData}
      />
      <WeatherMoodChartInteractive
        chartData7={weekChartData}
        chartData30={monthChartData}
        loading={loading}
        weather7={averageWeatherDataWeek}
        weather30={averageWeatherDataMonth}
      />
      {weatherData && (
        <>
          <div className='-mt-8'>
            <PageTitle title='Need more information? Explore!' />
          </div>
          <ArticleCard
            title={weatherData.title}
            description={weatherData.description}
            articles={weatherData.articles}
            onArticleCategoryClicked={onArticleCategoryClicked}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default WeatherPage;
