import { ExerciseType } from "../types/exercises.ts";

interface TargetListProps {
  exercises: ExerciseType[];
}

export default function TargetList({ exercises }: TargetListProps) {
  const numbRows =
    Math.trunc(exercises.length / 3) + (exercises.length % 3 === 0 ? 0 : 1);

  return (
    // <ol className="mt-[20px] grid grid-flow-row-dense grid-rows-3 grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
    <ol
      className={`mt-[20px] grid grid-flow-row-dense grid-rows-${numbRows} grid-cols-[repeat(auto-fill,minmax(auto,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4`}
    >
      {exercises.map((exercise, index) => (
        <li className="mb-[20px]" key={index}>
          <div className="h-[46px]">
            <p className="text-[18px] text-left text-wrap">
              {`${exercise.name} ${exercise.progress}%`}
            </p>
          </div>
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
