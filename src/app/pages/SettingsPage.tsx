// Settings page opened from sidebar
'use client';
import PageTitle from '@/components/ui/page-title';
import React, { useEffect, useState } from 'react';
import {
  deleteAccount,
  deleteAllMoodData,
  getUserDocument,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from '../functions/authService';
import { useRouter } from 'next/navigation';
import DangerZone from '@/components/DangerZone';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Footer from '@/components/ui/footer';

interface SettingsPageProps {
  onRedirectToCurrentMood: () => void;
  onNameChange: (newName: string) => void;
}
interface FormData {
  [key: string]: string;
  name: string;
  nameError: string;
  newEmail: string;
  newEmailError: string;
  changeEmail: string;
  changeEmailError: string;
  changeEmailPassword: string;
  changeEmailPasswordError: string;
  newPassword: string;
  newPasswordError: string;
  changePasswordEmail: string;
  changePasswordEmailError: string;
  changePasswordPassword: string;
  changePasswordPasswordError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  formError: string;
}
const SettingsPage: React.FC<SettingsPageProps> = ({
  onRedirectToCurrentMood,
  onNameChange,
}) => {
  const router = useRouter();

  // General form state object
  const [formData, setFormData] = useState<FormData>({
    name: '',
    nameError: '',
    newEmail: '',
    newEmailError: '',
    changeEmail: '',
    changeEmailError: '',
    changeEmailPassword: '',
    changeEmailPasswordError: '',
    newPassword: '',
    newPasswordError: '',
    changePasswordEmail: '',
    changePasswordEmailError: '',
    changePasswordPassword: '',
    changePasswordPasswordError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    formError: '',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to update form state
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Email and password validation
  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const handleValidation = (
    emailKey: string,
    passwordKey: string,
    prefix: string
  ) => {
    const email = formData[emailKey];
    const password = formData[passwordKey];
    let emailError = '';
    let passwordError = '';

    if (!validateEmail(email)) emailError = 'Please enter a valid email.';
    if (!validatePassword(password))
      passwordError = 'Password must be at least 6 characters.';

    setFormData((prev) => ({
      ...prev,
      [`${prefix}EmailError`]: emailError,
      [`${prefix}PasswordError`]: passwordError,
    }));
  };

  // Function to save new name
  const handleSaveName = async () => {
    if (!formData.name.trim()) {
      updateFormData('nameError', 'Name cannot be empty.');
      return;
    }
    try {
      updateFormData('nameError', '');
      await updateUserName(formData.name);
      toast('Name changed successfully!', {
        description: `Now your name is ${formData.name} 💗`,
      });
      onNameChange(formData.name);
    } catch (error) {
      console.error('Error updating name:', error);
      updateFormData('nameError', 'Failed to update name. Please try again.');
    }
  };

  // Function to save new email
  const handleSaveEmail = async () => {
    if (!validateEmail(formData.newEmail)) {
      updateFormData('newEmailError', 'Please enter a valid new email.');
      return;
    }
    handleValidation('changeEmail', 'changeEmailPassword', 'changeEmail');
    if (formData.changeEmailError || formData.changeEmailPasswordError) return;

    try {
      updateFormData('newEmailError', '');
      await updateUserEmail(
        formData.newEmail,
        formData.changeEmail,
        formData.changeEmailPassword
      );
      toast('Email updated successfully!', {
        description: `Please log in to your account with a new email 💗`,
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating email:', error);
      updateFormData(
        'newEmailError',
        'Failed to update email. Please check your password and try again.'
      );
    }
  };

  // Function to save new password
  const handleSavePassword = async () => {
    if (!validatePassword(formData.newPassword)) {
      updateFormData('newPasswordError', 'Please enter a valid new password.');
      return;
    }
    handleValidation(
      'changePasswordEmail',
      'changePasswordPassword',
      'changePassword'
    );
    if (
      formData.changePasswordEmailError ||
      formData.changePasswordPasswordError
    )
      return;

    try {
      updateFormData('newPasswordError', '');
      await updateUserPassword(
        formData.newPassword,
        formData.changePasswordEmail,
        formData.changePasswordPassword
      );
      toast('Password updated successfully!', {
        description: `Please log in to your account with a new password 💗`,
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating password:', error);
      updateFormData(
        'newPasswordError',
        'Failed to update password. Please check your information and try again.'
      );
    }
  };

  // Load user name on first render
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDoc = await getUserDocument();
        updateFormData('name', userDoc?.name || '');
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, []);

  // Function to delete all mood data
  const handleDeleteData = async () => {
    await deleteAllMoodData();
    toast('All your data was deleted successfully!', {
      description: `Enjoy MoodFlow with a fresh start💗`,
    });
    onRedirectToCurrentMood();
  };

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    try {
      setIsDialogOpen(false);
      await deleteAccount(formData.email, formData.password);
      toast('Your account was deleted successfully!', {
        description: 'You can always create a new account💗',
      });
      router.push('/');
    } catch (error) {
      setFormData((prev) => ({
        ...prev,
        formError: 'Failed to delete account. Please enter correct data.',
      }));
    }
  };

  // Function to handle form submission for account deletion
  const handleSubmit = () => {
    handleValidation('email', 'password', '');
    if (formData.emailError || formData.passwordError) {
      setIsDialogOpen(false);
      return;
    }
    setIsDialogOpen(true);
  };

  // Simplified input field rendering function
  const renderInputField = (
    label: string,
    type: string,
    valueKey: string,
    errorKey: string,
    placeholder: string
  ) => (
    <div className='flex flex-col gap-4'>
      <Label htmlFor={valueKey}>{label}</Label>
      <Input
        id={valueKey}
        type={type}
        placeholder={placeholder}
        className='max-w-[300px]'
        value={formData[valueKey]}
        onChange={(e) => updateFormData(valueKey, e.target.value)}
        required
      />
      {formData[errorKey] && (
        <p className='text-red-500 max-w-[300px]'>{formData[errorKey]}</p>
      )}
    </div>
  );

  return (
    <div>
      <PageTitle title='MoodFlow Settings' />

      <div className='bg-gray-100/50 dark:bg-neutral-800/50 xs:min-w-[400px] w-fit p-10 border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-xl mx-auto mt-10'>
        <p className='x0:text-2xl pb-5 font-semibold'>Change your name</p>
        <div className='flex flex-col gap-4'>
          {renderInputField('Name', 'text', 'name', 'nameError', formData.name)}
          <Button className='max-w-[300px]' onClick={handleSaveName}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className='bg-gray-100/50 dark:bg-neutral-800/50 w-fit xs:min-w-[400px] p-10 border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-xl mx-auto mt-10'>
        <p className='x0:text-2xl pb-5 font-semibold'>Change your email</p>
        <div className='flex flex-col gap-4'>
          {renderInputField(
            'New email',
            'email',
            'newEmail',
            'newEmailError',
            'newEmail@example.com'
          )}
          {renderInputField(
            'Current email',
            'email',
            'changeEmail',
            'changeEmailError',
            'oldEmail@example.com'
          )}
          {renderInputField(
            'Current password',
            'password',
            'changeEmailPassword',
            'changeEmailPasswordError',
            'password'
          )}
          <Button className='max-w-[300px]' onClick={handleSaveEmail}>
            Save new email
          </Button>
        </div>
      </div>

      <div className='bg-gray-100/50 dark:bg-neutral-800/50 w-fit xs:min-w-[400px] p-10 border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-xl mx-auto mt-10'>
        <p className='x0:text-2xl pb-5 font-semibold'>Change your password</p>
        <div className='flex flex-col gap-4'>
          {renderInputField(
            'New password',
            'password',
            'newPassword',
            'newPasswordError',
            'newPassword'
          )}
          {renderInputField(
            'Current email',
            'email',
            'changePasswordEmail',
            'changePasswordEmailError',
            'oldEmail@example.com'
          )}
          {renderInputField(
            'Current password',
            'password',
            'changePasswordPassword',
            'changePasswordPasswordError',
            'password'
          )}
          <Button className='max-w-[300px]' onClick={handleSavePassword}>
            Save new password
          </Button>
        </div>
      </div>
      <DangerZone
        handleDeleteData={handleDeleteData}
        email={formData.email}
        setEmail={(email: string) =>
          setFormData((prev) => ({ ...prev, email }))
        }
        emailError={formData.emailError}
        password={formData.password}
        setPassword={(password: string) =>
          setFormData((prev) => ({ ...prev, password }))
        }
        passwordError={formData.passwordError}
        formError={formData.formError}
        handleSubmit={handleSubmit}
        handleDeleteAccount={handleDeleteAccount}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <Footer />
    </div>
  );
};

export default SettingsPage;
