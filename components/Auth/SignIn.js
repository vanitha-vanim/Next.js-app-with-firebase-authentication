import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import GoogleSignIn from './GoogleSignIn';
import Link from 'next/link';
import styles from '../../styles/SignIn.module.css'; 
import { getAuthErrorMessage } from '../../utils/authErrors';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignIn = async (event) => {
    event.preventDefault(); 

    try {
      const authInstance = getAuth(); // Initialize authInstance
      await signInWithEmailAndPassword(authInstance, email, password);
      router.push('dash/admin/dashboard');
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
      console.error(error.message);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>

      <div>
      <GoogleSignIn />
      </div>

      <Link href="/resetpassword">Forgot Password?</Link>
    </div>
  );
}

export default SignIn;
