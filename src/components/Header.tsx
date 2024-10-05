import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonLink from "./ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useUser } from "../hooks/useUser.ts";
import { useState } from "react";
import ProfileEnter from "./modal/ProfileEnter.tsx";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isEntering } = useUser();

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  let UserName = "";

  if (user) {
    UserName = user.name;
  }

  const openSignInModal = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation: location } });
  };

  // const openProfileEnterModal = () => {
  //   navigate(appRoutes.PROFILE_ENTER, {
  //     state: { backgroundLocation: location },
  //   });
  // };

  return (
    <header className="flex justify-between pt-[30px] pb-[60px] items-center">
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
        <p className="mt-[15px] opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      {!isEntering ? (
        <ButtonLink text={"Войти"} onClick={openSignInModal} />
      ) : (
        <div className="w-auto h-[50px] flex flex-row gap-[12px]">
          <div>
            <img
              src="/img/avatar-small.svg"
              alt="avatar"
              width={50}
              height={50}
            />
          </div>
          <div className="text-center text-2xl pt-[6px]">{UserName}</div>
          <button
            onClick={() => setOpenModal(true)}
            className="w-[15px] h-[50px] bg-[#e5e5e5] cursor-point inline-block"
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
    </header>
  );
}
