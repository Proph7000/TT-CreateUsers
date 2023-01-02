import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from '@firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { firestorage, firestore } from '../firebase_setup/firebase';
import { Avatar } from '../types/Avatar';
import { NewUser } from '../types/NewUser';
import { UserFromServer } from '../types/UserFromServer';

type AvatarsUrl = string | null;

export const addUser = (data: NewUser) => {
  return addDoc(collection(firestore, 'users'), data);
};

export const UploadAvatar = (avatar: Avatar) => {
  const storageRef = ref(firestorage, `avatars/${avatar.name}`);

  return uploadString(storageRef, avatar.data, 'data_url');
};

export const deleteUser = (data: string) => {
  return deleteDoc(doc(firestore, 'users', data));
};

export const deleteAvatar = (refAvatar: string) => {
  const desertRef = ref(firestorage, refAvatar);

  return deleteObject(desertRef);
};

export const getUsers = async () => {
  const usersFromServer = await getDocs(collection(firestore, 'users'));
  const users: UserFromServer[] = [];
  const avatarsRef: string[] = [];
  const avatarsUrl: AvatarsUrl[] = [];

  usersFromServer.forEach(userFromServer => avatarsRef.push(
    userFromServer.data().avatarName,
  ));

  await Promise.allSettled(avatarsRef.map(avatar => {
    if (avatar) {
      return getDownloadURL(ref(firestorage, avatar));
    }

    return null;
  }))
    .then(response => {
      response.forEach((res) => {
        if (res.status === 'fulfilled') {
          avatarsUrl.push(res.value);
        }
      });
    });

  usersFromServer.forEach((userFromServer) => users.push({
    id: userFromServer.id,
    name: userFromServer.data().name,
    phone: userFromServer.data().phone,
    surname: userFromServer.data().surname,
    email: userFromServer.data().email,
    birthdate: userFromServer.data().birthdate,
    avatarUrl: null,
    avatarRef: null,
  }));

  for (let i = 0; i < users.length; i += 1) {
    users[i].avatarUrl = avatarsUrl[i];
    users[i].avatarRef = avatarsRef[i];
  }

  return users;
};
