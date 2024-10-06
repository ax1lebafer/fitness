import Card from "../components/Card.tsx";
import ButtonLink from "../components/ui/ButtonLink.tsx";
import { useUser } from "../hooks/useUser.ts";
import useCourses from "../hooks/useCourses.ts";

export default function HomePage() {
  const { setIsProfile } = useUser();
  setIsProfile(false);
  const { courses } = useCourses();

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main>
      <div className="flex justify-between items-start mb-[50px] mx-[calc((100%-343px)/2)] xl:mx-0">
        {/* <h1 className="text-[60px] font-medium text-left leading-none"> */}
        <h1 className="text-[32px] xl:text-[60px] font-medium text-left leading-[110%] xl:leading-none">
          Начните заниматься спортом <br className="hidden xl:block" /> и
          улучшите качество жизни
        </h1>
        {/* <div className="relative w-[250px] rounded-[5px] bg-[#BCEC30] py-4 px-5"> */}
        <div className="hidden xl:block xl:relative xl:w-[250px] xl:rounded-[5px] xl:bg-[#BCEC30] xl:py-4 xl:px-5">
          <p className=" text-[26px] text-left font-normal whitespace-nowrap">
            Измени своё <br /> тело за полгода!
          </p>
          <span className="absolute rotate-[35deg] bottom-[-25px] left-[40%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[15px] border-r-transparent border-t-[35px] border-t-[#BCEC30]"></span>
        </div>
      </div>
      <div className="flex gap-10 flex-wrap mb-10">
        {courses?.map((course) => (
          <Card key={course._id} name={course.nameRU} id={course._id} />
        ))}
      </div>
      <div className="mx-[calc((100%-343px)/2)] xl:mx-0 flex items-center xl:items-center justify-end xl:justify-center mb-10">
        <ButtonLink text={"Наверх ↑"} onClick={scrollUp} />
      </div>
    </main>
  );
}
