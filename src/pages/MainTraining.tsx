import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer.tsx";
import ResultTraining from "../components/ResultTraining.tsx";
import MyProgress from "../components/modal/MyProgress.tsx";
import MyProgressCounted from "../components/modal/MyProgressCounted.tsx";
import useCourses from "../hooks/useCourses.ts";
import { useUser } from "../hooks/useUser.ts";
import { WorkoutType } from "../types/workouts.ts";
import { CourseType } from "../types/courses.ts";
import { fetchWorkoutsOfUserCourse } from "../api/data.ts";

export default function MainTraining() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isOpenMyProgressModal, setIsOpenMyProgressModal] = useState(false);

  const { selectedCourses } = useCourses();
  const { user, loadingUser } = useUser();
  const userId = user?.uid;

  const { id } = useParams();

  const [workout, setWorkout] = useState<WorkoutType | null>(null);
  const [course, setCourse] = useState<CourseType | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        if (!userId) {
          setError("Вы не авторизованы");
          setLoading(false);
          return;
        }

        const currentCourse = selectedCourses.find((course) =>
          course.workouts.includes(id!),
        );

        if (!currentCourse) {
          setError("У вас нет доступа к этой тренировке");
          setLoading(false);
          return;
        }

        setCourse(currentCourse);

        const userWorkouts = await fetchWorkoutsOfUserCourse(
          userId,
          currentCourse._id,
        );

        const currentWorkout = userWorkouts.find(
          (workout) => workout._id === id,
        );

        if (!currentWorkout) {
          setError("Тренировка не найдена");
          setLoading(false);
          return;
        }

        setWorkout(currentWorkout);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    if (!loadingUser && selectedCourses.length > 0) {
      loadData();
    }
  }, [id, userId, selectedCourses, loadingUser]);

  const toggleWorkoutMyProgress = () => {
    setIsOpenMyProgressModal(true);
  };

  function handleSaveChanges() {
    setIsOpenMyProgressModal(false);
    setOpenSuccessModal(true);
    setTimeout(() => setOpenSuccessModal(false), 2000);
  }

  if (loading || loadingUser || selectedCourses.length === 0) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!workout || !course) {
    return <p>Данные не найдены</p>;
  }

  return (
    <div className="mb-[201px]">
      <h1 className="sm:text-[48px] md:text-[60px] text-[24px] text-left font-medium">
        {course.nameRU}
      </h1>
      <div>
        <p className="xl:text-[32px] text-left xl:underline pt-6 text-[18px]">
          {workout.name}
        </p>
      </div>
      <VideoPlayer src={workout.video} />

      {workout.exercises && (
        <ResultTraining
          exercises={workout.exercises}
          toggleWorkoutMyProgress={toggleWorkoutMyProgress}
        />
      )}

      {isOpenMyProgressModal && (
        <MyProgress
          exercises={workout.exercises}
          handleSaveChanges={handleSaveChanges}
        />
      )}
      {openSuccessModal && <MyProgressCounted />}
    </div>
  );
}
