import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import UserProvider from "./contexts/UserContext.tsx";
import CoursesProvider from "./contexts/CoursesContext.tsx";
import WorkoutsProvider from "./contexts/WorkoutsContext.tsx";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CoursesProvider>
          <WorkoutsProvider>
            <AppRoutes />
          </WorkoutsProvider>
        </CoursesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
