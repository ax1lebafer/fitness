import { Link, useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar.tsx";
import {
  fetchAddCourseToUser,
  fetchCoursesOfUser,
  fetchRemoveCourseFromUser,
} from "../api/data.ts";
import useCourses from "../hooks/useCourses.ts";
import { useUser } from "../hooks/useUser.ts";
import { appRoutes } from "../lib/appRoutes.ts";
import { useState } from "react";
import AddingRemovingDone from "../components/modal/AddingRemovingDone.tsx";

type CardProps = {
  name: string;
  id: string;
};

let messageProc = "";

export default function Card({ name, id }: CardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { isEntering, user } = useUser();
  const { selectedCourses, setSelectedCourses } = useCourses();

  const [isOpenProcessModal, setOpenProcessModal] = useState(false);
  function handleViewChanges() {
    setOpenProcessModal(true);
    setTimeout(() => {
      setOpenProcessModal(false);
    }, 2000);
  }

  const isProfilePage = pathname === "/profile";
  let isSelected = Boolean(
    selectedCourses ? selectedCourses?.find((el) => el._id === id) : null,
  );
  const openSignInModal = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation: location } });
  };

  const userId = user?.uid;

  const addCourse = async () => {
    if (isEntering && userId) {
      await fetchAddCourseToUser(userId, id);
      // const updatedCourses = [...selectedCourses, { id, name }];
      // setSelectedCourses(updatedCourses);
      const data = await fetchCoursesOfUser(userId);
      setSelectedCourses(data);
      messageProc = `Курс "${name}" добавлен`;
      handleViewChanges();
    } else {
      openSignInModal();
    }
    isSelected = Boolean(
      selectedCourses && isEntering
        ? selectedCourses?.find((el) => el._id === id)
        : null,
    );
  };

  const delCourse = async () => {
    if (userId) {
      try {
        await fetchRemoveCourseFromUser(userId, id);
        // const updatedCourses = selectedCourses.filter(
        //   (course) => course._id !== id,
        // );
        // setSelectedCourses(updatedCourses);
        const data = await fetchCoursesOfUser(userId);
        setSelectedCourses(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          alert(error.message);
        }
      }
    } else {
      console.error("Пользователь не авторизован");
    }
  };

  return (
    <div className="mx-[calc((100%-343px)/2)] xl:mx-0 w-[343px] xl:w-[360px] items-center bg-white rounded-[30px]">
      <div className="relative h-[325px]">
        <Link to={`/courses/${id}`}>
          <img
            className="rounded-[30px] h-[325px] w-[343px] xl:w-[360px] object-cover"
            src={`/img/${id}.png`}
            alt="Курс"
          />
        </Link>
        {!isProfilePage ? (
          isSelected ? (
            <img
              src="/img/icons/checked.svg"
              alt="Добавлен"
              title="Курс добавлен"
              width={26}
              height={26}
              className="absolute right-6 top-6 cursor-default hover:scale-125 transition ease-linear"
            />
          ) : (
            <button onClick={() => addCourse()} type="button">
              <img
                src="/img/icons/add.svg"
                alt="Добавить"
                title="Добавить курс"
                width={26}
                height={26}
                className="absolute right-6 top-6 cursor-pointer hover:scale-125 transition ease-linear"
              />
            </button>
          )
        ) : (
          <button onClick={() => delCourse()} type="button">
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
      {isOpenProcessModal && <AddingRemovingDone mess={messageProc} />}
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
