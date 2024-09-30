import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../lib/appRoutes.ts";
import React, { ChangeEvent, useEffect, useState } from "react";
import { errorMessage } from "../../utils/ErrorMessage";
import ButtonLink from "../../components/ui/ButtonLink";
import { changePassword } from "../../api/userAuth";

export default function UpdatePassword() {
    const navigate = useNavigate();
    const location = useLocation();
    // const { setUser, setIsEntering } = useUser();
    
    const backgroundLocation = location.state?.backgroundLocation || {
      pathname: appRoutes.HOME,
    };
  
    const onClose = () => {
      navigate(backgroundLocation.pathname, { replace: true });
    };
  
    // const onSignUp = () => {
    //   navigate(appRoutes.SIGNUP, { state: { backgroundLocation } });
    // };

  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [updatePasswordError, setUpdatePasswordError] = useState<string>("");

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function onChangePassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!formValues.newPassword || formValues.newPassword.trim() === "") {
      setUpdatePasswordError("Не введен новый пароль");
      return;
    } else if (formValues.newPassword.trim().length < 6) {
      setUpdatePasswordError("Пароль не должен быть короче 6 символов");
      return;
    }

    if (
      !formValues.confirmPassword ||
      formValues.confirmPassword.trim() === ""
    ) {
      setUpdatePasswordError("Не введено подтверждение пароля");
      return;
    } else if (formValues.confirmPassword.trim().length < 6) {
      setUpdatePasswordError("Пароль не должен быть короче 6 символов");
      return;
    }

    if (formValues.newPassword !== formValues.confirmPassword) {
      setUpdatePasswordError("Пароли не совпадают");
      return;
    }

    await changePassword(formValues.newPassword)
      .then((response) => {
        console.log("changePassword:", response);
        setUpdatePasswordError("");
        onClose();
      })
      .catch((error) => {
        const errMessage = error.message.toLowerCase();
        const userMessage = errorMessage(errMessage);
        setUpdatePasswordError(userMessage);
      });
  }

  useEffect(() => {
    setUpdatePasswordError("");
  }, [formValues.newPassword, formValues.confirmPassword]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-20"
        onClick={onClose}
      ></div>
      <div className="absolute left-[calc(50%-(360px/2))] top-[calc(50%-(527px/2))] opacity-100">
        <form
          className="w-[360px] p-[40px] bg-[white] rounded-[30px] flex flex-col items-center pt-[43px] pr-[47px] pb-[47px] pl-[40px]"
          action="#"
        >
          <div className="w-[220px] h-[35px] mb-[48px]">
            <img src="/img/logo.svg" alt="logo" width={220} height={35} />
          </div>
          <input
            className="w-[280px] v-[52px] rounded-[8px] border-[1px] border-[#d0cece] px-[18px] py-[16px] mb-[10px] text-lg"
            type="password"
            name="newPassword"
            placeholder="Новый пароль"
            value={formValues.newPassword}
            onChange={onInputChange}
          />
          <input
            className="w-[280px] v-[52px] rounded-[8px] border-[1px] border-[#d0cece] px-[18px] py-[16px] text-lg"
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={formValues.confirmPassword}
            onChange={onInputChange}
          />
          {updatePasswordError && (
            <p className="mt-[10px] text-[#db0030] text-sm text-center font-normal leading-4">
              {updatePasswordError}
            </p>
          )}
          <ButtonLink
            text="Подтвердить"
            className="w-full mb-2.5 mt-[34px]"
            onClick={onChangePassword}
            //   href="/profile"
          />
        </form>
      </div>
    </div>
  );
}