import { useParams } from "react-router-dom";
import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer.tsx";
import ResultTraining from "../components/ResultTraining.tsx";
import MyProgress from "../components/modal/MyProgress.tsx";
import MyProgressCounted from "../components/modal/MyProgressCounted.tsx";
import { useWorkouts } from "../hooks/useWorkouts.ts";
import useCourses from "../hooks/useCourses.ts";

export default function MainTraining() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isOpenMyProgressModal, setIsOpenMyProgressModal] = useState(false);

  const { workouts } = useWorkouts();
  const { courses } = useCourses();
  const { id } = useParams();

  const workout = workouts.find((w) => w._id === id);
  const course = courses.find((course) => course.workouts.includes(id!));
  const courseTitle = course ? course.nameRU : "Название курса не найдено";

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
        {courseTitle}
      </h1>
      <div>
        <p className="xl:text-[32px] text-left xl:underline pt-6 text-[18px]">
          {workout?.name}
        </p>
      </div>
      <VideoPlayer src={workout?.video} />
      <ResultTraining
        exercises={workout?.exercises}
        toggleWorkoutMyProgress={toggleWorkoutMyProgress}
      />
      {isOpenMyProgressModal && (
        <MyProgress
          exercises={workout?.exercises}
          handleSaveChanges={handleSaveChanges}
        />
      )}
      {openSuccessModal && <MyProgressCounted />}
    </div>
  );
}
