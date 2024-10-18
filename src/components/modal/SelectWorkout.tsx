import { useNavigate } from "react-router-dom";
import ButtonLink from "../ui/ButtonLink.tsx";
import { useEffect, useState } from "react";
import { fetchWorkoutsOfUserCourse } from "../../api/data.ts";
import { useUser } from "../../hooks/useUser.ts";
import { useWorkouts } from "../../hooks/useWorkouts.ts";

type SelectWorkoutProps = {
  closeModal: () => void;
  courseId: string;
};

export default function SelectWorkout({
  closeModal,
  courseId,
}: SelectWorkoutProps) {
  const { user } = useUser();
  const {
    workouts,
    isWorkoutsLoading,
    workoutsError,
    setWorkouts,
    setIsWorkoutsLoading,
    setWorkoutsError,
  } = useWorkouts();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  const userId = user?.uid;

  useEffect(() => {
    const getWorkoutsOfUser = async () => {
      try {
        setIsWorkoutsLoading(false);
        setWorkoutsError(null);
        if (userId) {
          setIsWorkoutsLoading(true);
          const response = await fetchWorkoutsOfUserCourse(userId, courseId);
          setWorkouts(response);
        }
      } catch (error) {
        if (error instanceof Error) {
          setWorkoutsError(error.message);
        } else {
          setWorkoutsError("Неизвестная ошибка");
        }
      } finally {
        setIsWorkoutsLoading(false);
      }
    };

    getWorkoutsOfUser();
  }, [userId, courseId, setWorkouts, setWorkoutsError, setIsWorkoutsLoading]);

  const handleWorkoutClick = (workoutId: string) => {
    setSelectedWorkoutId(workoutId);
  };

  const handleStartClick = () => {
    if (selectedWorkoutId) {
      navigate(`/training/${selectedWorkoutId}`);
    } else {
      alert("Пожалуйста, выберите тренировку");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      <div className="p-10 bg-white w-[460px] h-[610px] rounded-[30px] z-10">
        <p className="text-[32px] text-center mb-12">Выберите тренировку</p>
        <ul className="overflow-auto h-[360px]">
          {workoutsError && <p>{workoutsError}</p>}

          {isWorkoutsLoading && <p>Загрузка...</p>}

          {!isWorkoutsLoading && !workoutsError && (
            <>
              {workouts.map((workout) => {
                const isWorkoutDone =
                  Array.isArray(workout.exercises) &&
                  workout.exercises.every((exercise) => exercise.isDone);

                return (
                  <li
                    key={workout._id}
                    className={`flex gap-5 items-center border-b w-[370px] cursor-pointer ${
                      selectedWorkoutId === workout._id
                        ? "bg-gray-200 rounded-2xl"
                        : ""
                    }`}
                    onClick={() => handleWorkoutClick(workout._id)}
                  >
                    {isWorkoutDone ? (
                      <img
                        src="/img/icons/checked.svg"
                        alt="Выполнено"
                        className="w-5 h-5"
                      />
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-black"></span>
                    )}

                    <div className="flex flex-col gap-2.5 w-[330px]">
                      <p className="text-[20px] pt-2.5 pb-2.5 leading-none text-left">
                        {workout.name}
                      </p>
                    </div>
                  </li>
                );
              })}
            </>
          )}
        </ul>
        <ButtonLink
          text="Начать"
          className="w-full text-[18px] mt-2.5"
          onClick={handleStartClick}
          disabled={!selectedWorkoutId}
        />
      </div>
    </div>
  );
}
