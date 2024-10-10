import { Link, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar.tsx";
import {
  fetchAddCourseToUser,
  fetchCoursesOfUser,
  fetchRemoveCourseFromUser,
} from "../api/data.ts";
import { useEffect } from "react";
import useCourses from "../hooks/useCourses.ts";
import { useUser } from "../hooks/useUser.ts";

type CardProps = {
  name: string;
  id: string;
};

export default function Card({ name, id }: CardProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useUser();
  const { setSelectedCourses, setError, setLoading, setSelectedLoading } = useCourses();

  const isProfilePage = pathname === "/profile";

   const addCourse = () => {
    console.log("StartBanner. courseId: ", id);
    console.log("StartBanner. uid: ", user?.uid);
    fetchAddCourseToUser(user?.uid, id);
  };
  
  const delCourse = () => {
    console.log("Profile. courseId: ", id);
    console.log("Profile. uid: ", user?.uid);
    fetchRemoveCourseFromUser(user?.uid, id);
  };

  useEffect(() => {
    async function getSelectedCourses() {
      try {
        const data = await fetchCoursesOfUser(user?.uid);
        setSelectedLoading(true);
        setSelectedCourses(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setError("Неизвестная ошибка");
        console.log(error);
      } finally {
        setSelectedLoading(false);
      }
    }
    getSelectedCourses();
  }, [setError, setSelectedLoading, setSelectedCourses, user?.uid, id]);

  return (
    // <div className="mx-[16px] xl:mx-0 w-[343px] xl:w-[360px] content-center items-center bg-white rounded-[30px]">
    <div className="mx-[calc((100%-343px)/2)] xl:mx-0 w-[343px] xl:w-[360px] content-center items-center bg-white rounded-[30px]">
      <div className="relative h-[325px]">
        <img
          className="rounded-[30px] h-[325px] w-[360px] object-cover"
          src={`/img/${id}.png`}
          alt="Курс"
        />
        {!isProfilePage ? (
          <button
            onClick={() => addCourse()}
            // className="w-[15px] h-[35px] xl:h-[50px] bg-[#e5e5e5] cursor-point inline-block"
            type="button"
          >
            <img
              src="/img/icons/add.svg"
              alt="Добавить"
              title="Добавить курс"
              width={26}
              height={26}
              className="absolute right-6 top-6 cursor-pointer hover:scale-125 transition ease-linear"
            />
          </button>
        ) : (
          <button
            onClick={() => delCourse()}
            // className="w-[15px] h-[35px] xl:h-[50px] bg-[#e5e5e5] cursor-point inline-block"
            type="button"
          >
            <img
              src="/img/icons/sub.svg"
              alt="Удалить"
              title="Удалить курс"
              width={26}
              height={26}
              className="absolute right-6 top-6 cursor-pointer hover:scale-125 transition ease-linear"
            />
          </button>
        )}
      </div>
      <div className="flex px-[30px] py-5 flex-col gap-5">
        <Link
          className="hover:underline text-2xl xl:text-3xl font-medium leading-none text-left"
          to={`/courses/${id}`}
        >
          {name}
        </Link>
        <div className="flex gap-1.5 flex-wrap">
          <div className="bg-[#F7F7F7] p-[10px] rounded-[50px] flex gap-1.5">
            <img
              src="/img/icons/calendar.svg"
              alt="Календарь"
              width={15}
              height={15}
            />
            <p className="text-[16px]">25 дней</p>
          </div>
          <div className="bg-[#F7F7F7] p-[10px] rounded-[50px] flex gap-1.5">
            <img src="/img/icons/clock.svg" alt="Часы" width={15} height={15} />
            <p className="text-[16px]">20-50 мин/день</p>
          </div>
          <div className="bg-[#F7F7F7] p-[10px] rounded-[50px] flex gap-1.5">
            <img src="/img/icons/level.svg" alt="Часы" width={15} height={15} />
            <p className="text-[16px]">Сложность</p>
          </div>
        </div>
        {isProfilePage && <ProgressBar />}
      </div>
    </div>
  );
}
