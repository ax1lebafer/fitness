import { useParams } from "react-router-dom";
import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer.tsx";
import ResultTraining from "../components/ResultTraining.tsx";
import MyProgress from "../components/modal/MyProgress.tsx";
import MyProgressCounted from "../components/modal/MyProgressCounted.tsx";
import { useWorkouts } from "../hooks/useWorkouts.ts";

export type arrayTrainingProps = {
  target: string;
  result: number;
};

const arrayTraining: arrayTrainingProps[] = [
  {
    target: "Наклоны вперед",
    result: 0,
  },
  {
    target: "Наклоны назад",
    result: 10,
  },
  {
    target: "Поднятие ног, согнутых в коленях",
    result: 0,
  },
  {
    target: "Наклоны вперед",
    result: 0,
  },
  {
    target: "Наклоны назад",
    result: 10,
  },
  {
    target: "Поднятие ног, согнутых в коленях",
    result: 0,
  },
  {
    target: "Наклоны вперед",
    result: 0,
  },
  {
    target: "Наклоны назад",
    result: 10,
  },
  {
    target: "Поднятие ног, согнутых в коленях",
    result: 0,
  },
];
export default function MainTraining() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isOpenMyProgressModal, setIsOpenMyProgressModal] = useState(false);

  const { workouts } = useWorkouts();
  const { id } = useParams();

  const workout = workouts.find((w) => w._id === id);

  const toggleWorkoutMyProgress = () => {
    setIsOpenMyProgressModal(true);
  };

  function handleSaveChanges() {
    setIsOpenMyProgressModal(false);
    setOpenSuccessModal(true);
    setTimeout(() => setOpenSuccessModal(false), 2000);
  }

  return (
    <div className="mb-[201px]">
      <h1 className="sm:text-[48px] md:text-[60px] text-[24px] text-left font-medium">
        Йога
      </h1>
      <div>
        <p className="xl:text-[32px] text-left xl:underline pt-6 text-[18px]">
          {workout?.name}
        </p>
      </div>
      <VideoPlayer src={workout?.video} />
      <ResultTraining
        arrayTraining={arrayTraining}
        toggleWorkoutMyProgress={toggleWorkoutMyProgress}
      />
      {isOpenMyProgressModal && (
        <MyProgress
          arrayTraining={arrayTraining}
          handleSaveChanges={handleSaveChanges}
        />
      )}
      {openSuccessModal && <MyProgressCounted />}
    </div>
  );
}
