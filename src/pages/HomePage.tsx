import Card from "../components/Card.tsx";
import ButtonLink from "../components/ui/ButtonLink.tsx";
import { useEffect, useState } from "react";
import { fetchCourses } from "../api/data.ts";
import { CourseType } from "../types/courses.ts";

export default function HomePage() {
  const [courses, setCourses] = useState<CourseType[]>([]);

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    async function getCourse() {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    }

    getCourse();
  }, []);

  return (
    <main>
      <div className="flex justify-between items-start mb-[50px]">
        <h1 className="text-[60px] font-medium text-left leading-none">
          Начните заниматься спортом <br /> и улучшите качество жизни
        </h1>
        <div className="relative w-[250px] rounded-[5px] bg-[#BCEC30] py-4 px-5">
          <p className=" text-[26px] text-left font-normal whitespace-nowrap">
            Измени своё <br /> тело за полгода!
          </p>
          <span className="absolute rotate-[35deg] bottom-[-25px] left-[40%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[15px] border-r-transparent border-t-[35px] border-t-[#BCEC30]"></span>
        </div>
      </div>
      <div className="flex gap-10 flex-wrap mb-10">
        {courses.map((course) => (
          <Card key={course._id} name={course.nameRU} id={course._id} />
        ))}
      </div>
      <div className="flex items-center justify-center mb-10">
        <ButtonLink text={"Наверх ↑"} onClick={scrollUp} />
      </div>
    </main>
  );
}
