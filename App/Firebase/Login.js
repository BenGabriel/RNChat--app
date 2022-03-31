import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebaseConfig';

export const Login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};
