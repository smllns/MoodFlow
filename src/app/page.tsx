//first page of the app with login/sign up functionality
'use client';
import { useEffect } from 'react';
import { auth } from '@/lib/firebaseConfig';
import Hero from '@/components/Hero';
import Registration from '@/components/Registration';
import { signOut } from 'firebase/auth';

export default function HomePage() {
  //users visiting this page cannot be logged in
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      signOut(auth).catch((error) => {
        console.error('Error signing out:', error);
      });
    }
  }, []);

  return (
    <div className='flex  x0:flex-col md:flex-row min-h-screen'>
      <div className='md:w-1/2'>
        <Hero />
      </div>
      <div id='registration' className='md:w-1/2'>
        <Registration />
      </div>
    </div>
  );
}
