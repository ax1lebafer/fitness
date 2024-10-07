import {
  get,
  getDatabase,
  ref,
  set,
  child,
  push,
  update,
} from "firebase/database";
import { app } from "../lib/firebaseConfig.ts";
import { CourseType } from "../types/courses.ts";

const database = getDatabase(app);

export async function fetchCourses(): Promise<CourseType[]> {
  const response = await get(ref(database, "courses"));

  const data = response.val();

  if (data) {
    return Object.values(data);
  } else {
    throw new Error("Нет данных");
  }
}

export async function fetchAddCourseToUser(userId: string, courseId: string) {
  const snapshot = await get(child(ref(database), `courses/${courseId}`));

  // A post entry.
  // const postData = {
  // courses: courseId
  // };
  if (snapshot.exists()) {
    const response = await get(
      child(ref(database), `users/${userId}/courses/_id`),
    );
    console.log("response.val(): ", response.val());
    if (response.exists()) {
      const currentRecord = { _id: response.val() };
      console.log("currentRecord: ", currentRecord);
      const newRec = { _id: courseId };
      const newRecord = { currentRecord, ...newRec };
      console.log("newRecord: ", newRecord);
      // update(ref(database), newRecord);
      // await set(ref(database, `users/${userId}/courses`), { _id: courseId });
    // } else {
      // await set(ref(database, `users/${userId}/courses`), { _id: courseId });
    }

    // Get a key for a new Post.
    const newPostKey = push(child(ref(database), `users/${userId}/courses`),).key;
    console.log("newPostKey: ", newPostKey);

     const newPostKey_ = push(
       child(ref(database), `users/${userId}/courses/_id`), courseId);

    console.log("newPostKey_: ", newPostKey_);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    // updates["users/" + {userId} +"/courses" + newPostKey] = postData;
    // updates["users/" + userId + "/courses" + newPostKey] = courseId;
    updates["users/" + userId + "/courses/_id"] = courseId;

    update(ref(database), updates);
    // update(ref(database), newPostKey);
    // update(ref(database), newPostKey_);
  }

  // if (snapshot.exists()) {
  //   const response = await get(
  //     child(ref(database), `users/${userId}/courses/${courseId}`),
  //   );
  //   if (!response.exists()) {
  //     await set(ref(database, `users/${userId}/courses`), courseId);
  //   }
  // }
  const resp = await get(
    child(ref(database), `users/${userId}/courses/${courseId}`),
  );
  if (resp.exists()) {
    console.log("Snapshot.val: ", resp.val());
  } else {
    throw new Error("Нет данных");
  }
}
