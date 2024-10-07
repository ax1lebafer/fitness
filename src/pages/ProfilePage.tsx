import ButtonLink from "../components/ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useUser } from "../hooks/useUser.ts";
import MyCourses from "../components/MyCourses.tsx";
import { useState } from "react";
import UpdatePassword from "../components/modal/UpdatePassword.tsx";

export default function ProfilePage() {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <main>
      {openModal && <UpdatePassword closeModal={closeModal} />}
      <h2 className="text-left font-semibold text-[40px]">Профиль</h2>

      <section className="bg-[#FFFFFF] rounded-[30px] sm:px-[30px] px-[10px] py-[30px] mt-10">
        <div className="flex flex-wrap flex-row sm:space-x-[33px]">
          <div className="relative sm:w-[197px] w-[141px] sm:h-[197px] h-[141px] sm:mx-[0px] mx-[90px]">
            <img
              src="/img/avatar-big.svg"
              alt="Фото профиля"
              width={197}
              height={197}
            />
          </div>
          <div className="flex flex-col sm:gap-[20px] gap-[13px] sm:mt-0 mt-[22px] sm:ml-0 ml-[19px]">
            <div className="sm:text-[32px] text-[24px] font-bold text-left">
              {user?.name}
            </div>
            <div className="flex flex-col gap-[2px] text-left">
              <p className="text-[18px]">Логин: {user?.email}</p>
              <p className="text-[18px]">Пароль: ***********</p>
            </div>
            <div className="flex flex-wrap flex-col align-center md:flex-row gap-[15px]">
              <ButtonLink
                className="h-[52px]"
                text={"Изменить пароль"}
                onClick={() => setOpenModal(true)}
              />
              <ButtonLink
                className="w-[192px] h-[52px] border border-black bg-white text-[#000000] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                text={"Выйти"}
                to={appRoutes.HOME}
              />
            </div>
          </div>
        </div>
      </section>

      <MyCourses />
    </main>
  );
}
