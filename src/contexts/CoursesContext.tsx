import { createContext, useState } from "react";
import { CourseType } from "../types/courses.ts";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  courses: CourseType[] | null;
  selectedCourses: CourseType[] | null;
  loading: boolean;
  selectedLoading: boolean;
  error: string | null;
  setCourses: (prevState: CourseType[]) => void;
  setSelectedCourses: (prevState: CourseType[]) => void;
  setLoading: (prevState: boolean) => void;
  setSelectedLoading: (prevState: boolean) => void;
  setError: (prevState: string | null) => void;
};

export const CoursesContext = createContext<ContextType | null>(null);

export default function CoursesProvider({ children }: ProviderProps) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCourses, setSelectedCourses] = useState<CourseType[]>([]);
  const [selectedLoading, setSelectedLoading] = useState<boolean>(false);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
        loading,
        setLoading,
        error,
        setError,
        selectedLoading,
        setSelectedLoading,
        selectedCourses,
        setSelectedCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
