import { ExerciseType } from "../types/exercises.ts";

interface TargetListProps {
  exercises: ExerciseType[];
}

export default function TargetList({ exercises }: TargetListProps) {
  const numbRows =
    Math.trunc(exercises.length / 3) + (exercises.length % 3 === 0 ? 0 : 1);

  return (
    <ol
      className={`mt-[20px] grid grid-flow-row-dense grid-rows-${numbRows} grid-cols-[repeat(auto-fill,minmax(auto,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4`}
    >
      {exercises.map((exercise) => {
        const quantity = exercise.quantity || 1;

        const rawProgress = (exercise.progress / quantity) * 100;

        const progressPercentage = Math.min(Math.ceil(rawProgress), 100);

        return (
          <li className="mb-5" key={exercise.name}>
            <p className="h-[46px] text-left">
              {`${exercise.name} ${progressPercentage}%`}
            </p>
            <progress
              className="w-full h-1.5"
              value={progressPercentage}
              max={100}
            />
          </li>
        );
      })}
    </ol>
  );
}
