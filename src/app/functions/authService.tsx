'use client';
import { auth, db } from '@/lib/firebaseConfig';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      name,
    });
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error(
        '🔍 A user with this email already exists. Please use a different email.'
      );
    } else {
      console.error('Registration error:', error);
      throw new Error('🦨 Registration failed. Please try again.');
    }
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    if (!email || !password) {
      throw new Error('Email and password cannot be empty.');
    }

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new Error(
        '🔍 No user found with this email. Please check and try again.'
      );
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('🐍 Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error(
        '🦧 Invalid email format. Please check your email and try again.'
      );
    } else {
      throw new Error('🦨 Login failed. Please try again.');
    }
  }
};

export const saveMoodData = async (
  getMood: () => string,
  selectedFactors: string[],
  hoursOfSleep: number | string | null,
  weather: string,
  currentDate: string
): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User is not authenticated');
    return;
  }

  const moodData = {
    mood: getMood(),
    factors: selectedFactors,
    sleep: hoursOfSleep,
    weather,
  };

  const userDocRef = doc(db, `users/${user.uid}/mood/${currentDate}`);

  try {
    await setDoc(userDocRef, moodData);
  } catch (error) {
    console.error('Error saving mood data:', error);
  }
};

export const fetchMoodData = async (currentDate: string): Promise<any> => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User is not authenticated');
    return null;
  }
  const userDocRef = doc(db, `users/${user.uid}/mood/${currentDate}`);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching mood data:', error);
    return null;
  }
};

export const fetchAllMoodData = async (): Promise<
  { date: string; data: any }[]
> => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User is not authenticated');
    return [];
  }

  const userMoodCollectionRef = collection(db, `users/${user.uid}/mood`);
  try {
    const querySnapshot = await getDocs(userMoodCollectionRef);
    if (!querySnapshot.empty) {
      const moodData = querySnapshot.docs.map((doc) => ({
        date: doc.id, // Use the document ID as the date
        data: doc.data(),
      }));
      return moodData;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching all mood data:', error);
    return [];
  }
};

export const deleteAllMoodData = async (): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User is not authenticated');
    return;
  }

  const moodCollectionRef = collection(db, `users/${user.uid}/mood`);

  try {
    // Получаем все документы в коллекции
    const moodDocsSnapshot = await getDocs(moodCollectionRef);

    // Удаляем каждый документ
    const deletePromises = moodDocsSnapshot.docs.map((docSnapshot) =>
      deleteDoc(docSnapshot.ref)
    );

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting mood data:', error);
  }
};

export const deleteAccount = async (email: string, password: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User is not authenticated');
    return;
  }

  try {
    // Создайте учетные данные пользователя для повторной аутентификации
    const credential = EmailAuthProvider.credential(email, password);
    // Выполните повторную аутентификацию
    await reauthenticateWithCredential(user, credential);
    await deleteAllMoodData();
    const userRef = doc(db, 'users', user.uid);

    // Удаление основного документа пользователя
    await deleteDoc(userRef);

    // Удалите пользователя после успешной повторной аутентификации
    await deleteUser(user);

    // Только после успешного удаления пользователя
  } catch (error) {
    // Лог ошибки, если что-то пошло не так
    console.error('Error deleting account:', error);
    throw new Error('Failed to delete account. Please try again.'); // Генерация ошибки для обработки в вызывающем коде
  }
};

export const getUserDocument = async () => {
  try {
    const user = auth.currentUser;

    // Проверяем, что пользователь авторизован
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    // Проверка, существует ли документ
    if (!userDoc.exists()) {
      throw new Error('User document does not exist');
    }

    return userDoc.data(); // Возвращаем данные документа
  } catch (error) {
    console.error('Error fetching user document:', error);
    throw error;
  }
};

export const updateUserName = async (name: string) => {
  try {
    const user = auth.currentUser;

    // Проверяем, что пользователь авторизован
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const userDocRef = doc(db, 'users', user.uid);

    // Обновляем имя пользователя, используя setDoc с { merge: true }
    await setDoc(userDocRef, { name }, { merge: true });
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;
  }
};

export const updateUserEmail = async (
  newEmail: string,
  email: string,
  currentPassword: string
) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error('No authenticated user found.');
    }

    // Реаутентификация пользователя
    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    // Отправляем письмо с подтверждением на новый email
    await updateEmail(user, newEmail); // Этот вызов будет успешным, только если пользователь подтвердит email
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

export const updateUserPassword = async (
  newPassword: string,
  email: string,
  currentPassword: string
) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error('No authenticated user found.');
    }

    // Реаутентификация пользователя
    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    // Отправляем письмо с подтверждением на новый email
    await updatePassword(user, newPassword); // Этот вызов будет успешным, только если пользователь подтвердит email
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};
