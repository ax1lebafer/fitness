type BannerType = {
  name: string;
};

export default function Banner({ name }: BannerType) {
  return (
    <section className="flex flex-row justify-between rounded-[30px] bg-[#FFC700] overflow-hidden h-[310px] w-full relative">
      <div className="p-10 text-[60px] text-white font-medium">{name}</div>
      <img
        src="/img/size-1.svg"
        alt="Женщина занимается йогой"
        width={800}
        height={683}
        className="absolute left-[45%] translate-x-[-20%]"
      />
    </section>
  );
}
