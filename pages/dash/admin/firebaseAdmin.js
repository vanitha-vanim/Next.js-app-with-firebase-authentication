// import {getApp} from "firebase-admin/app";
// import {getAuth} from "firebase-admin/auth";
// import {initializeApp} from "firebase-admin/app";
// import {getFirestore} from "firebase-admin/firestore";
// import { getDatabase } from "firebase-admin/database";
// import { getStorage } from "firebase-admin/storage";
// import { getMessaging } from "firebase-admin/messaging";

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

const firebaseAdminApp = admin.apps.length ? getApp() : initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: serviceAccount.databaseURL,
    storageBucket: serviceAccount.storageBucket
})

// export const firebaseAdminAuth = getAuth(firebaseAdminApp)
// export const firebaseAdminFirestore = getFirestore(firebaseAdminApp)
// export const firebaseAdminDatabase = getDatabase(firebaseAdminApp)
// export const firebaseAdminStorage = getStorage(firebaseAdminApp)
// export const firebaseMessagin = getMessaging(firebaseAdminApp)

const db = admin.firestore();

module.exports = { admin, db };