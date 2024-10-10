import { useEffect } from "react";
import { fetchCoursesOfUser } from "../api/data.ts";
import Card from "./Card.tsx";
import useCourses from "../hooks/useCourses.ts";

export default function MyCourses(userId: string) {
  const { selectedCourses, setSelectedCourses, setError, setSelectedLoading } = useCourses();

  useEffect(() => {
    async function getSelectedCourses(userId: string) {
      try {
        const data = await fetchCoursesOfUser(userId);
        setSelectedLoading(true);
        setSelectedCourses(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setError("Неизвестная ошибка");
        console.log(error);
      } finally {
        setSelectedLoading(false);
      }
    }

    getSelectedCourses(userId);
  }, [setError, setSelectedLoading, setSelectedCourses, userId]);


  return (
    <section className="mb-10">
      <h2 className="text-left text-[40px] font-semibold mt-[60px] mb-10">
        Мои курсы
      </h2>

      <ul className="flex flex-wrap gap-10">
        {/* <Card name={"Стэп-аэробика"} id={"6i67sm"} /> */}
        {/* <Card name={"Стэп-аэробика"} id={"6i67sm"} /> */}
        {/* <Card name={"Стэп-аэробика"} id={"6i67sm"} /> */}

        {selectedCourses?.map((selectedCourse) => (
          <Card key={selectedCourse._id} name={selectedCourse.nameRU} id={selectedCourse._id} />
        ))} 

      </ul>
    </section>
  );
}
