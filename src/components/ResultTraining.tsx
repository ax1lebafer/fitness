import TargetList from "./TargetList.tsx";
import ButtonLink from "./ui/ButtonLink.tsx";
import { ExerciseType } from "../types/exercises.ts";

type ResultTrainingProps = {
  exercises: ExerciseType[];
  toggleWorkoutMyProgress: () => void;
};

export default function ResultTraining({
  exercises,
  toggleWorkoutMyProgress,
}: ResultTrainingProps) {
  const progressGreaterZero = exercises.some((e) => e.progress > 0);

  return (
    <div className="w-[100%] rounded-[30px] overflow-hidden mt-[40px] p-10 bg-white">
      <div>
        <h2 className="text-[32px] text-left">Упражнения тренировки 2</h2>
        <TargetList exercises={exercises} />
        <ButtonLink
          text={
            progressGreaterZero
              ? "Обновить свой прогресс"
              : "Заполнить свой прогресс"
          }
          className="w-[320px] mt-[20px] flex justify-center"
          onClick={toggleWorkoutMyProgress}
        />
      </div>
    </div>
  );
}
