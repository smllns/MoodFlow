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
import { Loader2 } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('🔍 Please enter both email and password.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('🦧 Invalid email format. Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      router.push('/userprofile');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='mx-auto x0:mx-4 max-w-sm'>
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
                <button
                  type='button'
                  onClick={resetPass}
                  className='underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-sm text-muted-foreground hover:text-primary'
                >
                  Forgot your password?
                </button>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <Loader2 className='animate-spin h-4 w-4' />
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <button
            type='button'
            onClick={toggleForm}
            className='underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-sm text-muted-foreground hover:text-primary'
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
