import { ExerciseType } from "../types/exercises.ts";

interface TargetListProps {
  exercises: ExerciseType[];
}

export default function TargetList({ exercises }: TargetListProps) {
  return (
    <ol className="mt-[20px] grid grid-flow-row-dense grid-rows-3 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
      {exercises.map((exercise, index) => (
        <li className="mb-[20px]" key={index}>
          <p className="text-[18px] text-left">
            {`${exercise.name} ${exercise.progress}%`}
          </p>
          <progress
            className="w-full h-1.5"
            value={exercise.progress}
            max={100}
          />
        </li>
      ))}
    </ol>
  );
}
