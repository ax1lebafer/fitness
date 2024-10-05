import Card from "./Card.tsx";

export default function MyCourses() {
  return (
    <section className="mb-10">
      <h2 className="text-left text-[40px] font-semibold mt-[60px] mb-10">
        Мои курсы
      </h2>

      <ul className="flex gap-10">
        <Card name={"Стэп-аэробика"} id={"6i67sm"} />
        <Card name={"Стэп-аэробика"} id={"6i67sm"} />
        <Card name={"Стэп-аэробика"} id={"6i67sm"} />
      </ul>
    </section>
  );
}
