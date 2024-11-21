// AuthProvider component to provide the authentication state to the rest of the app
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
// Create a context for authentication with a default value of null
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // useEffect hook to listen to the authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
