import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: 'AIzaSyAVmGd5eEvNAoXBsf18Q5EpVL_HDbgbtZI',
  authDomain: 'react-native-chat-ac7b8.firebaseapp.com',
  projectId: 'react-native-chat-ac7b8',
  storageBucket: 'react-native-chat-ac7b8.appspot.com',
  messagingSenderId: '770823452169',
  appId: '1:770823452169:web:c0915a6c7418b2e523aad8',
  databaseURL:'https://react-native-chat-ac7b8-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const database = getDatabase();

export {db, auth, database};
