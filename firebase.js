import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC3-9UYeKoYYsFUg8Uk2Yibvx9YCuBxhpo",
    authDomain: "monashcurry-f05b5.firebaseapp.com",
    projectId: "monashcurry-f05b5",
    storageBucket: "monashcurry-f05b5.appspot.com",
    messagingSenderId: "348692589101",
    appId: "1:348692589101:web:7dba4310ab117a052aa6a4",
    measurementId: "G-T1VXBFMVWE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
