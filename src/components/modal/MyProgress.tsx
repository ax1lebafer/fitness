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
        <div className="overflow-x-hidden ">
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
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              );
            })}
            <ButtonLink text={"Сохранить"} onClick={handleSaveChanges} />
          </div>
        </div>
      </div>
    </div>
  );
}
