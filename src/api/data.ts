import {
  get,
  getDatabase,
  ref,
  set,
  child,
  // push,
  // update,
} from "firebase/database";
import { app } from "../lib/firebaseConfig.ts";
import { CourseType } from "../types/courses.ts";
// import { useState } from "react";

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

// export async function _fetchAddCourseToUser(userId: string, courseId: string) {
//   const snapshot = await get(child(ref(database), `courses/${courseId}`));
//   let isContain = false;
//   if (snapshot.exists()) {
//     const response = await get(child(ref(database), `users/${userId}/courses`));
//     console.log("response.val(): ", response.val());
//     if (response.exists()) {
//       const snapshotCourse = await get(
//         child(ref(database), `users/${userId}/courses`),
//       );

//       if (!snapshotCourse.exists()) {
//         _addCourse();
//       } else {
//         snapshotCourse.forEach((item) => {
//           if (item.val()._id === courseId) {
//             isContain = true;
//             alert("Такой курс уже имеется");
//           }
//         });

//         if (!isContain) {
//           _addCourse();
//         }
//       }
//     } else {
//       _addCourse();
//     }

//     function _addCourse() {
//       const postListRef = ref(database, `users/${userId}/courses`);
//       const newPostRef = push(postListRef);
//       set(newPostRef, { _id: courseId });
//       alert("Курс добавлен");
//     }

//     // const removeFavorite = async (key) => {
//     //   await remove(ref(db, `user/${userAuth.uid}/favorite/${key}`));
//     // };
//   } else {
//     console.log("Такого курса в списке нет");
//   }
// }

// export const fetchAddCourseToUser = async (
// userId: string,
// courseId: string
// ) => {
export async function fetchAddCourseToUser(userId: string, courseId: string) {
  // const [isContain, setIsContain] = useState(false);
  let isContain = false;
  const snapshot = await get(child(ref(database), `courses/${courseId}`));
  console.log("snapshot.val(): ", snapshot.val());
  if (snapshot.exists()) {
    const response = await get(child(ref(database), `users/${userId}/${courseId}`));
    console.log("response.val(): ", response.val());
    if (response.exists()) {
      const snapshotCourse = await get(
        child(ref(database), `users/${userId}`),
      );
      console.log("snapshotCourse.val(): ", snapshotCourse.val());

      if (!snapshotCourse.exists()) {
        set(ref(database, `users/${userId}`), snapshot.val());
        alert("Курс добавлен стр.103");
      } else {
        snapshotCourse.forEach((item) => {
          if (item.val()._id === courseId) {
            isContain = true;
            // setIsContain(true);
            alert("Такой курс уже имеется");
          }
        });

        if (!isContain) {
          set(
            ref(database, `users/${userId}`),
            snapshot.val(),
          );
          alert("Курс добавлен стр.117");
        }
      }
    } else {
      set(
        ref(database, `users/${userId}/${courseId}`),
        snapshot.val(),
      );
      alert("Курс добавлен стр.125");
    }
  }
}
