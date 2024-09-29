import { SignInType, SignUpType } from "../types/sign";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { ref, getDatabase, get, child, set } from "firebase/database";
import { auth, app } from "../lib/firebaseConfig";

const database = getDatabase(app);

// const firebaseApp = initializeApp(firebaseConfig);
// const database = getDatabase(firebaseApp);
// const auth = getAuth(firebaseApp);
// const snapshot = await get(child(ref(database), `courses/${courseId}`));


export async function getRegistration({ email, username, password }: SignUpType) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const uid = userCredential.user.uid;
  console.log("reg. uid: ", uid);

  const response = await set(ref(database, "users/" + uid), {
    uid: uid,
    name: username,
    email: email,
    courses: {
      workouts: {},
    },
  });
  console.log("auth. response: ", response);
  return response;
}

export async function getUser({ email, password }: SignInType) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const uid = userCredential.user.uid;
  console.log("UID: ", uid);

  const db = ref(database);
  console.log("db:", db);
  const snapshot = await get(child(db, `users/${uid}`));
  console.log("Snapshot: ", snapshot);
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
