import ButtonLink from "../components/ui/ButtonLink.tsx";
import { appRoutes } from "../lib/appRoutes.ts";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-6 text-2xl text-center">
        Упс...
        <br />
        Страницу, которую ты ищешь не найдена
      </p>
      <ButtonLink
        className="mt-10"
        text={"Вернуться на главную"}
        to={appRoutes.HOME}
      />
    </main>
  );
}
