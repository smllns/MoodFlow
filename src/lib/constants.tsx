'use client';

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
