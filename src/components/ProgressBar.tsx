import ButtonLink from "./ui/ButtonLink.tsx";
import { useState } from "react";
import SelectWorkout from "./modal/SelectWorkout.tsx";
import { WorkoutType } from "../types/workouts.ts";

type ProgressBarProps = {
  workouts: WorkoutType[];
  progress: number;
};

export default function ProgressBar({ workouts, progress }: ProgressBarProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <p className="text-[18px] mb-2.5">Прогресс {progress}%</p>
      <progress
        className="w-full h-1.5 text-left"
        value={progress}
        max={100}
      ></progress>
      <ButtonLink
        text="Продолжить"
        className="w-full mt-[10px]"
        onClick={() => setIsOpenModal(true)}
      />
      {isOpenModal && (
        <SelectWorkout
          closeModal={() => setIsOpenModal(false)}
          workouts={workouts}
        />
      )}
    </div>
  );
}
