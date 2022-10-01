import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const firebaseAccount = require('../../service-account.json');

// initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(firebaseAccount),
});

// signup function
const signup = async (req: Request, res: Response) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const userSignup = await admin.auth().createUser({
      email: user.email,
      password: user.password,
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.log(error);
  }
};

export { signup };
