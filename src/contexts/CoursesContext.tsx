import React, { createContext, useEffect, useState } from "react";
import { CourseType } from "../types/courses.ts";
import { useUser } from "../hooks/useUser.ts";
import { fetchCoursesOfUser } from "../api/data.ts";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  courses: CourseType[];
  selectedCourses: CourseType[];
  loading: boolean;
  selectedLoading: boolean;
  error: string | null;
  courseError: string | null;
  setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
  setSelectedCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setCourseError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CoursesContext = createContext<ContextType | null>(null);

export default function CoursesProvider({ children }: ProviderProps) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [courseError, setCourseError] = useState<string | null>(null);

  const [selectedCourses, setSelectedCourses] = useState<CourseType[]>([]);
  const [selectedLoading, setSelectedLoading] = useState<boolean>(false);

  const { user, loadingUser } = useUser();
  const userId = user?.uid;

  useEffect(() => {
    const loadUserCourses = async () => {
      if (userId) {
        try {
          setSelectedLoading(true);
          const courses = await fetchCoursesOfUser(userId);
          setSelectedCourses(courses);
        } catch (error) {
          console.error("Ошибка при загрузке курсов пользователя:", error);
          setCourseError("Не удалось загрузить курсы пользователя");
        } finally {
          setSelectedLoading(false);
        }
      } else {
        setSelectedCourses([]);
      }
    };

    if (!loadingUser) {
      loadUserCourses();
    }
  }, [userId, loadingUser]);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
        loading,
        setLoading,
        error,
        courseError,
        setError,
        setCourseError,
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
