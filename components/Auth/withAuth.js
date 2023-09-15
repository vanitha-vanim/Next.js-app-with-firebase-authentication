
// HOC to check if the user is authenticated. If not, you can redirect them to the sign-in page.


import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();

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
