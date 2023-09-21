import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const authInstance = getAuth();
      await sendPasswordResetEmail(authInstance, email);
      setIsResetSent(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.error('User not found. Please check your email address.');
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {isResetSent ? (
        <p>Instructions to reset your password have been sent to your email.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
