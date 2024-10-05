type BannerType = {
  name: string;
};

export default function Banner({ name }: BannerType) {
  return (
    <section className="xl:flex xl:flex-row xl:justify-between rounded-[30px] bg-[#FFC700] overflow-hidden h-[389px] xl:h-[310px] w-[343px] xl:w-full relative mx-[calc((100%-343px)/2)] xl:mx-0">
      <div className="hidden xl:block p-10 text-[60px] text-white font-medium">{name}</div>
      <img
        src="/img/size-1.svg"
        alt="Женщина занимается йогой"
        className="absolute hidden xl:block left-[45%] translate-x-[-20%]"
        // className="absolute left-[45%] translate-x-[-20%]"
      />
      <img
        src="/img/size-11.png"
        alt="Женщина занимается йогой"
        className="absolute block xl:hidden left-[25%] translate-x-[-17%] w-[310px] h-[402px]"
      />
    </section>
  );
}
