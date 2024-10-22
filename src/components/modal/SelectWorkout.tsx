import { useNavigate } from "react-router-dom";
import ButtonLink from "../ui/ButtonLink.tsx";
import { useState } from "react";
import { WorkoutType } from "../../types/workouts.ts";

type SelectWorkoutProps = {
  closeModal: () => void;
  workouts: WorkoutType[];
};

export default function SelectWorkout({
  closeModal,
  workouts,
}: SelectWorkoutProps) {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

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
    <div className="fixed inset-0 flex items-center justify-center z-50 pl-4 pr-4">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      <div className="p-10 bg-white xl:w-[460px] xl:h-[610px] rounded-[30px] w-full z-10">
        <p className="text-[32px] xl:text-center text-left xl:mb-12 mb-[34px]">
          Выберите тренировку
        </p>
        <ul className="overflow-auto xl:h-[360px]">
          {workouts.length === 0 && <p>Нет доступных тренировок</p>}

          {workouts.map((workout) => {
            const isWorkoutDone =
              Array.isArray(workout.exercises) &&
              workout.exercises.every((exercise) => exercise.isDone);

            return (
              <li
                key={workout._id}
                className={`flex gap-5 items-center border-b xl:w-[370px] cursor-pointer ${
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
                  <p className="xl:text-[20px] text-[18px] pt-2.5 pb-2.5 leading-none text-left">
                    {workout.name}
                  </p>
                </div>
              </li>
            );
          })}
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
