// Importing 'clsx' for conditional className handling and 'twMerge' for merging Tailwind CSS class names
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 'cn' is a utility function that takes any number of class names as input and merges them properly
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
