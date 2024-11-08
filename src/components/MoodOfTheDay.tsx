'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from './ui/card';
import MoodSliderStep from './MoodSliderStep';
import FactorsStep from './FactorsStep';
import SleepStep from './SleepStep';
import WeatherStep from './WeatherStep';
import { FormSchema, FormValues } from '@/lib/formSchema';
import TodayMoodStep from './TodayMoodStep';
import { moodIcons } from '@/lib/constants';
import { saveMoodData } from '@/app/functions/authService';
import FullMoodInfoStep from './FullMoodInfoStep';
interface MoodOfTheDayProps {
  onDateChange: () => void;
  selectedDate: string;
  fullInfo: boolean;
  setFullInfo: (fullInfo: boolean) => void;
  step: number;
  setStep: (step: number) => void;
  isCalendar: boolean;
}
const MoodOfTheDay: React.FC<MoodOfTheDayProps> = ({
  onDateChange,
  selectedDate,
  fullInfo,
  setFullInfo,
  step,
  setStep,
  isCalendar = false,
}) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [hoursOfSleep, setHoursOfSleep] = useState<string | null>(null);
  const [weather, setWeather] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { factors: [] },
  });

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(Math.max(step - 1, 1));
  const handleFullInfo = () => setFullInfo(!fullInfo);

  const handleSave = async () => {
    const currentDate = selectedDate;
    try {
      await saveMoodData(
        getMood,
        selectedFactors,
        hoursOfSleep,
        weather,
        currentDate
      );
      onDateChange();
      setStep(1);
      setSliderValue(50);
      setSelectedFactors([]);
      form.reset();
      setHoursOfSleep(null);
      setWeather('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const getMood = () => {
    if (sliderValue <= 20) return 'Very bad';
    if (sliderValue <= 40) return 'Slightly bad';
    if (sliderValue <= 60) return 'Okay';
    if (sliderValue <= 80) return 'Slightly good';
    return 'Very good';
  };

  const selectedMood = getMood();
  const moodIcon = moodIcons[selectedMood];

  return (
    <div className='flex flex-col items-center justify-center x0:h-[95vh] lg:h-fit'>
      {!isCalendar &&
        (!fullInfo ? (
          <h1 className='text-2xl font-bold x0:pb-2 lg:pt-8 lg:pb-8 text-center text-[#11111a] dark:text-[#ffffff]'>
            Set The Mood of The Day
          </h1>
        ) : (
          <h1 className='text-2xl font-bold x0:pb-2  lg:pt-8 lg:pb-8 text-center text-[#11111a] dark:text-[#ffffff]'>
            A Deep Dive into Your Mood
          </h1>
        ))}
      <Card
        className={`mx-auto p-5 ${
          fullInfo
            ? 'h-fit xxs:w-[275px] xs:w-[380px]'
            : 'h-[420px] xxs:w-[275px] xs:w-[335px]'
        }  flex items-center justify-center bg-gray-100/50 dark:bg-neutral-800/50`}
      >
        {fullInfo && (
          <FullMoodInfoStep
            sliderValue={sliderValue}
            onGetFullInfo={handleFullInfo}
            selectedDate={selectedDate}
          />
        )}
        {step === 1 && !fullInfo && (
          <TodayMoodStep
            sliderValue={sliderValue}
            onNext={handleNext}
            onGetFullInfo={handleFullInfo}
            selectedDate={selectedDate}
          />
        )}
        {step === 2 && (
          <MoodSliderStep
            selectedDate={selectedDate}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            selectedMood={selectedMood}
            moodIcon={moodIcon}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {step === 3 && (
          <FactorsStep
            sliderValue={sliderValue}
            step={step}
            setStep={setStep}
            selectedFactors={selectedFactors}
            setSelectedFactors={setSelectedFactors}
            form={form}
            selectedMood={selectedMood}
            moodIcon={moodIcon}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {step === 4 && (
          <SleepStep
            sliderValue={sliderValue}
            selectedMood={selectedMood}
            moodIcon={moodIcon}
            hoursOfSleep={hoursOfSleep}
            setHoursOfSleep={setHoursOfSleep}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {step === 5 && (
          <WeatherStep
            sliderValue={sliderValue}
            selectedMood={selectedMood}
            moodIcon={moodIcon}
            weather={weather}
            setWeather={setWeather}
            onSave={handleSave}
            onPrevious={handlePrevious}
          />
        )}
      </Card>
    </div>
  );
};

export default MoodOfTheDay;
