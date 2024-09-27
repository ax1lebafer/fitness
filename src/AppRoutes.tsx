import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import { appRoutes } from "./lib/appRoutes.ts";
import CoursePage from "./pages/CoursePage.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={appRoutes.HOME} element={<HomePage />} />
      <Route path={appRoutes.COURSES} element={<CoursePage />} />
    </Routes>
  );
}
