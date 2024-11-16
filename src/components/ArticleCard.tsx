'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';

interface ArticleCardProps {
  title: string;
  description: string;
  articles: string[];
  onArticleCategoryClicked: (articleCategoryName: string) => void;
  setCurrentPage: (currentPage: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  articles,
  onArticleCategoryClicked,
  setCurrentPage,
}) => {
  const handleClick = () => {
    onArticleCategoryClicked(title);
    setCurrentPage('articles');
  };
  return (
    <Card className='flex flex-col border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-lg bg-gray-100/50 hover:bg-gray-200/50 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50'>
      <CardHeader>
        <CardTitle className='xs:text-base sm:text-xl md:text-base lg:text-xl pb-2'>
          {title}
        </CardTitle>
        <CardDescription className='xs:text-xs sm:text-sm md:text-xs lg:text-sm'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className='xs:text-xs sm:text-sm md:text-xs lg:text-sm pl-8 pr-4 flex-1'>
        <ul className='list-disc'>
          {articles.map((article, index) => (
            <li key={index}>{article}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className='flex justify-between mt-auto'>
        <Button className='w-full' onClick={handleClick}>
          Read the articles
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
