const directions = [
  "Йога для новичков",
  "Классическая йога",
  "Йогатерапия",
  "Кундалини-йога",
  "Хатха-йога",
  "Аштанга-йога",
];

export default function Directions() {
  return (
    <section className="w-[100%]">
      <h2 className="text-[40px] font-semibold leading-[44px] mb-10">
        Направления
      </h2>
      <div className="flex flex-wrap flex-row text-[24px] font-normal bg-[#BCEC30] rounded-[28px] w-[100%] p-[30px] justify-between">
        <ul className="flex flex-row flex-wrap gap-x-[124px] gap-y-[34px]">
          {directions.map((el, i) => (
            <li key={i} className="flex gap-2 w-[284px]">
              <img
                src="/img/sparcle.svg"
                width={26}
                height={26}
                alt="Изображение звезды"
              />
              {el}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
