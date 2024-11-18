//helper reusable page title component
'use client';
import React from 'react';
interface PageTitleProps {
  title: string;
}
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <h1 className='text-2xl font-bold mt-8 text-center text-[#11111a] dark:text-[#ffffff]'>
      {title}
    </h1>
  );
};

export default PageTitle;
