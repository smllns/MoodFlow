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
import { auth, db } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
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

export default function Page() {
  const [userName, setUserName] = useState<string>('User');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('currmood'); // Начальная страница
  const [isArticles, setIsArticles] = useState(''); // Начальная страница
  const [article, setArticle] = useState(''); // Начальная страница
  const handlePageChange = (page: string) => {
    setIsArticles('');
    setArticle('');
    setCurrentPage(page); // Меняем текущую страницу
  };

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
        return <SleepPage />;
      case 'weather':
        return <WeatherPage />;
      case 'factors':
        return <FactorsPage />;
      case 'fullstats':
        return <FullStatsPage />;
      case 'articles':
        return (
          <ArticlesPage
            onArticleCategoryClicked={setIsArticles}
            onArticleClicked={setArticle}
            articleCategory={isArticles}
            article={article}
          />
        );
      default:
        return <MoodOfTheDayPage />;
    }
  };
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserName(userDoc.data()?.name);
          } else {
            setError('User not found in Firestore.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user data.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user is currently logged in. 👀');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-[#e6f0ff] dark:bg-[#18181b]'>
        <Image width='100' height='100' src='/loading.gif' alt='Loading...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col h-screen justify-center items-center bg-[#18181b]'>
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
