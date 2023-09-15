import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';

const GoogleSignIn = () => {
  const authInstance = getAuth();
  const [user] = useAuthState(authInstance);
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authInstance, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default GoogleSignIn;
