import Card from "./Card.tsx";
import useCourses from "../hooks/useCourses.ts";
import { appRoutes } from "../lib/appRoutes.ts";
import ButtonLink from "./ui/ButtonLink.tsx";

export default function MyCourses() {
  const { selectedCourses } = useCourses();

  return (
    <section className="mb-10">
      <h2 className="text-left text-[40px] font-semibold mt-[60px] mb-10">
        Мои курсы
      </h2>

      <ul className="flex flex-wrap gap-10">
        {selectedCourses?.map((selectedCourse) => (
          <Card
            key={selectedCourse.order}
            name={selectedCourse.nameRU}
            id={selectedCourse._id}
          />
        ))}
      </ul>

      {selectedCourses.length === 0 && (
        <div>
          <p className="text-3xl mb-10">
            Нет активных курсов. Для добавления курсов перейдите на
          </p>
          <ButtonLink text="Главную страницу" to={appRoutes.HOME} />
        </div>
      )}
    </section>
  );
}
