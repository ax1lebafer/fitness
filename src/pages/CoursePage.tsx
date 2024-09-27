import Directions from "../components/Directions.tsx";
import Banner from "../components/Banner.tsx";
import Tenets from "../components/Tenets.tsx";
import StartBanner from "../components/StartBanner.tsx";

export default function CoursePage() {
  return (
    <main className="flex flex-col justify-center h-full gap-[60px]">
      <Banner />
      <Tenets />
      <Directions />
      <StartBanner />
    </main>
  );
}