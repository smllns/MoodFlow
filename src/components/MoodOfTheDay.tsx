//reusable mood of the day setter/mood of the day information display
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

  // Initializing react-hook-form with validation using Zod schema
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { factors: [] },
  });

  // Function to move to the next step
  const handleNext = () => setStep(step + 1);
  // Function to move to the previous step
  const handlePrevious = () => setStep(Math.max(step - 1, 1));
  // Function to toggle the full information view
  const handleFullInfo = () => setFullInfo(!fullInfo);

  // Function to handle saving mood data
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
      // Reset form and state on successful save
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

  // Function to get the mood description based on the slider value
  const getMood = () => {
    if (sliderValue <= 20) return 'Very bad';
    if (sliderValue <= 40) return 'Slightly bad';
    if (sliderValue <= 60) return 'Okay';
    if (sliderValue <= 80) return 'Slightly good';
    return 'Very good';
  };

  // Get selected mood and corresponding icon
  const selectedMood = getMood();
  const moodIcon = moodIcons[selectedMood];

  // Array of steps for the mood tracking process.
  const steps = [
    { component: TodayMoodStep, condition: !fullInfo },
    { component: MoodSliderStep },
    { component: FactorsStep },
    { component: SleepStep },
    { component: WeatherStep },
  ];

  // Helper function to get card classes based on the fullInfo state
  const getCardClasses = (fullInfo: boolean) =>
    `mx-auto p-5 ${
      fullInfo
        ? 'h-fit xxs:w-[275px] xs:w-[380px]'
        : 'h-[420px] xxs:w-[275px] xs:w-[335px]'
    } flex items-center justify-center bg-gray-100/50 dark:bg-neutral-800/50`;

  // Assigns a title based on whether the calendar view is active and if full mood information is shown
  const title =
    !isCalendar && !fullInfo
      ? 'Set The Mood of The Day'
      : 'A Deep Dive into Your Mood';

  return (
    <div className='flex flex-col items-center justify-center x0:h-[95vh] lg:h-fit'>
      {/* Render title based on whether the full information view is active */}
      {!isCalendar && (
        <h1 className='text-2xl font-bold x0:pb-2 lg:pt-8 lg:pb-8 text-center text-[#11111a] dark:text-[#ffffff]'>
          {title}
        </h1>
      )}
      <Card className={getCardClasses(fullInfo)}>
        {fullInfo ? (
          <FullMoodInfoStep
            sliderValue={sliderValue}
            onGetFullInfo={handleFullInfo}
            selectedDate={selectedDate}
          />
        ) : (
          steps.map(({ component: StepComponent }, index) => {
            if (step !== index + 1) return null;
            return (
              <StepComponent
                key={index}
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
                selectedMood={selectedMood}
                moodIcon={moodIcon}
                selectedDate={selectedDate}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onGetFullInfo={handleFullInfo}
                step={step || 1}
                setStep={setStep}
                selectedFactors={selectedFactors}
                setSelectedFactors={setSelectedFactors}
                form={form}
                hoursOfSleep={hoursOfSleep}
                setHoursOfSleep={setHoursOfSleep}
                weather={weather}
                setWeather={setWeather}
                onSave={handleSave}
              />
            );
          })
        )}
      </Card>
    </div>
  );
};

export default MoodOfTheDay;
