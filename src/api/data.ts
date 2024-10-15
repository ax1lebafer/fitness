import {
  get,
  getDatabase,
  ref,
  update,
  // set,
  child,
  remove,
} from "firebase/database";
import { app } from "../lib/firebaseConfig.ts";
import { CourseType } from "../types/courses.ts";
import { WorkoutType } from "../types/workouts.ts";
import { sortByOrder } from "../utils/SortOrder.ts";

const database = getDatabase(app);

export async function fetchCourses(): Promise<CourseType[]> {
  let data: CourseType[] = [];

  const snapshot = await get(ref(database, "courses"));

  if (snapshot.exists()) {
    const coursesData = snapshot.val();
    Object.keys(coursesData).forEach((key) => {
      data.push(coursesData[key]);
    });
    data = data.sort(sortByOrder);
  }

  if (data) {
    return data;
  } else {
    throw new Error("Нет данных");
  }
}

export async function fetchCourse(courseId: string) {
  const snapshot = await get(ref(database, `courses/${courseId}`));
  const data = snapshot.val();

  if (snapshot.exists()) {
    return data;
  } else {
    throw new Error("Нет данных");
  }
}

export async function fetchCoursesOfUser(userId: string) {
  let data: CourseType[] = [];

  const snapshot = await get(child(ref(database), `users/${userId}/courses`));
  // console.log("snapshot.val(): ", snapshot.val());
  if (snapshot.exists()) {
    const coursesData = snapshot.val();
    const promises = Object.keys(coursesData).map(async (key) => {
      const data = await fetchCourse(key);
      const dataForView = {
        ...data,
      };
      return dataForView;
    });
    data = await Promise.all(promises);
    data = data.sort(sortByOrder);

    if (data) {
      return data;
    } else {
      throw new Error("Нет данных");
    }
  }
}

export async function fetchAddCourseToUser(userId: string, courseId: string) {
  const courseSnapshot = await get(child(ref(database), `courses/${courseId}`));
  if (!courseSnapshot.exists()) {
    alert("Курс не найден");
    return;
  }

  const workoutIdsSnapshot = await get(
    child(ref(database), `courses/${courseId}/workouts`),
  );
  const workoutIds = workoutIdsSnapshot.val();
  console.log("workoutIds: ", workoutIds);

  const userCourseSnapshot = await get(
    child(ref(database), `users/${userId}/courses/${courseId}`),
  );

  if (userCourseSnapshot.exists()) {
    alert("Такой курс уже имеется");
    return;
  }

  for (const id of workoutIds) {
    console.log("id: ", id);
    const workoutDataSnapshot = await get(
      child(ref(database), `workouts/${id}`),
    );
    if (workoutDataSnapshot.exists()) {
      const workoutData = workoutDataSnapshot.val() as WorkoutType;
      console.log("workoutData: ", workoutData);

      if (workoutData.exercises && Array.isArray(workoutData.exercises)) {
        const updatedExercises = workoutData.exercises.map((exercise) => {
          return {
            ...exercise,
            isDone: false,
            progress: 0,
          };
        });
        workoutData.exercises = updatedExercises;
      }

      await update(
        child(
          ref(database),
          `users/${userId}/courses/${courseId}/workouts/${id}`,
        ),
        workoutData,
      );
    }
  }

  alert("Курс добавлен");
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
    alert("Такого курса нет");
  }
}

export const fetchWorkoutsOfUserCourse = async (
  workoutId: string,
  userId: string,
  courseId: string,
) => {
  console.log("fetchWorkoutOfCourse", workoutId, userId, courseId);
  let result: WorkoutType | null = null;

  try {
    const snapshot = await get(
      child(
        ref(database),
        `users/${userId}/courses/${courseId}/workouts/${workoutId}`,
      ),
    );

    if (snapshot.exists()) {
      result = snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }

  return result;
};

export async function fetchWorkoutsOfCourse(workoutId: string) {
  console.log("fetchWorkoutOfCourse", workoutId);
  let result: WorkoutType | null = null;

  try {
    const snapshot = await get(child(ref(database), `workouts/${workoutId}`));

    if (snapshot.exists()) {
      result = snapshot.val();
    }
  } catch (error) {
    console.error(error);
  }

  return result;
}
