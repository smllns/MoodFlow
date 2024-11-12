'use client';

import { ChartConfig } from '@/components/ui/chart';

type Mood =
  | 'Very bad'
  | 'Slightly bad'
  | 'Okay'
  | 'Slightly good'
  | 'Very good'
  | '';

export const moodIcons: Record<Mood, string> = {
  'Very bad': 'verybad.svg',
  'Slightly bad': 'kindabad.svg',
  Okay: 'normal.svg',
  'Slightly good': 'kindagood.svg',
  'Very good': 'verygood.svg',
  '': 'notstated.svg',
};

export const moodLevels = [
  'Very bad',
  'Slightly bad',
  'Okay',
  'Slightly good',
  'Very good',
  'Not stated',
];

export const factors = [
  'Health',
  'Fitness',
  'Hobbies and Interests',
  'Self-Determination',
  'Spiritual Life',
  'Self-Care',
  'Community',
  'Partner',
  'Family',
  'Friends',
  'Dating',
  'Tasks',
  'Work',
  'Travel',
  'Current Events',
  'Weather',
  'Education',
  'Money',
];
export const weatherOptions = [
  'Sunny',
  'Cloudy',
  'Rainy',
  'Snowy',
  'Windy',
  'Foggy',
  'Stormy',
  'Clear',
];

export interface MoodDataItem {
  date: string;
  data: any;
}

export type MoodType =
  | 'Very bad'
  | 'Slightly bad'
  | 'Okay'
  | 'Slightly good'
  | 'Very good';

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const chartConfig = {
  verybad: {
    color: 'var(--chart-1)',
    label: 'Very bad',
  },
  slightlybad: { color: 'var(--chart-2)', label: 'Slightly bad' },
  okay: { color: 'var(--chart-3)', label: 'Okay' },
  slightlygood: { color: 'var(--chart-4)', label: 'Slightly good' },
  verygood: { color: 'var(--chart-5)', label: 'Very good' },
} satisfies ChartConfig;
