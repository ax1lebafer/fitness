import React, { createContext, useState } from "react";
import { WorkoutType } from "../types/workouts.ts";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  workouts: WorkoutType[];
  isWorkoutsLoading: boolean;
  workoutsError: null | string;
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutType[]>>;
  setIsWorkoutsLoading: (prev: boolean) => void;
  setWorkoutsError: React.Dispatch<React.SetStateAction<null | string>>;
};

export const WorkoutsContext = createContext<null | ContextType>(null);

export default function WorkoutsProvider({ children }: ProviderProps) {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isWorkoutsLoading, setIsWorkoutsLoading] = useState(false);
  const [workoutsError, setWorkoutsError] = useState<null | string>(null);

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        isWorkoutsLoading,
        workoutsError,
        setWorkouts,
        setIsWorkoutsLoading,
        setWorkoutsError,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}
