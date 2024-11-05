'use client';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
      email,
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
    console.log('Mood data saved successfully');
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
      console.log('Mood data fetched successfully:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No mood data found for this date.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching mood data:', error);
    return null;
  }
};
