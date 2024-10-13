import { Link } from "react-router-dom";
import ButtonLink from "../ui/ButtonLink.tsx";

export default function SelectWorkout() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="p-10 bg-white w-[460px] h-[610px] rounded-[30px] z-10">
        <p className="text-[32px] text-center mb-12">Выберите тренировку</p>
        <ul className="overflow-auto h-[360px]">
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
          <li className="flex gap-3 items-center border-b w-[370px]">
            <img
              src="/img/icons/checked.svg"
              alt="Выполнено"
              width={20}
              height={20}
            />
            {/*<span className="w-5 h-5 rounded-full border border-black"></span>*/}
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-2xl mt-2.5 leading-none">
                Утренняя практика
              </Link>
              <p className="text-[16px] mb-2">Йога на каждый день / 1 день </p>
            </div>
          </li>
        </ul>
        <ButtonLink text="Начать" className="w-full text-[18px]" />
      </div>
    </div>
  );
}