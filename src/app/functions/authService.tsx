// All functions related to firebase interactions
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
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';

// helper function for checking current user
const getCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }
  return user;
};

//helper function for setting errors
const handleFirebaseError = (error: any) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return '🔍 No user found with this email. Please check and try again.';
    case 'auth/wrong-password':
      return '🐍 Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return '🦧 Invalid email format. Please check your email and try again.';
    case 'auth/email-already-in-use':
      return '🔍 A user with this email already exists. Please use a different email.';
    default:
      return '🦨 Operation failed. Please try again.';
  }
};

//New user registration function
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
    const errorMessage = handleFirebaseError(error);
    throw new Error(errorMessage);
  }
};

//User login function
export const login = async (email: string, password: string): Promise<void> => {
  try {
    if (!email || !password) {
      throw new Error('Email and password cannot be empty.');
    }
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    const errorMessage = handleFirebaseError(error);
    throw new Error(errorMessage);
  }
};

//User new mood data saving function
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

//Fetching user's mood data by date function
export const fetchMoodData = async (currentDate: string): Promise<any> => {
  const user = getCurrentUser();
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

//Fetching all user's mood data function
export const fetchAllMoodData = async (): Promise<
  { date: string; data: any }[]
> => {
  const user = getCurrentUser();
  const userMoodCollectionRef = collection(db, `users/${user.uid}/mood`);
  try {
    const querySnapshot = await getDocs(userMoodCollectionRef);
    if (!querySnapshot.empty) {
      const moodData = querySnapshot.docs.map((doc) => ({
        date: doc.id,
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

//Deleting all user's mood data function
export const deleteAllMoodData = async (): Promise<void> => {
  const user = getCurrentUser();
  const moodCollectionRef = collection(db, `users/${user.uid}/mood`);
  try {
    const moodDocsSnapshot = await getDocs(moodCollectionRef);
    const deletePromises = moodDocsSnapshot.docs.map((docSnapshot) =>
      deleteDoc(docSnapshot.ref)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting mood data:', error);
  }
};

//helper function for reauthentication current user
const reauthenticate = async (email: string, password: string) => {
  const user = getCurrentUser();
  const credential = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(user, credential);
};

//Deleting user's account function
export const deleteAccount = async (email: string, password: string) => {
  const user = getCurrentUser();
  try {
    await reauthenticate(email, password);
    await deleteAllMoodData();
    const userRef = doc(db, 'users', user.uid);
    await deleteDoc(userRef);
    await deleteUser(user);
  } catch (error) {
    console.error('Error deleting account:', error);
    throw new Error('Failed to delete account. Please try again.');
  }
};

//fetching current user's information function
export const getUserDocument = async () => {
  try {
    const user = getCurrentUser();
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error('User document does not exist');
    }
    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user document:', error);
    throw error;
  }
};

//updating user's name function
export const updateUserName = async (name: string) => {
  try {
    const user = getCurrentUser();
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { name }, { merge: true });
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;
  }
};

//updating user's email function
export const updateUserEmail = async (
  newEmail: string,
  email: string,
  currentPassword: string
) => {
  try {
    const user = getCurrentUser();
    if (!user || !user.email) {
      throw new Error('No authenticated user found.');
    }
    await reauthenticate(email, currentPassword);
    await updateEmail(user, newEmail);
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

//updating user's password function
export const updateUserPassword = async (
  newPassword: string,
  email: string,
  currentPassword: string
) => {
  try {
    const user = getCurrentUser();
    if (!user || !user.email) {
      throw new Error('No authenticated user found.');
    }
    await reauthenticate(email, currentPassword);
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

//checking user authentication status+displaying user name
export const checkAuthState = (
  setUserName: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserName(userDoc.data()?.name);
        } else {
          setError('User not found in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('No user is currently logged in. 👀');
      setLoading(false);
    }
  });

  return unsubscribe;
};
