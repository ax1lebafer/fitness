export default function Banner() {
  return (
    <section className="flex flex-row justify-between rounded-[30px] bg-[#FFC700] overflow-hidden h-[310px] w-full relative">
      <div className="p-10 text-[60px] text-white font-medium">Йога</div>
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
