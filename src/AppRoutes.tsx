import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { appRoutes } from "./lib/appRoutes";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignIn from "./components/modal/SignIn";
import SignUp from "./components/modal/SignUp";
import ProfileEnter from "./components/modal/ProfileEnter";
import UpdatePassword from "./components/modal/UpdatePassword";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
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
          <Route element={<PrivateRoute />}>
            <Route path={appRoutes.PROFILE} element={<ProfilePage />} />
            <Route path={appRoutes.TRAINING} element={<MainTraining />} />
          </Route>
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
