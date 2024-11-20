//main page visible when user is logged in (responsible for rendering different page components from sidebar clicks)
'use client';
import { AppSidebar } from '@/components/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MoodOfTheDayPage from '../pages/MoodOfTheDayPage';
import CalendarPage from '../pages/CalendarPage';
import SettingsPage from '../pages/SettingsPage';
import SleepPage from '../pages/SleepPage';
import WeatherPage from '../pages/WeatherPage';
import FactorsPage from '../pages/FactorsPage';
import FullStatsPage from '../pages/FullStatsPage';
import ArticlesPage from '../pages/ArticlesPage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { checkAuthState } from '../functions/authService';

export default function Page() {
  const [userName, setUserName] = useState<string>('User');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('currmood');
  const [isArticles, setIsArticles] = useState('');
  const [article, setArticle] = useState('');

  // Function to handle page changes by resetting related states
  const handlePageChange = (page: string) => {
    setIsArticles('');
    setArticle('');
    setCurrentPage(page);
  };

  // Function to render the appropriate content based on the current page
  const renderContent = () => {
    switch (currentPage) {
      case 'currmood':
        return <MoodOfTheDayPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'settings':
        return (
          <SettingsPage
            onRedirectToCurrentMood={() => {
              setCurrentPage('currmood');
            }}
            onNameChange={setUserName}
          />
        );
      case 'sleep':
        return (
          <SleepPage
            onArticleCategoryClicked={setIsArticles}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'weather':
        return (
          <WeatherPage
            onArticleCategoryClicked={setIsArticles}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'factors':
        return (
          <FactorsPage
            onArticleCategoryClicked={setIsArticles}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'fullstats':
        return (
          <FullStatsPage
            onArticleCategoryClicked={setIsArticles}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'articles':
        return (
          <ArticlesPage
            onArticleCategoryClicked={setIsArticles}
            onArticleClicked={setArticle}
            articleCategory={isArticles}
            article={article}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return <MoodOfTheDayPage />;
    }
  };

  // Function to get the title for the current page
  const getTitleFromPage = (page: string) => {
    const titles: { [key: string]: string } = {
      currmood: 'Mood of the day',
      calendar: 'Calendar',
      settings: 'Settings',
      sleep: 'Mood and Sleep',
      weather: 'Mood and Weather',
      factors: 'Mood and Factors',
      fullstats: 'Mood statistics',
      articles: 'Articles',
    };
    return titles[page] || 'Mood of the day';
  };

  // Use the checkAuthState function to handle authentication + display user's name
  useEffect(() => {
    const unsubscribe = checkAuthState(setUserName, setError, setLoading);

    return () => unsubscribe();
  }, []);

  // Show loading indicator while data is being loaded
  if (loading) {
    return (
      <LoadingSpinner containerClassName='h-screen flex justify-center items-center' />
    );
  }

  // Show error if any error occurred during authentication or data fetching
  if (error) {
    return (
      <div className='flex flex-col h-screen justify-center items-center '>
        <div className='text-red-500'>{error}</div>
        <Button className='mt-4' onClick={() => router.push('/')}>
          Back to Homepage
        </Button>
      </div>
    );
  }
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar userName={userName} setCurrentPage={handlePageChange} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className='cursor-pointer'
                  onClick={() => handlePageChange(currentPage)}
                >
                  {getTitleFromPage(currentPage)}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {isArticles != '' && article === '' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink>
                      <BreadcrumbPage
                        className='cursor-pointer'
                        onClick={() => setArticle('')}
                      >
                        {isArticles}
                      </BreadcrumbPage>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              {isArticles != '' && article != '' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis
                      className='cursor-pointer'
                      onClick={() => setArticle('')}
                    />
                  </BreadcrumbItem>
                </>
              )}
              {article != '' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink>
                      <BreadcrumbPage>{article}</BreadcrumbPage>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
