import {ref, set, update} from 'firebase/database';
import {database} from './firebaseConfig';

export const AddUser = async (name, email, image, uid) => {
  try {
    return await set(ref(database, 'users/' + uid), {
      name,
      email,
      image,
      uid,
    });
  } catch (error) {
    return error;
  }
};

export const UpdateUserImage = async (image, uid) => {
  try {
    return await update(ref(database, 'users/' + uid), {
      image,
    });
  } catch (error) {
    return error;
  }
};
