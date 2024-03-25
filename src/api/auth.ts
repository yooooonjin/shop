import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { firebaseAuth, firebaseDb } from '../service/firebase/init';

const provider = new GoogleAuthProvider();

export async function signin() {
  return signInWithPopup(firebaseAuth, provider).then(async (result) => {
    const user = result.user;
    const userInfo = await checkAdminStatus(user);
    return userInfo;
  });
}

export async function signout() {
  return signOut(firebaseAuth);
}

export async function getAuthState(
  callback: (user: (User & { isAdmin?: boolean }) | null) => void
) {
  return onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      const userInfo = await checkAdminStatus(user);
      callback(userInfo);
    }
  });
}

async function checkAdminStatus(user: User) {
  return get(ref(firebaseDb, 'admins/')).then((snapshot) => {
    if (snapshot.exists()) {
      const data: string[] = snapshot.val();
      const isAdmin = data.includes(user.uid ?? '');
      return { ...user, isAdmin };
    } else {
      return user;
    }
  });
}
