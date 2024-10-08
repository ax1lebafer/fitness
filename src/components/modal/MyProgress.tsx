import ButtonLink from "../ui/ButtonLink";
import { arrayTrainingProps } from "../../pages/MainTraining";
import { useState } from "react";
import { InputProgressForm } from "../InputProgressForm";

type TypeMyProgressProps = {
  arrayTraining: arrayTrainingProps[];
  handleSaveChanges: () => void;
};

export default function MyProgress({
  arrayTraining,
  handleSaveChanges,
}: TypeMyProgressProps) {
  const [value, setValue] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20 z-20">
      <div
        className="fixed top-[calc(50%-(487px/2))] left-[calc(50%-(343px/2))] lg:top-[calc(50%-(596px/2))] lg:left-[calc(50%-(426px/2))]
       bg-white  rounded-[30px] shadow-def w-[343px] p-[30px] lg:w-[426px] lg:p-10"
      >
        <h3 className="font-skyeng text-[32px] text-black mb-12">
          Мой прогресс
        </h3>
        <div className="overflow-x-hidden [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="w-[237px] lg:w-[320px] max-h-[350px]  mb-[34px]">
            {arrayTraining.map((target, i) => {
              return (
                <InputProgressForm
                  key={i}
                  exerciseName={target.target}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              );
            })}
          </div>
        </div>
        <ButtonLink text={"Сохранить"} onClick={handleSaveChanges} />
      </div>
    </div>
  );
}
