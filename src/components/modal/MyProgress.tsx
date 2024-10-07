
import { appRoutes } from "../../lib/appRoutes";
import { ExerciseType } from "../../types/exerciseType";
import { Dispatch, SetStateAction } from "react";
import { InputProgressForm } from "../inputProgressForm";
import ButtonLink from "../ui/ButtonLink";
import { useLocation, useNavigate } from "react-router-dom";



export default function MyProgress({
  exercises,
  setExercises,
  handleSaveChanges,
  modalRef,
  isOpen,
}: {
  exercises: ExerciseType[] | null;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  setExercises: Dispatch<SetStateAction<ExerciseType[]>>;
  handleSaveChanges: () => void;
  isOpen: boolean;
}) {
  //Это надо добавить на страницу тренировки
  //handleSaveChanges = написать функцию по сохранению 
  /* const [isOpen, setIsOpen] = useState(false);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const toggleWorkoutMyProgress = () => {
    setIsOpen((prev) => !prev);
  }; */
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation || {
    pathname: appRoutes.HOME,
  };

  const onClose = () => {
    navigate(backgroundLocation.pathname, { replace: true });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-20"
        onClick={onClose}
      ></div>
      {isOpen ? (
        <div className="fixed top-[calc(50%-(252px/2))] left-[calc(50%-(343px/2))] lg:top-[calc(50%-(278px/2))] lg:left-[calc(50%-(426px/2))]">
          {/* <ModalProgressCounted/> */}
        </div>
      ) : (
        <>
          <div ref={modalRef} className="overflow-x-hidden">
            <h3 className="font-skyeng text-[32px] text-black mb-12">
              Мой прогресс
            </h3>
            <div className="w-[237px] lg:w-[320px] max-h-[350px]  mb-[34px]">
              {exercises?.map((exercise, i) => {
                return (
                  <InputProgressForm
                    key={i}
                    exerciseName={exercise.name}
                    id={String(exercise)}
                    value={exercise.progressWorkout}
                    onChange={(e) =>
                      setExercises((prev: ExerciseType[]) =>
                        prev.map((item) =>
                          item.name === exercise.name
                            ? {
                                ...item,
                                progressWorkout: Number(e.target.value),
                              }
                            : item,
                        ),
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
          <ButtonLink text={"Сохранить"} onClick={handleSaveChanges} />
        </>
      )}
    </div>
  );
}
