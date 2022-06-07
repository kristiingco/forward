import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  getDoc,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "forward-db.firebaseapp.com",
  projectId: "forward-db",
  storageBucket: "forward-db.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export const createUserDocFromAuth: any = async (userAuth: any) => {
  if (!userAuth) return;
  const { email, uid } = userAuth;
  try {
    return await setDoc(doc(db, "users", uid), {
      email,
    });
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

export const createUser: any = async (email: string, password: any) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser: any = async (email: string, password: any) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser: any = async () => {
  signOut(auth);
};

export const onAuthStateChangedListener = (callback: any) => {
  onAuthStateChanged(auth, callback);
};

export const getAllVideos = async () => {
  const q = query(collection(db, "videos"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const id = doc.id;
    const docData = doc.data();
    return { id, ...docData };
  });
};

const getBookmark = async (userId: string, videoId: string) => {
  const q1 = query(
    collection(db, "bookmarks"),
    where("userId", "==", userId),
    where("videoId", "==", videoId)
  );
  const q1Snapshot = await getDocs(q1);

  return q1Snapshot;
};

export const addBookmark = async (userId: string, videoId: string) => {
  const bookmark = await getBookmark(userId, videoId);
  if (bookmark.empty) {
    const docRef = await addDoc(collection(db, "bookmarks"), {
      userId: userId,
      videoId: videoId,
      isBookmarked: true,
    });
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data();
  } else {
    return bookmark.docs[0].data();
  }
};
