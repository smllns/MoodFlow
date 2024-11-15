'use client';

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ArticleCardLittleProps {
  title: string;
  description: string;
  onArticleClicked: (article: string) => void;
}

const ArticleCardLittle: React.FC<ArticleCardLittleProps> = ({
  title,
  description,
  onArticleClicked,
}) => {
  const handleClick = () => {
    onArticleClicked(title);
  };
  return (
    <Card
      onClick={handleClick}
      className=' cursor-pointer mt-5 flex flex-col border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-lg bg-gray-100/50 hover:bg-gray-200/50 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50'
    >
      <CardHeader>
        <CardTitle className='text-xl pb-2'>{title}</CardTitle>
        <CardDescription className='text-sm'>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ArticleCardLittle;
