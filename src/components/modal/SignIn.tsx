import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../lib/appRoutes.ts";
import ButtonLink from "../ui/ButtonLink.tsx";
import { getUser } from "../../api/userAuth.ts";
import { useUser } from "../../hooks/useUser";
import { errorMessage } from "../../utils/ErrorMessage.ts";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setIsEntering } = useUser();
  
  const backgroundLocation = location.state?.backgroundLocation || {
    pathname: appRoutes.HOME,
  };

  const onClose = () => {
    navigate(backgroundLocation.pathname, { replace: true });
  };

  const onSignUp = () => {
    navigate(appRoutes.SIGNUP, { state: { backgroundLocation } });
  };

  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const [signInError, setSignInError] = useState("");

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!formValues.email || formValues.email.trim() === "") {
      setSignInError("Не введена почта");
      return;
    }

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(String(formValues.email).toLowerCase())) {
      setSignInError("Некорректный email");
      return;
    }

    if (!formValues.password || formValues.password.trim() === "") {
      setSignInError("Не введен пароль");
      return;
    } else if (formValues.password.trim().length < 6) {
      setSignInError("Пароль не должен быть короче 6 символов");
      return;
    }

    try {
      const user = await getUser(formValues);
      setUser(user);
      setIsEntering(true);
      console.log("user", user);
      setSignInError("");
      navigate(appRoutes.HOME);
    } catch (error: any) {
      // TODO: Изменить тип для ошибки
      const errMessage = error.message.toLowerCase();
      console.log("errMessage", errMessage);
      const userMessage = errorMessage(errMessage);
      setSignInError(userMessage);
    }
  };

  useEffect(() => {
    setSignInError("");
  }, [formValues.email, formValues.password]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="absolute left-[calc(50%-(360px/2))] top-[calc(50%-(527px/2))]">
        <form className="w-[360px] p-[40px] bg-[white] rounded-[30px] flex flex-col items-center pt-[43px] pr-[47px] pb-[47px] pl-[40px]">
          <div className="w-[220px] h-[35px]  mb-[48px]">
            <img src="/img/logo.svg" alt="logo" width={220} height={35} />
          </div>
          <input
            className="w-[280px] v-[52px] rounded-[8px] border-[1px] border-[#d0cece] px-[18px] py-[16px] mb-[10px] text-lg"
            type="email"
            name="email"
            placeholder="Почта"
            pattern="^\S+@\S+\.\S+$"
            value={formValues.email}
            onChange={onInputChange}
          />
          <input
            className="w-[280px] v-[52px] rounded-[8px] border-[1px] border-[#d0cece] px-[18px] py-[16px] text-lg"
            type="password"
            name="password"
            placeholder="Пароль"
            value={formValues.password}
            onChange={onInputChange}
          />
          {signInError && (
            <p className="mt-[10px] text-[#db0030] text-sm text-center font-normal leading-4">
              {signInError}
            </p>
          )}
          <ButtonLink
            text="Войти"
            className="w-full mb-2.5 mt-[34px]"
            onClick={onLogin}
          />
          <ButtonLink
            text="Зарегистрироваться"
            className="mt-0 w-full bg-transparent border border-black hover:bg-[#F7F7F7] hover:text-black active:bg-[#E9ECED] active:text-black"
            onClick={onSignUp}
            type={"button"}
          />
        </form>
      </div>
    </div>
  );
}
