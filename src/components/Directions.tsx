export default function Directions() {
  return (
    <section className="w-[100%]">
      <h2 className="text-[40px] font-semibold leading-[44px] mb-10">
        Направления
      </h2>
      <div className="flex flex-wrap flex-row text-[24px] font-normal bg-[#BCEC30] rounded-[28px] w-[100%] p-[30px] justify-between">
        <ul className="flex flex-col gap-[30px] w-[284px]">
          <li className="flex gap-2">
            <img
              src="/img/sparcle.svg"
              width={26}
              height={26}
              alt="Изображение звезды"
            />
            Йога для новичков
          </li>
          <li className="flex gap-2">
            <img
              src="/img/sparcle.svg"
              width={26}
              height={26}
              alt="Изображение звезды"
            />
            Классическая йога
          </li>
        </ul>
        <ul className="flex flex-col gap-[30px] w-[284px]">
          <li className="flex gap-2">
            <img
              src="/img/sparcle.svg"
              width={26}
              height={26}
              alt="Изображение звезды"
            />
            Кундалини-йога
          </li>
          <li className="flex gap-2">
            <img
              src="/img/sparcle.svg"
              width={26}
              height={26}
              alt="Изображение звезды"
            />
            Йогатерапия
          </li>
        </ul>
        <ul className="flex flex-col gap-[30px] w-[284px]">
          <li className="flex gap-2">
            <img
              src="/img/sparcle.svg"
              width={26}
              height={26}
              alt="Изображение звезды"
            />
            Хатха-йога
          </li>
          <li className="flex gap-2">
            <img
              src="/img/sparcle.svg"
              width={26}
              height={26}
              alt="Изображение звезды"
            />
            Аштанга-йога
          </li>
        </ul>
      </div>
    </section>
  );
}
