'use client';
import React from 'react';
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month}`;
};
export default formatDate;
