import { useContext } from "react";
import { CoursesContext } from "../contexts/CoursesContext.tsx";

export default function useCourses() {
  const context = useContext(CoursesContext);

  if (context === null) {
    throw new Error("useCourses должен использоваться внутри CoursesProvider");
  }
  return context;
}
