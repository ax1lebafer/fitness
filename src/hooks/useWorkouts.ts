import { useContext } from "react";
import { WorkoutsContext } from "../contexts/WorkoutsContext.tsx";

export const useWorkouts = () => {
  const context = useContext(WorkoutsContext);

  if (context === null) {
    throw new Error(
      "useWorkouts должен использоваться внутри WorkoutsProvider",
    );
  }
  return context;
};
