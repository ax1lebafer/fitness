import Directions from "../components/Directions.tsx";
import Banner from "../components/Banner.tsx";
import Tenets from "../components/Tenets.tsx";
import StartBanner from "../components/StartBanner.tsx";
import { useParams } from "react-router-dom";
import useCourses from "../hooks/useCourses.ts";

export default function CoursePage() {
  const { courses } = useCourses();
  const { id } = useParams<{ id: string }>();

  const course = courses?.find((course) => course._id.toString() === id);

  if (!course) {
    return <p>Курс не найден</p>;
  }

  return (
    <main className="flex flex-col justify-center h-full gap-[60px]">
      <Banner name={course.nameRU} id={course._id.toString()} />
      <Tenets fitting={course.fitting} />
      <Directions directions={course.directions} />
      <StartBanner id={course._id.toString()} />
    </main>
  );
}
