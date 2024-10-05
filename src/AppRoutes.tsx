import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { appRoutes } from "./lib/appRoutes.ts";
import HomePage from "./pages/HomePage.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SignIn from "./components/modal/SignIn.tsx";
import SignUp from "./components/modal/SignUp.tsx";
import ProfileEnter from "./components/modal/ProfileEnter.tsx";
import UpdatePassword from "./components/modal/UpdatePassword.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MainTraining from "./pages/MainTraining.tsx";

export default function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const backgroundLocation = state?.backgroundLocation || location;

  return (
    <>
      <Routes location={backgroundLocation}>
        <Route element={<Layout />}>
          <Route path={appRoutes.HOME} element={<HomePage />} />
          <Route path={appRoutes.COURSES} element={<CoursePage />} />
          <Route path={appRoutes.PROFILE} element={<ProfilePage />} />
          <Route path={appRoutes.TRAINING} element={<MainTraining/>}/>
        </Route>
        <Route path={appRoutes.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes location={location}>
          <Route path={appRoutes.SIGNIN} element={<SignIn />} />
          <Route path={appRoutes.SIGNUP} element={<SignUp />} />
          <Route path={appRoutes.PROFILE_ENTER} element={<ProfileEnter />} />
          <Route
            path={appRoutes.UPDATE_PASSWORD}
            element={<UpdatePassword />}
          />
        </Routes>
      )}
    </>
  );
}
