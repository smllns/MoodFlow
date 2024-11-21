//login component visible on the first page of the app
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { login } from '@/app/functions/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginForm({
  toggleForm,
  resetPass,
}: {
  toggleForm: () => void;
  resetPass: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('🔍 Please enter both email and password.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for email validation
    if (!emailRegex.test(email)) {
      setError('🦧 Invalid email format. Please enter a valid email address.');
      return;
    }
    try {
      await login(email, password); // Call login function with email and password
      router.push('/userprofile'); // Redirect to user profile page after successful login
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card className='mx-auto  x0:mx-4 max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl pb-5'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='john@example.com'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='#'
                  className='underline dark:hover:text-gray-300 hover:text-gray-500 x0:text-xs sm:text-sm '
                  onClick={(e) => {
                    e.preventDefault();
                    resetPass();
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='password'
                autoComplete='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link
            href='#'
            className='underline dark:hover:text-gray-300 hover:text-gray-500'
            onClick={(e) => {
              e.preventDefault();
              toggleForm();
            }}
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
