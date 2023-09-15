import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Dashboard() {
  const [user, setUser] = useState(null);
  const authInstance = getAuth();

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [authInstance]);

  const handleLogout = async () => {
    try {
      await signOut(authInstance);
      // Redirect to the sign-in page or perform any other desired action after logout.
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}!</p>
          <p>Welcome, {user.email}</p>
          <p>User ID: {user.uid}</p>
          <div>
          {user.photoURL && <img src={user.photoURL} alt="Profile" />}
        </div>
          {/* Add more user data as needed */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
