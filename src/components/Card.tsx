import { Link, useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar.tsx";
import {
  fetchAddCourseToUser,
  fetchCoursesOfUser,
  fetchRemoveCourseFromUser,
  fetchWorkoutsOfUserCourse,
} from "../api/data.ts";
import useCourses from "../hooks/useCourses.ts";
import { useUser } from "../hooks/useUser.ts";
import { appRoutes } from "../lib/appRoutes.ts";
import { useEffect, useState } from "react";
import AddingDone from "./modal/AddingDone.tsx";
import { WorkoutType } from "../types/workouts.ts";

type CardProps = {
  name: string;
  courseId: string;
};

let messageProc = "";

export default function Card({ name, courseId }: CardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const { isEntering, user } = useUser();
  const { selectedCourses, setSelectedCourses } = useCourses();

  const [isOpenProcessModal, setOpenProcessModal] = useState(false);
  const [courseWorkouts, setCourseWorkouts] = useState<WorkoutType[]>([]);
  const [courseProgress, setCourseProgress] = useState<number>(0);

  const userId = user?.uid;

  const isProfilePage = pathname === "/profile";
  let isSelected = Boolean(
    selectedCourses ? selectedCourses?.find((el) => el._id === courseId) : null,
  );

  function handleViewChanges() {
    setOpenProcessModal(true);
    setTimeout(() => {
      setOpenProcessModal(false);
    }, 2000);
  }

  const openSignInModal = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation: location } });
  };

  const addCourse = async () => {
    if (isEntering && userId) {
      await fetchAddCourseToUser(userId, courseId);
      const data = await fetchCoursesOfUser(userId);
      setSelectedCourses(data);
      messageProc = `Курс "${name}" добавлен`;
      handleViewChanges();
    } else {
      openSignInModal();
    }
    isSelected = Boolean(
      selectedCourses && isEntering
        ? selectedCourses?.find((el) => el._id === courseId)
        : null,
    );
  };

  const delCourse = async () => {
    if (userId) {
      try {
        await fetchRemoveCourseFromUser(userId, courseId);
        const data = await fetchCoursesOfUser(userId);
        setSelectedCourses(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          alert(error.message);
        }
      }
    } else {
      console.error("Пользователь не авторизован");
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (userId && isProfilePage) {
        try {
          const workouts = await fetchWorkoutsOfUserCourse(userId, courseId);
          setCourseWorkouts(workouts);

          if (workouts.length > 0) {
            let totalExercises = 0;
            let completedExercises = 0;

            workouts.forEach((workout) => {
              if (workout.exercises && workout.exercises.length > 0) {
                workout.exercises.forEach((exercise) => {
                  totalExercises += 1;
                  if (
                    exercise.isDone ||
                    (exercise.progress && exercise.progress >= 100)
                  ) {
                    completedExercises += 1;
                  }
                });
              }
            });

            const progressPercentage = totalExercises
              ? Math.round((completedExercises / totalExercises) * 100)
              : 0;

            setCourseProgress(progressPercentage);
          } else {
            setCourseProgress(0);
          }
        } catch (error) {
          console.error("Ошибка при загрузке тренировок:", error);
        }
      }
    };

    fetchWorkouts();
  }, [userId, courseId, isProfilePage]);

  return (
    <div className="mx-[calc((100%-343px)/2)] xl:mx-0 w-[343px] xl:w-[360px] items-center bg-white rounded-[30px]">
      <div className="relative h-[325px]">
        <Link to={`/courses/${courseId}`}>
          <img
            className="rounded-[30px] h-[325px] w-[343px] xl:w-[360px] object-cover"
            src={`/img/${courseId}.png`}
            alt="Курс"
          />
        </Link>
        {!isProfilePage ? (
          isSelected ? (
            <img
              src="/img/icons/checked.svg"
              alt="Добавлен"
              title="Курс добавлен"
              width={26}
              height={26}
              className="absolute right-6 top-6 cursor-default hover:scale-125 transition ease-linear"
            />
          ) : (
            <button onClick={() => addCourse()} type="button">
              <img
                src="/img/icons/add.svg"
                alt="Добавить"
                title="Добавить курс"
                width={26}
                height={26}
                className="absolute right-6 top-6 cursor-pointer hover:scale-125 transition ease-linear"
              />
            </button>
          )
        ) : (
          <button onClick={() => delCourse()} type="button">
            <img
              src="/img/icons/sub.svg"
              alt="Удалить"
              title="Удалить курс"
              width={26}
              height={26}
              className="absolute right-6 top-6 cursor-pointer hover:scale-125 transition ease-linear"
            />
          </button>
        )}
      </div>
      {isOpenProcessModal && <AddingDone mess={messageProc} />}
      <div className="flex px-[30px] py-5 flex-col gap-5">
        <Link
          className="hover:underline text-2xl xl:text-3xl font-medium leading-none text-left"
          to={`/courses/${courseId}`}
        >
          {name}
        </Link>
        <div className="flex gap-1.5 flex-wrap">
          <div className="bg-[#F7F7F7] p-[10px] rounded-[50px] flex gap-1.5">
            <img
              src="/img/icons/calendar.svg"
              alt="Календарь"
              width={15}
              height={15}
            />
            <p className="text-[16px]">25 дней</p>
          </div>
          <div className="bg-[#F7F7F7] p-[10px] rounded-[50px] flex gap-1.5">
            <img src="/img/icons/clock.svg" alt="Часы" width={15} height={15} />
            <p className="text-[16px]">20-50 мин/день</p>
          </div>
          <div className="bg-[#F7F7F7] p-[10px] rounded-[50px] flex gap-1.5">
            <img src="/img/icons/level.svg" alt="Часы" width={15} height={15} />
            <p className="text-[16px]">Сложность</p>
          </div>
        </div>
        {isProfilePage && (
          <ProgressBar workouts={courseWorkouts} progress={courseProgress} />
        )}
      </div>
    </div>
  );
}
