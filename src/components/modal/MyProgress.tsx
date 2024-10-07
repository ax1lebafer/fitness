import ButtonLink from "../ui/ButtonLink";
import { arrayTrainingProps } from "../../pages/MainTraining";
import { useState } from "react";
import { InputProgressForm } from "../inputProgressForm";

type TypeMyProgressProps = {
  arrayTraining: arrayTrainingProps[];
  handleSaveChanges: () => void;
};

export default function MyProgress({
  arrayTraining,
  handleSaveChanges,
}: TypeMyProgressProps) {
  

  const [value, setValue] = useState("")

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="fixed inset-0 bg-black opacity-20"
        /* onClick={onClose} */
      ></div>
      <div className="overflow-x-hidden bg-white z-20">
        <h3 className="font-skyeng text-[32px] text-black mb-12">
          Мой прогресс
        </h3>
        <div className="w-[237px] lg:w-[320px] max-h-[350px]  mb-[34px]">
          {arrayTraining.map((target, i) => {
            return (
              <InputProgressForm
                key={i}
                exerciseName={target.target}
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
              />
            );
          })}
          <ButtonLink text={"Сохранить"} onClick={handleSaveChanges} />
        </div> 
      </div>
    </div>
  );
}
