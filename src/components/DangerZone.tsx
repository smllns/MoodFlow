//rendering account/data deletion ui in settings page
'use client';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DangerZoneProps {
  handleDeleteData: () => void;
  email: string;
  setEmail: (email: string) => void;
  emailError: string;
  password: string;
  setPassword: (password: string) => void;
  passwordError: string;
  formError: string;
  handleSubmit: () => void;
  handleDeleteAccount: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const DangerZone: React.FC<DangerZoneProps> = ({
  handleDeleteData,
  email,
  setEmail,
  emailError,
  password,
  setPassword,
  passwordError,
  formError,
  handleSubmit,
  handleDeleteAccount,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  return (
    <div>
      <p className='text-2xl pt-10 font-semibold'>Danger Zone</p>
      <p className='py-5 text-base'>
        Warning! These actions can not be undone! Please be certain.
      </p>
      <div className='flex flex-col w-full border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-2xl p-5 bg-gray-100/50 dark:bg-neutral-800/50'>
        <div className='flex flex-row items-center gap-8 text-lg w-full justify-between'>
          <p className='font-semibold x0:text-sm xs:text-base'>
            Delete all your mood data
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive' className='x0:text-sm sm:text-lg'>
                Delete Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteData}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className='flex flex-row justify-between items-center gap-8 text-lg pt-10 w-full'>
          <p className='font-semibold x0:text-sm xs:text-base'>
            Delete your account
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='destructive' className='x0:text-sm sm:text-lg'>
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Delete your profile</DialogTitle>
                <DialogDescription>
                  Please enter your email and password to confirm deleting your
                  account.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='flex flex-col gap-4'>
                  <Label htmlFor='email' className='text-left'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    className='col-span-3'
                    placeholder='john@example.com'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && <p className='text-red-500'>{emailError}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                  <Label htmlFor='password' className='text-left'>
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    className='col-span-3'
                    placeholder='password'
                    autoComplete='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {passwordError && (
                    <p className='text-red-500'>{passwordError}</p>
                  )}
                </div>
              </div>
              {formError && <p className='text-red-500'>{formError}</p>}
              <DialogFooter>
                <Button type='submit' onClick={handleSubmit}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={isDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action can not be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={(e) => setIsDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
