// Custom hook to fetch mood data based on a selected date
'use client';
import { useState, useEffect } from 'react';
import { fetchMoodData } from '@/app/functions/authService';
import { moodIcons } from '@/lib/constants';

interface MoodData {
  mood: keyof typeof moodIcons;
  factors: string[];
  sleep: number | string | null;
  weather: string;
}

// Effect hook to fetch mood data when the selected date changes
const useFetchMoodData = (selectedDate: string) => {
  const [moodData, setMoodData] = useState<MoodData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetchMood = async () => {
      setLoading(true);
      const fetchedMoodData = await fetchMoodData(selectedDate);
      setLoading(false);
      setMoodData(fetchedMoodData);
    };

    handleFetchMood();
  }, [selectedDate]);

  return { moodData, loading };
};

export default useFetchMoodData;
