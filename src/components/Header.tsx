import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonLink from "./ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useUser } from "../hooks/useUser.ts";
import { useEffect, useState } from "react";
import ProfileEnter from "./modal/ProfileEnter.tsx";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isEntering } = useUser();

  const isProfile = location.pathname.includes("profile");

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const openSignInModal = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation: location } });
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  return (
    <header>
      <div className="w-[343px] xl:w-auto mx-[calc((100%-343px)/2)] xl:mx-0 items-center content-center justify-items-center">
        <div className="flex justify-between pt-[30px] items-center">
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
            <ButtonLink text={"Войти"} onClick={openSignInModal} />
          ) : (
            <div
              className="w-auto h-[35px] xl:h-[50px] flex flex-row gap-[12px] cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <div className="w-[35px] xl:w-[50px]">
                <img src="/img/avatar-small.svg" alt="avatar" />
              </div>
              <div className="hidden xl:block xl:text-center xl:text-2xl xl:pt-[6px]">
                {user?.name}
              </div>
              <button
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
          {openModal && <ProfileEnter closeModal={closeModal} />}
        </div>
        <div className="h-[34px] xl:h-[60px]"></div>
      </div>
    </header>
  );
}
