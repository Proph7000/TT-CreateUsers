import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAXRNWDO-6D8LEocz7m2A3z_KQMdpA2V7I',
  authDomain: 'tt-createuser.firebaseapp.com',
  projectId: 'tt-createuser',
  storageBucket: 'tt-createuser.appspot.com',
  messagingSenderId: '753988132444',
  appId: '1:753988132444:web:cd22ebc5a6c1678103d099',
};

const app = initializeApp(firebaseConfig);

export const firestorage = getStorage(app);
export const firestore = getFirestore(app);
