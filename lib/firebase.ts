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
  updateDoc,
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

  const resultsArray = querySnapshot.docs.map((doc) => {
    const id = doc.id;
    const docData = doc.data();
    return {
      id,
      ...docData,
      isBookmarked: true,
    };
  });

  return resultsArray;
};

export const getBookmarkedVideos = async (userId: any) => {
  const q = query(
    collection(db, "bookmarks"),
    where("userId", "==", userId),
    where("isBookmarked", "==", true)
  );

  const querySnapshot = await getDocs(q);

  const resultsArray = querySnapshot.docs.map((doc) => {
    const id = doc.id;
    const { videoId } = doc.data();
    return {
      id,
      videoId,
      isBookmarked: true,
    };
  });

  const videoIdArray = resultsArray.map((result) => {
    const { videoId } = result;
    return videoId;
  });

  const videoArray = [];

  for (let videoId of videoIdArray) {
    const docRef = doc(db, "videos", videoId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const id = docSnap.id;
      videoArray.push({ id, ...docSnap.data() });
    } else {
      continue;
    }
  }

  return videoArray;
};

const getBookmark = async (userId: string, videoId: string) => {
  const q = query(
    collection(db, "bookmarks"),
    where("userId", "==", userId),
    where("videoId", "==", videoId)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

export const doesBookmarkExist = async (userId: any, videoId: any) => {
  const bookmarkDocs = await getBookmark(userId, videoId);

  return bookmarkDocs.empty;
};

export const getBookmarkStatus = async (userId: any, videoId: any) => {
  const bookmarkExists = await doesBookmarkExist(userId, videoId);
  if (bookmarkExists) {
    return false;
  }
  const bookmark = await getBookmark(userId, videoId);
  const docData = bookmark.docs[0].data();
  return docData.isBookmarked;
};

export const modifyBookmark = async (userId: any, videoId: any) => {
  const bookmarkExists = await doesBookmarkExist(userId, videoId);
  if (bookmarkExists) {
    const docRef = await addDoc(collection(db, "bookmarks"), {
      userId: userId,
      videoId: videoId,
      isBookmarked: true,
    });
    const docSnapshot = await getDoc(docRef);
    const id = docSnapshot.id;
    const docData = docSnapshot.data();
    return { id, ...docData };
  } else {
    const bookmark = await getBookmark(userId, videoId);
    const id = bookmark.docs[0].id;
    const docData = bookmark.docs[0].data();
    const docRef = doc(db, "bookmarks", id);

    await updateDoc(docRef, {
      isBookmarked: !docData.isBookmarked,
    });

    const updatedDocRef = doc(db, "bookmarks", id);
    const updatedDocSnapshot = await getDoc(updatedDocRef);
    const updatedId = updatedDocSnapshot.id;
    const updatedDocData = updatedDocSnapshot.data();
    return { updatedId, ...updatedDocData };
  }
};
