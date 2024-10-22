type BannerType = {
  name: string;
  id: string;
};

export default function Banner({ name, id }: BannerType) {
  return (
    <section className="xl:flex xl:flex-row xl:justify-between rounded-[30px] overflow-hidden h-[389px] xl:h-[310px] w-[343px] xl:w-full relative mx-[calc((100%-343px)/2)] xl:mx-0">
      <img
        src={`/img/banners/${id}.png`}
        alt="Баннер курса"
        className="absolute hidden xl:block"
      />
      <img
        src={`/img/${id}.png`}
        alt="Баннер курса"
        className="absolute block xl:hidden left-[20%] translate-x-[-20%] w-[343px] h-[389px] object-cover"
      />
      <h2 className="absolute hidden xl:block p-10 text-[60px] text-white font-medium">
        {name}
      </h2>
    </section>
  );
}
