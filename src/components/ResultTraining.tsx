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
  return (
    // <div className="w-[100%] rounded-[30px] overflow-hidden mt-[40px] p-10 bg-white">
    <div className="w-[100%] rounded-[30px] overflow-hidden mt-[24px] xl:mt-[40px] bg-white">
      <div className="xl:m-[40px] m-[30px]">
        <h2 className="text-[32px] text-left">Упражнения тренировки 2</h2>
        <TargetList exercises={exercises} />
        <ButtonLink
          text={"Заполнить свой прогресс"}
          className="w-[283px] xl:w-[320px] h-[52px] pt-[16px] mt-[20px] flex justify-center"
          onClick={toggleWorkoutMyProgress}
        />
      </div>
    </div>
  );
}
