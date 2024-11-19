// 'use client';
// import PageTitle from '@/components/ui/page-title';
// import React, { useEffect, useState } from 'react';
// import {
//   deleteAccount,
//   deleteAllMoodData,
//   getUserDocument,
//   updateUserEmail,
//   updateUserName,
//   updateUserPassword,
// } from '../functions/authService';
// import { useRouter } from 'next/navigation';
// import DangerZone from '@/components/DangerZone';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import Footer from '@/components/ui/footer';

// interface SettingsPageProps {
//   onRedirectToCurrentMood: () => void;
//   onNameChange: (newName: string) => void;
// }

// const SettingsPage: React.FC<SettingsPageProps> = ({
//   onRedirectToCurrentMood,
//   onNameChange,
// }) => {
//   const router = useRouter();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState('');

//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const [formError, setFormError] = useState('');

//   const [name, setName] = useState('');
//   const [nameError, setNameError] = useState('');

//   const [newPassword, setNewPassword] = useState('');
//   const [newPasswordErrorState, setNewPasswordErrorState] = useState('');

//   const [changePasswordEmail, setChangePasswordEmail] = useState('');
//   const [changePasswordEmailError, setChangePasswordEmailError] = useState('');

//   const [changePasswordPassword, setChangePasswordPassword] = useState('');
//   const [changePasswordPasswordError, setChangePasswordPasswordError] =
//     useState('');

//   const [newPasswordError, setNewPasswordError] = useState('');

//   const [newEmail, setNewEmail] = useState('');
//   const [newEmailErrorState, setNewEmailErrorState] = useState('');

//   const [changeEmail, setChangeEmail] = useState('');
//   const [changeEmailError, setChangeEmailError] = useState('');

//   const [changeEmailPassword, setChangeEmailPassword] = useState('');
//   const [changeEmailPasswordError, setChangeEmailPasswordError] = useState('');

//   const [newEmailError, setNewEmailError] = useState('');

//   const validateEmail = (email: string) => {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     return emailPattern.test(email);
//   };

//   const validatePassword = (password: string) => {
//     return password.length >= 6;
//   };

//   const handleValidation = (
//     a: string,
//     b: string,
//     c: (error: string) => void,
//     d: (error: string) => void
//   ): void => {
//     if (!validateEmail(a)) {
//       c('Please enter a valid email.');
//     } else {
//       c('');
//     }

//     if (!validatePassword(b)) {
//       d('Password must be at least 6 characters.');
//     } else {
//       d('');
//     }
//   };

//   const handleSaveEmail = async () => {
//     if (!newEmail.trim() || !validateEmail(newEmail)) {
//       setNewEmailErrorState('Please enter a valid new email.');
//       return;
//     }
//     setNewEmailErrorState('');
//     handleValidation(
//       changeEmail,
//       changeEmailPassword,
//       setChangeEmailError,
//       setChangeEmailPasswordError
//     );
//     if (changeEmailError || changeEmailPasswordError) return;
//     try {
//       setNewEmailError('');
//       await updateUserEmail(newEmail, changeEmail, changeEmailPassword);
//       toast('Email updated successfully!', {
//         description: `Please log in to your account with a new email 💗`,
//       });
//       router.push('/');
//     } catch (error) {
//       console.error('Error updating email:', error);
//       setNewEmailError(
//         'Failed to update email. Please check your password and try again.'
//       );
//     }
//   };

//   const handleSavePassword = async () => {
//     if (!newPassword.trim() || !validatePassword(newPassword)) {
//       setNewPasswordErrorState('Please enter a valid new password.');
//       return;
//     }
//     setNewPasswordErrorState('');
//     handleValidation(
//       changePasswordEmail,
//       changePasswordPassword,
//       setChangePasswordEmailError,
//       setChangePasswordPasswordError
//     );
//     if (changePasswordEmailError || changePasswordPasswordError) return;
//     try {
//       setNewPasswordError('');
//       await updateUserPassword(
//         newPassword,
//         changePasswordEmail,
//         changePasswordPassword
//       );
//       toast('Password updated successfully!', {
//         description: `Please log in to your account with a new password 💗`,
//       });
//       router.push('/');
//     } catch (error) {
//       console.error('Error updating password:', error);
//       setNewPasswordError(
//         'Failed to update password. Please check your information and try again.'
//       );
//     }
//   };

//   useEffect(() => {
//     const fetchUserName = async () => {
//       try {
//         const userDoc = await getUserDocument();
//         setName(userDoc?.name || '');
//       } catch (error) {
//         console.error('Error fetching user name:', error);
//       }
//     };
//     fetchUserName();
//   }, []);

//   const handleSaveName = async () => {
//     if (!name.trim()) {
//       setNameError('Name cannot be empty.');
//       return;
//     }
//     try {
//       setNameError('');
//       await updateUserName(name);
//       toast('Name changed successfully!', {
//         description: `Now your name is ${name} 💗`,
//       });
//       onNameChange(name);
//     } catch (error) {
//       console.error('Error updating name:', error);
//       setNameError('Failed to update name. Please try again.');
//     }
//   };

//   const handleDeleteData = async () => {
//     await deleteAllMoodData();
//     toast('All your data was deleted successfully!', {
//       description: `Enjoy MoodFlow with a fresh start💗`,
//     });
//     onRedirectToCurrentMood();
//   };

//   const handleSubmit = () => {
//     handleValidation(email, password, setEmailError, setPasswordError);
//     if (emailError || passwordError) {
//       setIsDialogOpen(false);
//       return;
//     }
//     setIsDialogOpen(true);
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       setIsDialogOpen(false);
//       await deleteAccount(email, password);
//       toast('Your account was deleted successfully!', {
//         description: `Tou can always create a new account💗`,
//       });
//       router.push('/');
//     } catch (error) {
//       setFormError('Failed to delete account. Please enter correct data.');
//     }
//   };

//   return (
//     <div>
//       <PageTitle title='MoodFlow Settings' />

//       <div className='bg-gray-100/50 dark:bg-neutral-800/50 xs:min-w-[400px] w-fit p-10 border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-xl mx-auto mt-10'>
//         <p className='x0:text-2xl pb-5  font-semibold'>Change your name</p>
//         <div className='flex flex-col  gap-4'>
//           <Label htmlFor='name' className='text-left'>
//             Name
//           </Label>
//           <div className='flex-col'>
//             <Input
//               id='name'
//               type='text'
//               className='max-w-[300px]'
//               placeholder={name}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             {nameError && (
//               <p className='text-red-500 pt-2 max-w-[300px]'>{nameError}</p>
//             )}
//           </div>
//           <Button className='max-w-[300px]' onClick={handleSaveName}>
//             Save Changes
//           </Button>
//         </div>
//       </div>

//       <div className='bg-gray-100/50 dark:bg-neutral-800/50 w-fit xs:min-w-[400px] p-10 border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-xl mx-auto mt-10'>
//         <p className='x0:text-2xl pb-5 font-semibold'>Change your email</p>
//         <div className='flex flex-col gap-4'>
//           <div className='flex flex-col gap-4'>
//             <Label htmlFor='newEmail'>New email</Label>
//             <Input
//               id='newEmail'
//               type='email'
//               placeholder='newEmail@example.com'
//               className='max-w-[300px]'
//               value={newEmail}
//               onChange={(e) => setNewEmail(e.target.value)}
//               required
//             />
//             {newEmailErrorState && (
//               <p className='text-red-500 max-w-[300px]'>{newEmailErrorState}</p>
//             )}
//           </div>
//           <div className='flex flex-col gap-4'>
//             <Label htmlFor='email'>Current email</Label>
//             <Input
//               id='email'
//               type='email'
//               placeholder='oldEmail@example.com'
//               className='max-w-[300px]'
//               value={changeEmail}
//               onChange={(e) => setChangeEmail(e.target.value)}
//               required
//             />
//             {changeEmailError && (
//               <p className='text-red-500 max-w-[300px]'>{changeEmailError}</p>
//             )}
//           </div>
//           <div className='flex flex-col gap-4'>
//             <Label htmlFor='password'>Current password</Label>
//             <Input
//               id='password'
//               type='password'
//               placeholder='password'
//               className='max-w-[300px]'
//               value={changeEmailPassword}
//               onChange={(e) => setChangeEmailPassword(e.target.value)}
//               required
//             />
//             {changeEmailPasswordError && (
//               <p className='text-red-500 max-w-[300px]'>
//                 {changeEmailPasswordError}
//               </p>
//             )}
//           </div>

//           <Button className='max-w-[300px]' onClick={handleSaveEmail}>
//             Save new email
//           </Button>
//           {newEmailError && (
//             <p className='text-red-500 max-w-[300px]'>{newEmailError}</p>
//           )}
//         </div>
//       </div>

//       <div className='bg-gray-100/50 dark:bg-neutral-800/50 w-fit xs:min-w-[400px] p-10 border border-neutral-200 shadow-sm dark:border-neutral-800 rounded-xl mx-auto mt-10'>
//         <p className='x0:text-2xl pb-5 font-semibold'>Change your password</p>
//         <div className='flex flex-col gap-4'>
//           <div className='flex flex-col gap-4'>
//             <Label htmlFor='newPassword'>New password</Label>
//             <Input
//               id='newPassword'
//               type='password'
//               placeholder='newPassword'
//               className='max-w-[300px]'
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             {newPasswordErrorState && (
//               <p className='text-red-500 max-w-[300px]'>
//                 {newPasswordErrorState}
//               </p>
//             )}
//           </div>
//           <div className='flex flex-col gap-4'>
//             <Label htmlFor='email'>Current email</Label>
//             <Input
//               id='email'
//               type='email'
//               placeholder='oldEmail@example.com'
//               className='max-w-[300px]'
//               value={changePasswordEmail}
//               onChange={(e) => setChangePasswordEmail(e.target.value)}
//               required
//             />
//             {changePasswordEmailError && (
//               <p className='text-red-500 max-w-[300px]'>
//                 {changePasswordEmailError}
//               </p>
//             )}
//           </div>
//           <div className='flex flex-col gap-4'>
//             <Label htmlFor='password'>Current password</Label>
//             <Input
//               id='password'
//               type='password'
//               placeholder='password'
//               className='max-w-[300px]'
//               value={changePasswordPassword}
//               onChange={(e) => setChangePasswordPassword(e.target.value)}
//               required
//             />
//             {changePasswordPasswordError && (
//               <p className='text-red-500 max-w-[300px]'>
//                 {changePasswordPasswordError}
//               </p>
//             )}
//           </div>

//           <Button className='max-w-[300px]' onClick={handleSavePassword}>
//             Save new password
//           </Button>
//           {newPasswordError && (
//             <p className='text-red-500 max-w-[300px]'>{newPasswordError}</p>
//           )}
//         </div>
//       </div>

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
  [key: string]: string; // Разрешает использование строковых ключей для значения типа string
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

  // Общий объект состояния формы
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

  // Функция для обновления состояния
  const updateFormData = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Валидация email и пароля
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

  // Функция для сохранения нового имени
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

  // Функция для сохранения нового email
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

  // Функция для сохранения нового пароля
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

  // Загрузка имени пользователя при первом рендере
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

  const handleDeleteData = async () => {
    await deleteAllMoodData();
    toast('All your data was deleted successfully!', {
      description: `Enjoy MoodFlow with a fresh start💗`,
    });
    onRedirectToCurrentMood();
  };
  const handleDeleteAccount = async () => {
    try {
      setIsDialogOpen(false); // Закрываем диалог
      // Передаем email и password из formData
      await deleteAccount(formData.email, formData.password);
      toast('Your account was deleted successfully!', {
        description: 'You can always create a new account💗',
      });
      router.push('/');
    } catch (error) {
      // Устанавливаем ошибку в форму, если удаление не удалось
      setFormData((prev) => ({
        ...prev,
        formError: 'Failed to delete account. Please enter correct data.',
      }));
    }
  };

  const handleSubmit = () => {
    // Вызываем валидацию с ключами email и password, и добавляем префикс для ошибок
    handleValidation('email', 'password', ''); // Префикс '' так как ошибки связаны с глобальными полями

    // Проверяем ошибки в состоянии formData
    if (formData.emailError || formData.passwordError) {
      setIsDialogOpen(false); // Если есть ошибки, закрываем диалог
      return;
    }

    // Если ошибок нет, открываем диалог
    setIsDialogOpen(true);
  };

  // Упрощённая функция рендеринга полей ввода
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

      {/* <DangerZone
        handleDeleteData={handleDeleteData}
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        password={password}
        passwordError={passwordError}
        setPassword={setPassword}
        formError={formError}
        handleSubmit={handleSubmit}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleDeleteAccount={handleDeleteAccount}
      /> */}
      <Footer />
    </div>
  );
};

export default SettingsPage;
