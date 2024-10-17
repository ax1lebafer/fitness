import ButtonLink from "./ui/ButtonLink.tsx";
import { useState } from "react";
import SelectWorkout from "./modal/SelectWorkout.tsx";

export default function ProgressBar() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <p className="text-[18px] mb-2.5">Прогресс 40%</p>
      <progress
        className="w-full h-1.5 text-left"
        value={40}
        max={100}
      ></progress>
      <ButtonLink
        text="Продолжить"
        className="w-full mt-[10px]"
        onClick={() => setIsOpenModal(true)}
      />
      {isOpenModal && (
        <SelectWorkout closeModal={() => setIsOpenModal(false)} />
      )}
    </div>
  );
}
