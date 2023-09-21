
// HOC to check if the user is authenticated. If not, you can redirect them to the sign-in page.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import LoadingSpinner from '../../pages/components/Spinner'
import ErrorMessage from '../../pages/components/ErrorMessage'

const withAuth = (Component, allowedRoles = []) => {
  const Auth = (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {

          // Retrieve user data.
          try {
            const db = getFirestore(); // Initialization.
            const usersCollectionRef = collection(db, 'users'); // Create a reference to the Firestore collection for users.
            const userQuery = query(usersCollectionRef, where('uid', '==', authUser.uid)); // Query for the user's document based on their UID.
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
              // Get the first document (assuming there's only one user document per UID)
              const userDoc = querySnapshot.docs[0].data();
              setUser(userDoc);

              // Check if the user has one of the allowed roles.
              if (allowedRoles.length === 0 || allowedRoles.includes(userDoc.userRole)) {
                // User is authenticated and has an allowed role.
                setLoading(false);
                return;
              } else {
                // User is authenticated but doesn't have an allowed role.
                setLoading(false);
                setError('User does not have permission.');
                router.push('/access-denied');
              }
            } else {
              console.log('User document not found in Firestore.');
              setError('User document not found in Firestore.');
              router.push('/access-denied');
            }
          } catch (error) {
            setLoading(false);
            setError('Error fetching user data: ' + error.message);
            console.error('Error fetching user data:', error);

          }
        } else {
          setLoading(false);
          router.push('/signin'); // User is not authenticated, redirect to sign-in page.
        }
      });

      return () => {
        unsubscribe();
      };
    }, []);

    // useEffect(() => {
    //   auth.onAuthStateChanged((user) => {
    //     if (!user) {
    //       router.push('/signin');
    //     }
    //   });
    // }, []);

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }


    if (user && (allowedRoles.length === 0 || allowedRoles.includes(user.userRole))) {
      return <Component {...props} user={user}/>;     // Render the component only if the user is authenticated and has the allowed role.
    } else {
      return null; // Return null by default, component will only render if allowed role is met
    }
  };

  return Auth;
};

export default withAuth;
