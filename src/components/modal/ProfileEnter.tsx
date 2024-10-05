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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="fixed inset-0 z-20" onClick={onClose}></div>
      {/* <div className="relative left-[calc(50%+266px/2)] top-[-120px] opacity-100"> */}
      <div className="relative min-w-[1160px] h-full">
        <div className="absolute top-[100px] right-0 z-30">
          <form
            className="w-[266px] p-[30px] bg-[white] rounded-[30px] flex flex-col items-center"
            action="#"
          >
            <div className="w-[206px] h-[50px]  mb-[34px]">
              <div className="flex flex-col gap-[10px] text-center text-[18px] font-normal leading-4">
                <p className="text-[#000000]">{user.name}</p>
                <p className="text-[#999999]">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <ButtonLink
                text="Мой профиль"
                className="mt-[0px] w-[206px]"
                to={"/profile"}
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
    </div>
  );
}
