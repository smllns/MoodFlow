import type { Metadata } from 'next';
import './globals.css';
import Head from 'next/head';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

// The font family for the application (Roboto Mono)
const robotoMono = {
  fontFamily: "'Roboto Mono', monospace",
};

// Metadata for the page (title and description)
export const metadata: Metadata = {
  title: 'MoodFlow',
  description: 'App for tracking mood changes',
};

// Root layout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body style={{ fontFamily: robotoMono.fontFamily }}>
        {/* Wrapping the app in ThemeProvider for theme management */}
        <ThemeProvider>
          {/* Wrapping the app in AuthProvider for authentication context */}
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        {/*Toaster component for toast notifications throughout the app*/}
        <Toaster />
      </body>
    </html>
  );
}
