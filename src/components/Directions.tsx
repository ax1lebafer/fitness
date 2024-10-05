// const directions = [
//   "Йога для новичков",
//   "Классическая йога",
//   "Йогатерапия",
//   "Кундалини-йога",
//   "Хатха-йога",
//   "Аштанга-йога",
// ];

type DirectionsProps = {
  directions: string[];
};
export default function Directions({ directions }: DirectionsProps) {
  return (
    <section className="mx-[16px] xl:mx-0 w-[343px] xl:w-[100%] -z-20">
      <h2 className="text-[24px] xl:text-[40px] font-normal leading-[44px] text-left mb-10">
        Направления
      </h2>
      <div className="flex flex-wrap flex-row text-[18px] xl:text-[24px] font-normal bg-[#BCEC30] rounded-[28px] w-[100%] p-[30px] justify-between -z-20">
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
