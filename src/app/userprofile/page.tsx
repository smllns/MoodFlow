'use client';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
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

export default function Page() {
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
      <div className='flex items-center justify-center h-screen bg-[#18181b]'>
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
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Data</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50' />
            <div className='aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50' />
            <div className='aspect-video rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50' />
          </div>
          <div className='min-h-[100vh] flex-1 rounded-xl bg-neutral-100/50 md:min-h-min dark:bg-neutral-800/50'>
            <h1 className='text-3xl font-bold dark:text-[#e6f0ff] text-[#18181b]'>
              Welcome, {userName ? userName : 'User'}!
            </h1>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
