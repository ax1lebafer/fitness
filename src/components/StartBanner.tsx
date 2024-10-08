import ButtonLink from "./ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.ts";
import { fetchAddCourseToUser } from "../api/data.ts";

const ulList = [
  "проработка всех групп мышц",
  "тренировка суставов",
  "улучшение циркуляции крови",
  "упражнения заряжают бодростью",
  "помогают противостоять стрессам",
];

type IdProps = {
  id: string;
};

export default function StartBanner({ id }: IdProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  let userId: string;
  if (user) {
    console.log("StartBanner. user: ", user);
    userId = user.uid;
  }

  const handleSignInClick = () => {
    navigate(appRoutes.SIGNIN, { state: { backgroundLocation: location } });
  };

  const addCourse = () => {
    console.log("StartBanner. courseId: ", id);
    console.log("StartBanner. uid: ", user?.uid);
    fetchAddCourseToUser(userId, id);
    // alert("Курс добавлен");
  };

  return (
    <section className="bg-white rounded-[30px] w-[343px] mx-[calc((100%-343px)/2)] xl:mx-0 xl:w-full mt-[102px] xl:mt-[42px] mb-[30px] xl:mb-[50px] xl:overflow-hidden">
      <div className="flex flex-col h-[406px] w-[343px] xl:w-[437px] xl:m-[40px] p-[30px] xl:p-0 z-50">
        <h2 className="text-[32px] xl:text-[60px] text-left font-medium leading-[110%] xl:leading-[60px] mb-7 break-words z-50">
          Начните путь к новому телу
        </h2>
        <ol className="opacity-60 font-normal text-[18px] xl:text-[24px] list-disc list-inside pb-1 z-50">
          {ulList.map((el, i) => (
            <li className="text-left" key={i}>
              {el}
            </li>
          ))}
        </ol>
        <ButtonLink
          text={user ? "Добавить курс" : "Войдите, чтобы добавить курс"}
          className="mt-7 w-[283px] xl:w-[437px] h-[50px] xl:h-[52px]"
          onClick={user ? addCourse : handleSignInClick}
        />
      </div>
      <div className="relative">
        <div className="absolute xl:overflow-hidden w-[431px] xl:w-[634px] h-[251px] xl:h-[386px] top-[-550px] xl:top-[-386px] -right-[53.7px] xl:right-[8px] rotate-12.38">
          <img
            src="/img/icons/vector-22.svg"
            alt="Зелёная линия"
            draggable={false}
            className="absolute select-none -z-30 xl:z-10"
          />
        </div>
        <img
          src="/img/icons/man.svg"
          alt="Спортсмен"
          width={487}
          height={542}
          draggable={false}
          className="absolute bottom-[300px] xl:top-[-582px] left-[67px] xl:left-[646px] -z-10 xl:z-10 select-none"
        />
        <img
          src="/img/icons/vector-1.svg"
          alt="Черная линия"
          draggable={false}
          className="absolute top-[-590px] xl:top-[-463px] left-[145px] xl:left-[757px]  w-[32px] xl:w-[50px] h-[27px] xl:h-[42.5px] select-none"
        />
      </div>
    </section>
  );
}
