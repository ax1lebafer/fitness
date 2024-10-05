import ButtonLink from "../../components/ui/ButtonLink";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../lib/appRoutes.ts";
import { useUser } from "../../hooks/useUser";

export default function ProfileEnter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setIsEntering, logout } = useUser();

  const backgroundLocation = location.state?.backgroundLocation || {
    pathname: appRoutes.HOME,
  };

  const onClose = () => {
    navigate(backgroundLocation.pathname, { replace: true });
  };

  const onExit = () => {
    logout();
    setIsEntering(false);
    navigate(appRoutes.HOME);
  };

  let UserName;
  let UserEmail;

  if (user) {
    UserName = user.name;
    UserEmail = user.email;
  };

  return (
    <div className="fixed inset-0 flex z-50">
      <div className="fixed inset-0 bg-black opacity-20" onClick={onClose}></div>
      <div className="relative left-[78px] xl:left-[calc(50%+(315px))] top-[80px] xl:top-[100px] opacity-100 mx-[calc((100%-343px)/2)] xl:mx-0">
        <form className="w-[266px] p-[30px] bg-[white] rounded-[30px] flex flex-col items-center">
          <div className="w-[206px] h-[50px]  mb-[34px]">
            <div className="flex flex-col gap-[10px] text-center text-[18px] font-normal leading-4">
              <p className="text-[#000000]">{UserName}</p>
              <p className="text-[#999999]">{UserEmail}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <ButtonLink
              text="Мой профиль"
              className="mt-[0px] w-[206px]"
              to="/profile"
            />
            <ButtonLink
              text="Выйти"
              className="mt-[0px] w-[206px] bg-transparent border border-black hover:bg-[#F7F7F7] hover:text-black active:bg-[#E9ECED] active:text-black"
              onClick={onExit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
