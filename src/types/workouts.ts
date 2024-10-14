import { ExerciseType } from "./exercises";

export type WorkoutType = {
  _id: string;
  name: string;
  video: string;
  exercises: ExerciseType[];
};
