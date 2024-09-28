import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { appRoutes } from "./lib/appRoutes.ts";
import HomePage from "./pages/HomePage.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SignIn from "./components/modal/SignIn.tsx";
import SignUp from "./components/modal/SignUp.tsx";

export default function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path={appRoutes.HOME} element={<HomePage />} />
          <Route path={appRoutes.COURSES} element={<CoursePage />} />
        </Route>
        <Route path={appRoutes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path={appRoutes.SIGNIN} element={<SignIn />} />
          <Route path={appRoutes.SIGNUP} element={<SignUp />} />
        </Routes>
      )}
    </>
  );
}
