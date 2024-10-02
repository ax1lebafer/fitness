import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonLink from "./ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useUser } from "../hooks/useUser.ts";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isEntering, isProfile } = useUser();

  console.log("Header. isProfile", isProfile);

  let UserName = "";

  if (user) {
    UserName = user.name;
  }

  const openSignInModal = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation: location } });
  };

  const openProfileEnterModal = () => {
    navigate(appRoutes.PROFILE_ENTER, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* <meta name="viewport" content="width=375, initial-scale=1" /> */}
      {/* <header className="flex justify-between pt-[30px] pb-[60px] items-center"> */}
      {/* <header className="h-[180px]"> */}
      <header>
        <div className="w-[343px] xl:w-auto mx-[16px] xl:mx-0">
          <div className="flex justify-between pt-[30px] items-center content-center">
            <div>
              <Link to="/">
                <img
                  src="/img/logo.svg"
                  alt="Логотип Fitness App"
                  width={220}
                  height={35}
                />
                <span className="sr-only">Логотип Fitness App</span>
              </Link>
              {!isProfile && (
                <div className="hidden xl:block xl:mt-[15px] opacity-50">
                  <p>Онлайн-тренировки для занятий дома</p>
                </div>
              )}
            </div>
            {!isEntering ? (
              <ButtonLink
                text={"Войти"}
                onClick={openSignInModal}
                className="w-[83px] xl:w-[103px] h-[36px] xl:h-[52px] px-[12px] xl:px-[26px] py-[6px] xl:py-[16px] text-[18px]"
              />
            ) : (
              <div className="w-auto h-[35px] xl:h-[50px] flex flex-row gap-[12px]">
                <div className="w-[35px] xl:w-[50px]">
                  <img
                    src="/img/avatar-small.svg"
                    alt="avatar"
                    // width={35}
                    // height={35}
                  />
                </div>
                <div className="hidden xl:block xl:text-center xl:text-2xl xl:pt-[6px]">
                  {UserName}
                </div>
                {/* <div className="sm:text-center"></div> */}
                <button
                  onClick={openProfileEnterModal}
                  className="w-[15px] h-[35px] xl:h-[50px] bg-[#e5e5e5] cursor-point inline-block"
                  type="button"
                >
                  <img
                    src="/img/icons/down_arrow.svg"
                    alt="arrow"
                    width={15}
                    height={15}
                  />
                </button>
              </div>
            )}
          </div>
          {/* {!isProfile && (
          <p className="mt-[14px] opacity-50 text-left">
            Онлайн-тренировки для занятий дома
          </p>
        )} */}
          <div className="h-[34px] xl:h-[60px]"></div>
        </div>
      </header>
    </>
  );
}
