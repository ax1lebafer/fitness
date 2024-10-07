import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.tsx";
import ResultTraining from "../components/ResultTraining.tsx";
import { useState } from "react";
import MyProgress from "../components/modal/MyProgress.tsx";
import MyProgressCounted from "../components/modal/MyProgressCounted.tsx";

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
      <h1 className="text-[60px] text-left font-medium">Йога</h1>
      <nav aria-label="breadcrumb">
        <ol className="flex flex-row text-[32px] font-normal pt-6">
          <li>
            <Link to="#">
              <span className="underline">Красота и здоровье</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="underline">Йога на каждый день</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="underline">2 день</span>
            </Link>
          </li>
        </ol>
      </nav>
      <VideoPlayer />
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
