type TenetsProps = {
  fitting: string[];
};

export default function Tenets({ fitting }: TenetsProps) {
  const styleBlock =
    "bg-[linear-gradient(115.81deg,_#151720_34.98%,_#1E212E_91.5%)] rounded-[28px] min-w-[320px] min-h-[141px] p-5 flex-grow flex-shrink-0 max-w-[369px]";

  return (
    <section>
      <h2 className="text-[40px] text-left font-semibold leading-[44px]">
        Подойдет для вас, если:
      </h2>
      <div className="flex flex-wrap gap-[17px] text-white flex-row pt-10">
        {fitting.map((text, index) => (
          <div key={index} className={styleBlock}>
            <div className="flex gap-[25px] items-center h-full">
              <p className="text-[#BCEC30] text-[75px] leading-[75px]">
                {index + 1}
              </p>
              <p className="text-[24px] text-left font-normal break-words">
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
