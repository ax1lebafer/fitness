import ButtonLink from "./ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.ts";

const ulList = [
  "проработка всех групп мышц",
  "тренировка суставов",
  "улучшение циркуляции крови",
  "упражнения заряжают бодростью",
  "помогают противостоять стрессам",
];

export default function StartBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  if (user) {
    console.log("StartBanner. user: ", user);
    console.log("StartBanner. user.email: ", user.email);
  }

  const handleSignInClick = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation: location } });
  };

  const addCourse = () => {
    alert("Курс добавлен");
  };

  return (
    <section className="bg-white rounded-[30px] w-full mt-[42px] relative mb-[50px]">
      <div className="flex flex-col h-[406px] w-[437px] m-[40px]">
        <h2 className="text-[60px] text-left font-medium leading-[60px] mb-7">
          Начните путь к новому телу
        </h2>
        <ol className="opacity-60 font-normal text-[24px] list-disc list-inside pb-1">
          {ulList.map((el, i) => (
            <li className="text-left" key={i}>
              {el}
            </li>
          ))}
        </ol>
        <ButtonLink
          text={user ? "Добавить курс" : "Войдите, чтобы добавить курс"}
          className="mt-7"
          onClick={user ? addCourse : handleSignInClick}
        />
      </div>
      <div className="relative">
        <div className="absolute overflow-hidden w-[634px] h-[386px] top-[-386px] right-[6px]">
          <img
            src="/img/icons/vector-2.svg"
            alt="Зелёная линия"
            width={670}
            height={390}
            draggable={false}
            className="absolute select-none"
          />
        </div>
        <img
          src="/img/icons/man.svg"
          alt="Спортсмен"
          width={487}
          height={542}
          draggable={false}
          className="absolute top-[-582px] left-[646px] z-50 select-none"
        />
        <img
          src="/img/icons/vector-1.svg"
          alt="Черная линия"
          width={50}
          height={42.5}
          draggable={false}
          className="absolute top-[-463px] left-[757px] select-none"
        />
      </div>
    </section>
  );
}
