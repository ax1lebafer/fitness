import { Link, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar.tsx";

type CardProps = {
  name: string;
  id: string;
};

export default function Card({ name, id }: CardProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isProfilePage = pathname === "/profile";

  return (
    <div className="w-[360px] bg-white rounded-[30px]">
      <div className="relative h-[325px]">
        <img
          className="rounded-[30px] h-[325px] w-[360px] object-cover"
          src={`/img/${id}.png`}
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
