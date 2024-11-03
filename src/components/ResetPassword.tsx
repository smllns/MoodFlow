'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function ResetPassword({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      setError('🔍 Please enter your email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('✈️ Check your email for the password reset link!');
      setError(null);
    } catch (err: any) {
      console.error('Error sending reset email:', err);
      setError('🦨 Error sending reset email. Please try again.');
      setMessage(null);
    }
  };

  return (
    <Card className='mx-auto x0:mx-4  max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl pb-5'>Password reset</CardTitle>
        <CardDescription>
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='john@example.com'
            value={email}
            autoComplete='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className='text-red-500'>{error}</p>}
          {message && <p className='text-green-500'>{message}</p>}
          <Button onClick={handleReset} className='w-full'>
            Reset Password
          </Button>
          <Button onClick={onBack} className='w-full'>
            Back to Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
