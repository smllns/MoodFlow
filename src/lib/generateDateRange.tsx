'use client';
import React from 'react';
const generateDateRange = (days: number) => {
  const today = new Date();
  const dateRange = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dateRange.push(date.toLocaleDateString('en-CA'));
  }
  return dateRange.reverse();
};
export default generateDateRange;
