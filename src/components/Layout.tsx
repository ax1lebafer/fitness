import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";
import useCourses from "../hooks/useCourses.ts";
import { useEffect } from "react";
import { fetchCourses } from "../api/data.ts";

export default function Layout() {
  const { setCourses, setError, setLoading } = useCourses();

  useEffect(() => {
    async function getCourse() {
      try {
        const data = await fetchCourses();
        setLoading(true);
        setCourses(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setError("Неизвестная ошибка");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getCourse();
  }, [setError, setLoading, setCourses]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
