import { SignInType, SignUpType } from "../types/sign";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { ref, getDatabase, get, child, set } from "firebase/database";
import { auth, app } from "../lib/firebaseConfig";

const database = getDatabase(app);

export async function getRegistration({
  email,
  username,
  password,
}: SignUpType) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const uid = userCredential.user.uid;

  const response = await set(ref(database, "users/" + uid), {
    uid: uid,
    name: username,
    email: email,
    courses: {
      workouts: {},
    },
  });
  console.log("auth. response: ", response);
  // return response;
  return userCredential.user;
}

export async function getUser({ email, password }: SignInType) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const uid = userCredential.user.uid;

  const snapshot = await get(child(ref(database), `users/${uid}`));
  if (snapshot.exists()) {
    console.log("Snapshot.val: ", snapshot.val());
  }
  return snapshot.val();
}

export async function changePassword(password: string) {
  try {
    if (!auth.currentUser) {
      throw new Error("Нет авторизации");
    }
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
