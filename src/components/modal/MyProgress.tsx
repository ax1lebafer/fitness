import ButtonLink from "../ui/ButtonLink";
import { useState } from "react";
import InputProgressForm from "../InputProgressForm.tsx";
import { ExerciseType } from "../../types/exercises.ts";
import { useUser } from "../../hooks/useUser.ts";
import { updateExerciseProgressByIndex } from "../../api/data.ts";

type TypeMyProgressProps = {
  exercises: ExerciseType[];
  handleSaveChanges: () => void;
  courseId: string;
  workoutId: string;
};

export default function MyProgress({
  exercises,
  handleSaveChanges,
  courseId,
  workoutId,
}: TypeMyProgressProps) {
  const { user } = useUser();
  const userId = user?.uid;

  const [progressValues, setProgressValues] = useState<{
    [index: number]: number;
  }>(() => {
    const initialProgressValues: { [index: number]: number } = {};
    exercises.forEach((exercise, index) => {
      initialProgressValues[index] = exercise.progress || 0;
    });
    return initialProgressValues;
  });

  const handleInputChange = (index: number, value: number) => {
    setProgressValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const handleSave = async () => {
    if (!userId) {
      alert("Пользователь не авторизован");
      return;
    }

    try {
      const promises = Object.keys(progressValues).map(async (key) => {
        const index = parseInt(key);
        const exercise = exercises[index];
        const newProgress = progressValues[index];
        const quantity = exercise.quantity;

        let isDone = false;

        if (quantity > 0) {
          isDone = newProgress >= quantity;
        }

        await updateExerciseProgressByIndex(
          userId,
          courseId,
          workoutId,
          index,
          newProgress,
          isDone,
        );
      });

      await Promise.all(promises);

      handleSaveChanges();
    } catch (error) {
      console.error("Ошибка при обновлении прогресса:", error);
      alert("Не удалось обновить прогресс. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20 z-20">
      <div
        className="fixed top-[calc(50%-(487px/2))] left-[calc(50%-(343px/2))] lg:top-[calc(50%-(596px/2))] lg:left-[calc(50%-(426px/2))]
       bg-white  rounded-[30px] shadow-def w-[343px] p-[30px] lg:w-[426px] lg:p-10"
      >
        <h3 className="text-[32px] text-black mb-12 text-left">Мой прогресс</h3>
        <div className="max-h-[350px] overflow-x-hidden [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="w-[237px] lg:w-[320px] mb-[34px]">
            {exercises.map((exercise, i) => {
              return (
                <InputProgressForm
                  key={i}
                  exerciseName={exercise.name}
                  value={progressValues[i]}
                  maxValue={exercise.quantity}
                  onChange={(e) => handleInputChange(i, Number(e.target.value))}
                />
              );
            })}
          </div>
        </div>
        <ButtonLink
          className="w-full mt-8"
          text={"Сохранить"}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
