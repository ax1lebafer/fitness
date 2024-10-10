import {
  get,
  getDatabase,
  ref,
  update,
  set,
  child,
  remove,
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

export async function fetchCourse(courseId: string): Promise<CourseType[]> {
  const response = await get(ref(database, `courses/${courseId}`));

  const data = response.val();

  if (data) {
    return Object.values(data);
  } else {
    throw new Error("Нет данных");
  }
}

export async function fetchCoursesOfUser(userId: string) {
  console.log("fetchCoursesOfUser userId:", userId);
  console.log("fetchCoursesOfUser userId.id:", userId.id);
  const snapshot = await get(
    child(ref(database), `users/${userId}/courses`),
  );
  console.log("snapshot.val(): ", snapshot.val());
  if (snapshot.exists()) {
    const data = snapshot.val();

    if (data) {
      return Object.values(data);
    } else {
      throw new Error("Нет данных");
    }
  }
}

export async function fetchAddCourseToUser(userId: string, courseId: string) {
  const snapshot = await get(child(ref(database), `courses/${courseId}`));
  console.log("snapshot.val(): ", snapshot.val());
  if (snapshot.exists()) {
    const snapshotCourseDir = await get(
      child(ref(database), `users/${userId}/courses`),
    );
    console.log("snapshotCourseDir.val(): ", snapshotCourseDir.val());
    if (snapshotCourseDir.exists()) {
      const snapshotCourseOfUser = await get(
        child(ref(database), `users/${userId}/courses/${courseId}`),
      );
      console.log("snapshotCourseOfUser.val(): ", snapshotCourseOfUser.val());

      if (!snapshotCourseOfUser.exists()) {
        update(
          child(ref(database), `users/${userId}/courses/${courseId}`),
          snapshot.val(),
        );
        alert("Курс добавлен стр.69");
      } else {
        alert("Такой курс уже имеется");
      }
    } else {
      set(ref(database, `users/${userId}/courses/${courseId}`), snapshot.val());
      alert("Курс добавлен стр.75");
    }
  }
}

export async function fetchRemoveCourseFromUser(
  userId: string,
  courseId: string,
) {
  const snapshot = await get(child(ref(database), `courses/${courseId}`));
  console.log("snapshot.val(): ", snapshot.val());
  if (snapshot.exists()) {
    const snapshotCourseDir = await get(
      child(ref(database), `users/${userId}/courses`),
    );
    console.log("snapshotCourseDir.val(): ", snapshotCourseDir.val());
    if (snapshotCourseDir.exists()) {
      remove(child(ref(database), `users/${userId}/courses/${courseId}`));
      alert("Курс удален стр.100");
    } else {
      alert("Такого курса нет");
    }
  } else {
    set(ref(database, `users/${userId}/courses/${courseId}`), snapshot.val());
    alert("Курс Удален стр.106");
  }
}
