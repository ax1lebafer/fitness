export default function Banner() {
  return (
    <section className="xl:flex xl:flex-row xl:justify-between rounded-[30px] bg-[#FFC700] overflow-hidden h-[389px] xl:h-[310px] w-[343px] xl:w-full relative mx-[16px] xl:mx-0">
      <div className="hidden xl:block p-10 text-[60px] text-white font-medium">
        Йога
      </div>
      <img
        src="/img/size-1.svg"
        alt="Женщина занимается йогой"
        className="absolute hidden xl:block xl:left-[45%] left-[5%] translate-x-[-25%] xl:translate-x-[-20%] w-[343px] h-[389px] scale-150"
      />
      <img
        src="/img/size-11.png"
        alt="Женщина занимается йогой"
        className="absolute block xl:hidden left-[25%] translate-x-[-17%] w-[310px] h-[402px]"
      />
    </section>
  );
}
