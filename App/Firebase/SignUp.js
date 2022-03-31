import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebaseConfig';

export const SignUp = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};
