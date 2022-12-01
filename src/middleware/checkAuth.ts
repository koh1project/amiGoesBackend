import { admin } from '../firebase-config';

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // split the token from the header
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedValue = await admin.auth().verifyIdToken(token); // verify the token

    if (decodedValue) {
      next();
    }
  } catch (error) {
    // console.log(error);
    return res.status(401).send('Unauthorized');
  }
};

export { checkAuth };
