import React, { useState } from 'react';
import { firestore, auth } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import Link from 'next/link';
import styles from '../../styles/SignUp.module.css'; 
import { getAuthErrorMessage } from '../../utils/authErrors';
import { useRouter } from 'next/router';

import {
  getFirestore, collection, addDoc, doc, setDoc
} from 'firebase/firestore';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [response, setResponse] = useState('');

  const router = useRouter();

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();

    try {
      const authInstance = getAuth(); 
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password); 
  
      const userRole = 'user'; // Replace with desired user role
  
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        firstName: firstName,
        lastName: lastName,
        userRole,
        createdAt: new Date().toISOString(),
      });
  
      router.push('/dash/admin/dashboard');
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
      console.error(error.message);
    }
  };

  const createProfile = async () => {
    try {
      const token = ''; // Get the user's JWT token after authentication
      const response = await axios.post(
        '/api/createUserProfile',
        {
          email: 'example@example.com',
          firstName: 'John',
          lastName: 'Doe',
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        setResponse(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setResponse('Error creating user profile');
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={signUpWithEmailAndPassword}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>

      <Link href="/resetpassword">Forgot Password?</Link>
    </div>
  );
}

export default SignUp;
