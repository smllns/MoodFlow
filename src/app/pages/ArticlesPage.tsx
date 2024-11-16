'use client';
import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/ui/footer';
import PageTitle from '@/components/ui/page-title';
import { articleData, articlesData, categories } from '@/lib/constants';
import ArticleCategory from './articles/ArticleCategory';
import Article from '@/components/Article';

interface ArticlesPageProps {
  onArticleCategoryClicked: (articleCategoryName: string) => void;
  onArticleClicked: (article: string) => void;
  articleCategory: string;
  article: string;
  setCurrentPage: (currentPage: string) => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({
  onArticleCategoryClicked,
  onArticleClicked,
  articleCategory,
  article,
  setCurrentPage,
}) => {
  const renderArticle = () => {
    const data = articleData[article];
    if (data) {
      return (
        <Article
          title={data.title}
          description={data.description}
          content={data.content}
        />
      );
    }
    return null;
  };
  const renderCategory = () => {
    const articles = categories[articleCategory];

    if (articles) {
      return (
        <ArticleCategory
          title={articleCategory}
          articles={articles}
          onArticleClicked={onArticleClicked}
        />
      );
    }

    return null;
  };

  return (
    <div>
      {articleCategory === '' && (
        <>
          <PageTitle title='Discover useful information about your mood' />
          <div className='x0:flex x0:flex-col xs:grid xs:grid-cols-2 gap-4 pt-10'>
            {articlesData.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                description={article.description}
                articles={article.articles}
                onArticleCategoryClicked={onArticleCategoryClicked}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </>
      )}
      {article === '' && renderCategory()}
      {article != '' && renderArticle()}
      <Footer />
    </div>
  );
};

export default ArticlesPage;
