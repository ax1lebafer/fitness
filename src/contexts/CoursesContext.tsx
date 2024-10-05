import { createContext, useState } from "react";
import { CourseType } from "../types/courses.ts";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  courses: CourseType[] | null;
  loading: boolean;
  error: string | null;
  setCourses: (prevState: CourseType[]) => void;
  setLoading: (prevState: boolean) => void;
  setError: (prevState: string | null) => void;
};

export const CoursesContext = createContext<ContextType | null>(null);

export default function CoursesProvider({ children }: ProviderProps) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <CoursesContext.Provider
      value={{ courses, setCourses, loading, setLoading, error, setError }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
