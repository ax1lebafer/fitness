import Directions from "../components/Directions.tsx";
import Banner from "../components/Banner.tsx";
import Tenets from "../components/Tenets.tsx";
import StartBanner from "../components/StartBanner.tsx";
import { useUser } from "../hooks/useUser.ts";
import { useParams } from "react-router-dom";
import useCourses from "../hooks/useCourses.ts";

export default function CoursePage() {
  const { setIsProfile } = useUser();
  setIsProfile(false);

  const { courses } = useCourses();
  const { id } = useParams<{ id: string }>();

  const course = courses?.find((course) => course._id.toString() === id);

  if (!course) {
    return <p>Курс не найден</p>;
  }

  console.log(course);

  return (
    <main className="flex flex-col justify-center h-full gap-[60px]">
      <Banner name={course.nameRU} />
      <Tenets fitting={course.fitting} />
      <Directions directions={course.directions} />
      <StartBanner />
    </main>
  );
}
