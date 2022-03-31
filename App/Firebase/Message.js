import dayjs from 'dayjs';
import {child, push, ref} from 'firebase/database';
import {database} from './firebaseConfig';

export const SendMessage = async (currentUid, guestUid, message, imgSource) => {
  try {
    const dbRef = ref(database, 'messages/' + currentUid);
    await push(child(dbRef, guestUid), {
      message: {
        sender: currentUid,
        receiver: guestUid,
        msg: message,
        image: imgSource,
        date: dayjs().format('YYYY-MM-DD'),
        time: dayjs().format('hh:mm A'),
      },
    });
  } catch (error) {
    return error;
  }
};

export const ReceiveMessage = async (
  currentUid,
  guestUid,
  message,
  imgSource,
) => {
  try {
    const dbRef = await ref(database, 'messages/' + guestUid);
    await push(child(dbRef, currentUid), {
      message: {
        sender: currentUid,
        receiver: guestUid,
        msg: message,
        image: imgSource,
        date: dayjs().format('YYYY-MM-DD'),
        time: dayjs().format('hh:mm A'),
      },
    });
  } catch (error) {
    return error;
  }
};
