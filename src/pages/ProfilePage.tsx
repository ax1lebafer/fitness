import { useLocation } from "react-router-dom";
import ButtonLink from "../components/ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useUser } from "../hooks/useUser.ts";
import MyCourses from "../components/MyCourses.tsx";
import { useState } from "react";
import UpdatePassword from "../components/modal/UpdatePassword.tsx";

export default function ProfilePage() {
  const { user, setIsProfile } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation || location;
  console.log(
    "Profile BackgroundLocation.pathname: ",
    backgroundLocation.pathname,
  );
  if (backgroundLocation.pathname === "/profile") {
    setIsProfile(true);
  }

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <main>
      {openModal && <UpdatePassword closeModal={closeModal} />}
      <div className="w-[343px] xl:w-auto mx-[calc((100%-343px)/2)] xl:mx-0">
        <div className="h-[50px] xl:h-[84px]">
          <h2 className="xl:text-[40px] text-[24px] font-semibold leading-[110%] text-left">
            Профиль
          </h2>
        </div>

        <section className="bg-[#FFFFFF] rounded-[30px] p-[30px] mt-10">
          <div>
            <div className="relative xl:w-[197px] w-[141px] xl:h-[197px] h-[141px] xl:mx-[0px] mx-[80px]">
              <img
                src="/img/avatar-big.svg"
                alt="Фото профиля"
                // width={197}
                // height={197}
              />
            </div>
            <div className="flex flex-col xl:gap-[20px] gap-[13px] mt-0 xl:mt-[22px] ml-0 xl:ml-[19px]">
              <div className="xl:text-[32px] text-[24px] font-bold text-left">
                {user?.name}
              </div>
              <div className="flex flex-col gap-[2px] text-left">
                <p className="text-[18px]">Логин: {user?.email}</p>
                <p className="text-[18px]">Пароль: ***********</p>
              </div>
              <div className="flex flex-col align-center xl:flex-row gap-y-[10px] xl:gap-x-[10px]">
                <ButtonLink
                  className="h-[50px] xl:h-[52px] px-[26px] py-[16px] w-[283px] xl:w-[192px]"
                  text={"Изменить пароль"}
                  onClick={() => setOpenModal(true)}
                />
                <ButtonLink
                  className="h-[50px] xl:h-[52px] w-[283px] xl:w-[192px] pt-[12px] border border-black bg-white text-[#000000] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                  text={"Выйти"}
                  to={appRoutes.HOME}
                />
              </div>
            </div>
          </div>
        </section>
        <MyCourses />
      </div>
    </main>
  );
}