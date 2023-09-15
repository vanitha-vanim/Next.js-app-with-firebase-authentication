import React, { useState } from 'react';
import { auth } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import Link from 'next/link';
import styles from '../../styles/SignUp.module.css'; 
import { getAuthErrorMessage } from '../../utils/authErrors';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();

    try {
      const authInstance = getAuth(); 
      await createUserWithEmailAndPassword(authInstance, email, password); 
      router.push('dash/admin/dashboard');
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
      console.error(error.message);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={signUpWithEmailAndPassword}>
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
