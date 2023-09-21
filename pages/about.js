import React from 'react';
import Link from 'next/link';
import withAuth from '../components/Auth/withAuth';
import styles from '../styles/SignIn.module.css';

function About({ user }) {

  console.log(user);

  return (
    <div className={styles.homeContainer}>
      <h1>About</h1>
      hey
      {user && (
        <div>
          {/* Show content only for authenticated users */}
          <p>Welcome, {user.displayName}!</p>
          <p>Your role is: {user.userRole}</p>

          {/* Show the button only for admin users */}
          {user.userRole === 'admin' && (
            <button>Admin Button</button>
            /* Replace this button with your actual admin functionality */
          )}
        </div>
      )}
    </div>
  );
}

// export default About;
export default withAuth(About, ['admin', 'user']);

