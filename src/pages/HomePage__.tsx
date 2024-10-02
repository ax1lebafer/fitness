import Card from "../components/Card.tsx";
import ButtonLink from "../components/ui/ButtonLink.tsx";
import { useUser } from "../hooks/useUser.ts";

export default function HomePage() {
  const { setIsProfile } = useUser();
  setIsProfile(false);

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {/* <meta name="viewport" content="width=375, initial-scale=1" /> */}
      <main>
        {/* <meta name="viewport" content="width=375, initial-scale=1" /> */}
        <div className="flex justify-between items-start mb-[50px]">
          <h1 className="text-[32px] xl:text-[60px] font-medium text-left leading-[110%] xl:leading-none">
            Начните заниматься спортом <br /> и улучшите качество жизни
          </h1>
          <div className="hidden xl:relative xl:w-[250px] xl:rounded-[5px] xl:bg-[#BCEC30] xl:py-4 xl:px-5">
            <p className=" text-[26px] font-normal whitespace-nowrap">
              Измени своё <br /> тело за полгода!
            </p>
            <span className="absolute rotate-[35deg] bottom-[-25px] left-[40%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[15px] border-r-transparent border-t-[35px] border-t-[#BCEC30]"></span>
          </div>
        </div>
        <div className="flex gap-10 flex-wrap mb-10">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="flex items-center justify-center mb-10">
          <ButtonLink text={"Наверх ↑"} onClick={scrollUp} />
        </div>
      </main>
    </>
  );
}