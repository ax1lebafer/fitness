import { Link } from "react-router-dom";
import ButtonLink from "../ui/ButtonLink.tsx";
import { useEffect } from "react";
import { fetchWorkoutsOfUserCourse } from "../../api/data.ts";
import { useUser } from "../../hooks/useUser.ts";
import { useWorkouts } from "../../hooks/useWorkouts.ts";

type SelectWorkoutProps = {
  closeModal: () => void;
  courseId: string;
};

export default function SelectWorkout({
  closeModal,
  courseId,
}: SelectWorkoutProps) {
  const { user } = useUser();
  const {
    workouts,
    isWorkoutsLoading,
    workoutsError,
    setWorkouts,
    setIsWorkoutsLoading,
    setWorkoutsError,
  } = useWorkouts();

  const userId = user?.uid;

  useEffect(() => {
    const getWorkoutsOfUser = async () => {
      try {
        setIsWorkoutsLoading(false);
        setWorkoutsError(null);
        if (userId) {
          setIsWorkoutsLoading(true);
          const response = await fetchWorkoutsOfUserCourse(userId, courseId);
          setWorkouts(response);
        }
      } catch (error) {
        if (error instanceof Error) {
          setWorkoutsError(error.message);
        } else {
          setWorkoutsError("Неизвестная ошибка");
        }
      } finally {
        setIsWorkoutsLoading(false);
      }
    };

    getWorkoutsOfUser();
  }, [userId, courseId, setWorkouts, setWorkoutsError, setIsWorkoutsLoading]);

  console.log(workouts);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      <div className="p-10 bg-white w-[460px] h-[610px] rounded-[30px] z-10">
        <p className="text-[32px] text-center mb-12">Выберите тренировку</p>
        <ul className="overflow-auto h-[360px]">
          {workoutsError && workoutsError}

          {isWorkoutsLoading && <p>Загрузка</p>}

          {!isWorkoutsLoading && (
            <>
              {workouts.map((workout) => (
                <li
                  key={workout._id}
                  className="flex gap-3 items-center border-b w-[370px]"
                >
                  <img
                    src="/img/icons/checked.svg"
                    alt="Выполнено"
                    className="w-5 h-5"
                  />

                  {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
                  <div className="flex flex-col gap-2.5">
                    <Link
                      to={"/training/" + workout._id}
                      className="text-2xl mt-2.5 leading-none"
                    >
                      {workout.name}
                    </Link>
                    {/*<p className="text-[16px] mb-2">{workout.name}</p>*/}
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
        <ButtonLink text="Начать" className="w-full text-[18px]" />
      </div>
    </div>
  );
}
