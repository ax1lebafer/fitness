import { useLocation, useNavigate } from "react-router-dom";
import ButtonLink from "../components/ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useUser } from "../hooks/useUser.ts";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setIsProfile } = useUser();

  const backgroundLocation = location.state?.backgroundLocation || location;
  console.log(
    "Profile BackgroundLocation.pathname: ",
    backgroundLocation.pathname,
  );
  if (backgroundLocation.pathname === "/profile") {
    setIsProfile(true);
  }

  const openUpdatePasswordModal = () => {
    navigate(appRoutes.UPDATE_PASSWORD, {
      state: { backgroundLocation: location },
    });
  };

  let UserName;
  let UserEmail;

  if (user) {
    UserName = user.name;
    UserEmail = user.email;
  }

  return (
    <>
      {/* <meta name="viewport" content="width=375, initial-scale=1" /> */}
      {/* <div className="w-[343px] xl:w-auto ml-[32px] xl:ml-0"> */}
      <div className="w-[343px] xl:w-auto mx-[16px] xl:ml-0">
        <div className="h-[50px] xl:h-[84px]">
          <p className="xl:text-[40px] text-[24px] font-normal leading-[110%] text-left">
            Профиль
          </p>
        </div>
        <div className="bg-[#FFFFFF] rounded-[30px] p-[30px]">
          <div className="flex flex-wrap flex-row sm:space-x-[33px]">
            {/* <div className="relative mx-[0px] xl:mx-[90px] justify-items-center align-center"> */}
            <div className="items-center">
              <img
                src="/img/avatar-big.svg"
                alt="Фото профиля"
                className="xl:w-[197px] w-[141px] xl:h-[197px] h-[141px] ml-[71px] xl:ml-0"
                /* className="w-full h-full object-cover" */
                // width={197}
                // height={197}
              />
            </div>
            <div className="flex flex-col xl:gap-[20px] gap-[13px] mt-0 xl:mt-[22px] ml-0 xl:ml-[19px]">
              <div className="xl:text-[32px] text-[24px] font-bold text-left">
                {UserName}
              </div>
              <div className="flex flex-col gap-[2px] text-left">
                <p className="text-[18px]">Логин: {UserEmail}</p>
                <p className="text-[18px]">Пароль: ***********</p>
                {/* <p className="text-[18px]">Пароль: {reloadUserInfo}</p> */}
              </div>
              <div className="flex flex-col xl:flex-row gap-y-[10px] xl:gap-x-[10px]">
                {/* <div className="flex-col flex-wrap inline-block align-center flex-row gap-y-[10px] xl:gap-x-[10px]"> */}
                {/* <ButtonLink text={"Изменить пароль"} href="/updatePassword" /> */}
                <ButtonLink
                  // className="h-[52px] xl:h-[50px]"
                  // className="h-[50px] xl:h-[52px] px-[26px] py-[16px] w-[283px] xl:w-[192px] mb-[10px] xl:mr-[10px]"
                  className="h-[50px] xl:h-[52px] px-[26px] py-[16px] w-[283px] xl:w-[192px]"
                  text={"Изменить пароль"}
                  onClick={openUpdatePasswordModal}
                />
                <ButtonLink
                  className="w-[283px] xl:w-[192px] h-[50px] xl:h-[52px] px-[26px] py-[16px] border border-black bg-white text-[#000000] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                  text={"Выйти"}
                  to={appRoutes.HOME}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
