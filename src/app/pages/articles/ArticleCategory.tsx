'use client';
import React from 'react';
import ArticleCardLittle from '@/components/ArticleCardLittle';

import PageTitle from '@/components/ui/page-title';

interface Article {
  title: string;
  description: string;
}

interface ArticleCategoryProps {
  title: string;
  articles: Article[];
  onArticleClicked: (article: string) => void;
}

const ArticleCategory: React.FC<ArticleCategoryProps> = ({
  title,
  articles,
  onArticleClicked,
}) => {
  return (
    <div >
      <PageTitle title={title} />
      {articles.map((article, index) => (
        <ArticleCardLittle
          key={index}
          title={article.title}
          description={article.description}
          onArticleClicked={onArticleClicked}
        />
      ))}
    </div>
  );
};

export default ArticleCategory;
