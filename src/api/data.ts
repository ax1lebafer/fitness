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

export async function fetchCoursesOfUser(
  userId: string,
): Promise<CourseType[]> {
  const data: CourseType[] = [];

  const snapshot = await get(child(ref(database), `users/${userId}/courses`));
  if (snapshot.exists()) {
    const coursesData = snapshot.val();
    const courseIds = Object.keys(coursesData);

    for (const courseId of courseIds) {
      const courseSnapshot = await get(
        child(ref(database), `courses/${courseId}`),
      );
      if (courseSnapshot.exists()) {
        const courseData = courseSnapshot.val() as CourseType;
        data.push(courseData);
      }
    }

    return data.sort(sortByOrder);
  } else {
    return [];
    // throw new Error("У пользователя нет курсов");
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
  // console.log("workoutIds: ", workoutIds);

  const userCourseSnapshot = await get(
    child(ref(database), `users/${userId}/courses/${courseId}`),
  );

  if (userCourseSnapshot.exists()) {
    alert("Такой курс уже имеется");
    return;
  }

  for (const id of workoutIds) {
    // console.log("id: ", id);
    const workoutDataSnapshot = await get(
      child(ref(database), `workouts/${id}`),
    );
    if (workoutDataSnapshot.exists()) {
      const workoutData = workoutDataSnapshot.val() as WorkoutType;
      // console.log("workoutData: ", workoutData);

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
): Promise<void> {
  try {
    const courseSnapshot = await get(
      child(ref(database), `courses/${courseId}`),
    );
    // console.log("courseSnapshot.val(): ", courseSnapshot.val());

    if (!courseSnapshot.exists()) {
      throw new Error("Такого курса не существует в базе данных.");
    }

    const userCourseSnapshot = await get(
      child(ref(database), `users/${userId}/courses/${courseId}`),
    );
    // console.log("userCourseSnapshot.val(): ", userCourseSnapshot.val());

    if (!userCourseSnapshot.exists()) {
      throw new Error("У пользователя нет такого курса.");
    }

    await remove(child(ref(database), `users/${userId}/courses/${courseId}`));
    console.log("Курс успешно удалён у пользователя.");
  } catch (error) {
    console.error("Ошибка при удалении курса у пользователя:", error);
    throw error;
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
