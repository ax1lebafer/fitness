import TargetList from "./TargetList.tsx";
import ButtonLink from "./ui/ButtonLink.tsx";
import { arrayTrainingProps } from "../pages/MainTraining.tsx";

type ResultTrainingProps = {
  arrayTraining: arrayTrainingProps[],
  toggleWorkoutMyProgress: () => void,
}

export default function ResultTraining({arrayTraining, toggleWorkoutMyProgress}: ResultTrainingProps) {


  return (
    <div className="w-[100%] rounded-[30px] overflow-hidden mt-[40px] p-10 bg-white">
      <div>
        <h2 className="text-[32px] text-left">Упражнения тренировки 2</h2>
        <TargetList targetList={arrayTraining} />
        <ButtonLink
          text={"Заполнить свой прогресс"}
          className="w-[320px] mt-[20px] flex justify-center"
          onClick={toggleWorkoutMyProgress}
        />
      </div>
    </div>
  );
}
