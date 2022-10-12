import { admin } from '../firebase-config';

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // split the token from the header
  const decodedValue = await admin.auth().verifyIdToken(token); // verify the token

  try {
    if (decodedValue) {
      console.log(decodedValue);
      next();
    }
  } catch (error) {
    res.status(401).send('Unauthorized');
    console.log(error);
  }
};

export { checkAuth };

