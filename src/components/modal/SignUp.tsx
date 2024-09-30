import { ChangeEvent, useEffect, useState } from "react";
import ButtonLink from "../ui/ButtonLink.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../lib/appRoutes.ts";
import { useUser } from "../../hooks/useUser.ts";
import { getRegistration } from "../../api/userAuth.ts";
import { errorMessage } from "../../utils/ErrorMessage.ts";

export default function SignUp() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const backgroundLocation = location.state?.backgroundLocation || location;

  const onClose = () => {
    navigate(backgroundLocation.pathname, { replace: true });
  };

  const onSignIn = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation } });
  };

  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    // confirmPassword: "",
  });

  const [signUpError, setSignUpError] = useState<string>("");

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onRegistration = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!formValues.email || formValues.email.trim() === "") {
      setSignUpError("Не введена эл.почта");
      return;
    }

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(String(formValues.email).toLowerCase())) {
      setSignUpError("Некорректный email");
      return;
    }

    if (!formValues.username || formValues.username.trim() === "") {
      setSignUpError("Не введена эл.почта");
      return;
    }

    if (!formValues.password || formValues.password.trim() === "") {
      setSignUpError("Не введен пароль");
      return;
    } else if (formValues.password.trim().length < 6) {
      setSignUpError("Пароль не должен быть короче 6 символов");
      return;
    }

    // if (
    //   !formValues.confirmPassword ||
    //   formValues.confirmPassword.trim() === ""
    // ) {
    //   setSignUpError("Не введено подтверждение пароля");
    //   return;
    // } else if (formValues.confirmPassword.trim().length < 6) {
    //   setSignUpError("Пароль не должен быть короче 6 символов");
    //   return;
    // }

    // if (formValues.password !== formValues.confirmPassword) {
    //   setSignUpError("Пароли не совпадают");
    //   return;
    // }

    try {
      const user = await getRegistration(formValues);
      console.log("SignUp. user", user);
      setSignUpError("");
      setUser(user);
      navigate(appRoutes.SIGNIN);
    } catch (error: any) {
      // if (error instanceof Error) throw new Error(error.message);
      console.log("errMessage", error.message);
      const errMessage = error.message.toLowerCase();
      console.log("errMessage", error);
      const userMessage = errorMessage(errMessage);
      setSignUpError(userMessage);
    }
  };

  useEffect(() => {
    setSignUpError("");
  }, [formValues.email, formValues.username, formValues.password]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="absolute left-[calc(50%-(360px/2))] top-[calc(50%-(527px/2))]">
        <form
          className="w-[360px] p-[40px] bg-[white] rounded-[30px] flex flex-col items-center pt-[43px] pr-[47px] pb-[47px] pl-[40px]"
          action="#"
        >
          <div className="w-[220px] h-[35px] mb-[48px]">
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
            className="w-[280px] v-[52px] rounded-[8px] border-[1px] border-[#d0cece] px-[18px] py-[16px] mb-[10px] text-lg"
            type="text"
            name="username"
            placeholder="Логин"
            value={formValues.username}
            onChange={onInputChange}
          />
          <input
            className="w-[280px] v-[52px] rounded-[8px] border-[1px] border-[#d0cece] px-[18px] py-[16px] mb-[10px] text-lg"
            type="password"
            name="password"
            placeholder="Пароль"
            value={formValues.password}
            onChange={onInputChange}
          />
          {/* <input
            className="w-[280px] v-[52px] rounded-[8px] border-[1px] border-[#d0cece] px-[18px] py-[16px] text-lg"
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={formValues.confirmPassword}
            onChange={onInputChange}
          /> */}
          {signUpError && (
            <p className="mt-[10px] text-[#db0030] text-sm text-center font-normal leading-4">
              {signUpError}
            </p>
          )}
          <ButtonLink
            text="Зарегистрироваться"
            className="w-full mb-2.5 mt-[34px]"
            onClick={onRegistration}
          />
          <ButtonLink
            text="Войти"
            className="mt-0 w-full bg-transparent border border-black hover:bg-[#F7F7F7] hover:text-black active:bg-[#E9ECED] active:text-black"
            onClick={onSignIn}
            type={"button"}
          />
        </form>
      </div>
    </div>
  );
}
