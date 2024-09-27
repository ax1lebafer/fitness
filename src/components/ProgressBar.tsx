import ButtonLink from "./ui/ButtonLink.tsx";

export default function ProgressBar() {
  return (
    <div>
      <p className="text-[18px] mb-2.5">Прогресс 40%</p>
      <progress className="w-full h-1.5" value={40} max={100}></progress>
      <ButtonLink text={"Продолжить"} className="w-full mt-10" />
    </div>
  );
}
