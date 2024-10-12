import { arrayTrainingProps } from "./ResultTraining.tsx";

interface TargetListProps {
  targetList: arrayTrainingProps[];
}

export default function TargetList({ targetList }: TargetListProps) {
  return (
    <ol className="mt-[20px] grid grid-flow-row-dense grid-rows-3 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
      {targetList.map((arrayTraining, index) => (
        <li className="mb-[20px]" key={index}>
          <p className="text-[18px] text-left">
            {`${arrayTraining.target} ${arrayTraining.result}%`}
          </p>
          <progress
            className="w-full h-1.5"
            value={arrayTraining.result}
            max={100}
          />
        </li>
      ))}
    </ol>
  );
}
