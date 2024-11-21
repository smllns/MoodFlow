//sign up component visible on the first page of the app
'use client';
import Link from 'next/link';
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
import { register } from '@/app/functions/authService';
import { useRouter } from 'next/navigation';

export function SignUpForm({ toggleForm }: { toggleForm: () => void }) {
  const router = useRouter();
  // State variables for user input (name, email, password, confirmPassword) and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('🦧 Invalid email format. Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setError(
        '👯🏻‍♀️ Passwords do not match. Please ensure both passwords are the same.'
      );
      return;
    }
    if (password.length < 6) {
      setError(
        '🐍 Password is too short! The minimum length for a password is 6 characters.'
      );
      return;
    }
    try {
      await register(name, email, password);
      router.push('/userprofile');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card className='mx-auto x0:mx-4  max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl pb-5'>Sign Up</CardTitle>
        <CardDescription>
          Enter your information below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='John'
                autoComplete='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <Label htmlFor='password'>Password</Label>
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
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Repeat password</Label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='password'
                autoComplete='current-password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
          </div>
        </form>
        {/* Link to toggle between login and sign up forms */}
        <div className='mt-4 text-center text-sm'>
          Already have an account?{' '}
          <Link
            href='#'
            className='underline dark:hover:text-gray-300 hover:text-gray-500'
            onClick={(e) => {
              e.preventDefault();
              toggleForm();
            }}
          >
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
