// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase Authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google Auth Setting
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// -- ここまではFireBaseの設定(お作法通り) --

/** ユーザ登録処理 */
export const createUser = async (email: string, password: string): Promise<UserCredential | null> => {
  let userCredential = null;
  try {
    userCredential = await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`エラーコード: ${errorCode} エラーメッセージ: ${errorMessage}`);
  }
  return userCredential;
}

/** ログイン処理 */
export const login = async (email: string, password: string): Promise<UserCredential | null> => {
  let userCredential = null;
  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`エラーコード: ${errorCode} エラーメッセージ: ${errorMessage}`);
  }
  return userCredential;
}

/** ログイン処理(Google認証) */
export const googleLogin = async (): Promise<UserCredential | null> => {
  let userCredential = null;
  try {
    if (auth.currentUser) {
      // Googleアカウントと紐付け
      userCredential = await linkWithPopup(auth.currentUser, provider);
    } else {
      // ログイン
      userCredential = await signInWithPopup(auth, provider);
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`エラーコード: ${errorCode} エラーメッセージ: ${errorMessage}`);
  }
  return userCredential;
}

/** ログアウト処理 */
export const logout = async () => await signOut(auth);

/** ログイン状態確認カスタムフック */
export const useMe = (): { user: User | null, loading: boolean } => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ログイン状態
        setUser(user);
      } else {
        // ログアウト状態
        setUser(null);
      }
      // 処理完了
      setLoading(false);
    })
  }, []);
  return { user, loading };
}