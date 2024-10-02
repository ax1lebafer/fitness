import { Link, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar.tsx";
import { appRoutes } from "../lib/appRoutes.ts";

export default function Card() {
  const location = useLocation();
  const pathname = location.pathname;

  const isProfilePage = pathname === "profile";

  return (
    <>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      <meta name="viewport" content="width=375, initial-scale=1" />
      <div className="w-[360px] sm:w-[343px] bg-white rounded-[30px]">
        <div className="relative h-[325px]">
          <img
            className="rounded-[30px] h-[325px] object-cover"
            src="/img/train-1.png"
            alt="Курс"
          />
          <img
            src="/img/icons/add.svg"
            alt="Добавить"
            width={26}
            height={26}
            className="absolute right-6 top-6 cursor-pointer hover:scale-125 transition ease-linear"
          />
        </div>
        <div className="flex px-[30px] py-5 flex-col gap-5">
          <Link
            className="hover:underline text-3xl font-medium leading-none text-left"
            to={appRoutes.COURSES}
          >
            Йога
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
              <img
                src="/img/icons/clock.svg"
                alt="Часы"
                width={15}
                height={15}
              />
              <p className="text-[16px]">20-50 мин/день</p>
            </div>
            <div className="bg-[#F7F7F7] p-[10px] rounded-[50px] flex gap-1.5">
              <img
                src="/img/icons/level.svg"
                alt="Часы"
                width={15}
                height={15}
              />
              <p className="text-[16px]">Сложность</p>
            </div>
          </div>
          {isProfilePage && <ProgressBar />}
        </div>
      </div>
    </>
  );
}
