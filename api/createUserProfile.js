import verifyToken from './verifyToken';
const { admin, db } = require('../../firebase');

export default async function handler(req, res) {
  try {
    const { uid } = req.user;
    const { email, firstName, lastName } = req.body;

    const userDocRef = db.collection('users').doc(uid);

    const userDetails = {
      email,
      firstName,
      lastName,
    };

    await userDocRef.set({
      userDetails,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: 'User profile created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
