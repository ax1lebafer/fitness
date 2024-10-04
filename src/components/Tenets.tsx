export default function Tenets() {
  const array = [
    "Давно хотели попробовать йогу, но не решались начать",
    "Хотите укрепить позвоночник, избавиться от болей в спине и суставах",
    "Ищете активность, полезную для тела и души",
  ];

  const styleBlock =
    "bg-[linear-gradient(115.81deg,_#151720_34.98%,_#1E212E_91.5%)] rounded-[28px] w-[343px] xl:min-w-[327px] xl:min-h-[141px] p-5 flex-grow flex-shrink-0 xl:max-w-[385px]";

  return (
    <section className="mx-[16px] xl:mx-0">
      {/* <h2 className="text-[24px] xl:text-[40px] text-left font-semibold leading-[110%]"> */}
      <h2 className="text-[24px] xl:text-[40px] text-left font-normal leading-[110%]">
        Подойдет для вас, если:
      </h2>
      <div className="flex flex-wrap gap-[17px] text-white flex-col xl:flex-row pt-10">
        {array.map((text, index) => (
          <div key={index} className={styleBlock}>
            <div className="flex gap-[25px] items-center h-full">
              <p className="text-[#BCEC30] text-[75px] leading-[110%]">
                {index + 1}
              </p>
              <p className="text-[18px] xl:text-[24px] text-left font-normal leading-[110%] break-words">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
