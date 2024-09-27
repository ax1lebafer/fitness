import { Link } from "react-router-dom";
import ButtonLink from "./ui/ButtonLink.tsx";

export default function Header() {
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
      <ButtonLink text={"Войти"} to={"/signin"} />
    </header>
  );
}
