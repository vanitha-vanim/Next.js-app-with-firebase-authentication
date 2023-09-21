
// HOC to check if the user is authenticated. If not, you can redirect them to the sign-in page.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const [user, setUserData] = useState(null);

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push('/signin');
        }
      });
    }, []);
 
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
