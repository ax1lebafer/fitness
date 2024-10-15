import Card from "./Card.tsx";
import useCourses from "../hooks/useCourses.ts";
import { useUser } from "../hooks/useUser.ts";
import { useEffect } from "react";
import { fetchCoursesOfUser } from "../api/data.ts";

export default function MyCourses() {
  const {
    selectedCourses,
    setSelectedCourses,
    setCourseError,
    setSelectedLoading,
  } = useCourses();
  const { user } = useUser();
  const userId = user?.uid;

  useEffect(() => {
    async function getSelectedCourses() {
      if (!userId) {
        return;
      }
      setSelectedLoading(true);
      try {
        console.log("getSelectedCourses.userId: ", userId);
        const data = await fetchCoursesOfUser(userId);
        console.log("fetchSelectedCourses. data:", data);
        setSelectedCourses(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setCourseError(error.message);
        } else {
          setCourseError("Неизвестная ошибка");
        }
        console.error(error);
      } finally {
        setSelectedLoading(false);
      }
    }

    getSelectedCourses();
  }, [userId, setSelectedCourses, setCourseError, setSelectedLoading]);

  return (
    <section className="mb-10">
      <h2 className="text-left text-[40px] font-semibold mt-[60px] mb-10">
        Мои курсы
      </h2>

      <ul className="flex flex-wrap gap-10">
        {selectedCourses.map((selectedCourse) => (
          <Card
            key={selectedCourse._id}
            name={selectedCourse.nameRU}
            id={selectedCourse._id}
          />
        ))}
      </ul>
    </section>
  );
}
