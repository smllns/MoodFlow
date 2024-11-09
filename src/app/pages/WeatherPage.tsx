'use client';
import React, { useMemo } from 'react';
import { fetchAllMoodData } from '../functions/authService';
import { weatherOptions } from '@/lib/constants';
import WeatherMoodChart from '@/components/WeatherMoodChart';
import WeatherMoodChartInteractive from '@/components/WeatherMoodChartInteractive';

export const description = 'Mood distribution based on weather conditions';

const weatherCategories = weatherOptions;

interface MoodDataItem {
  date: string;
  data: any;
}

export interface AggregatedDataWeather {
  weather: string;
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

const WeatherPage = () => {
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
  ): {
    aggregated: Record<string, AggregatedDataWeather>;
    mostFrequentWeather: string;
  } => {
    const aggregated: Record<string, AggregatedDataWeather> = {};
    const weatherCount: Record<string, number> = {};

    // Initialize weather categories and count
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

    // Aggregate the data
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

    // Determine the most frequent weather types
    const maxCount = Math.max(...Object.values(weatherCount));
    const mostFrequentWeatherTypes = Object.entries(weatherCount)
      .filter(([_, count]) => count === maxCount)
      .map(([weatherType]) => weatherType);

    // Format the most frequent weather types as a comma-separated string
    const mostFrequentWeather = mostFrequentWeatherTypes.join(', ');

    return { aggregated, mostFrequentWeather };
  };

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

  return (
    <div className='flex flex-col items-center gap-10'>
      <h1 className='text-2xl font-bold mt-8  text-center text-[#11111a] dark:text-[#ffffff]'>
        Mood Based on Weather Conditions
      </h1>
      <WeatherMoodChart
        chartData={chartData}
        info='All time information'
        loading={loading}
        weather={averageWeatherData}
      />
      <WeatherMoodChartInteractive
        chartData7={weekChartData}
        chartData30={monthChartData}
        info='Information for the last 30 days'
        loading={loading}
        weather7={averageWeatherDataWeek}
        weather30={averageWeatherDataMonth}
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

export default WeatherPage;
