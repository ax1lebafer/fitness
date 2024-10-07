import React, { createContext, useState } from "react";
import { UserType } from "../types/user.ts";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  user: UserType | null;
  isEntering: boolean;
  setUser: (prevState: null | UserType) => void;
  setIsEntering: (prevState: boolean) => void;
  logout: () => void;
};

export const UserContext = createContext<null | ContextType>(null);

export default function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<null | UserType>(null);
  const [isEntering, setIsEntering] = useState<boolean>(false);

  console.log(user);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, isEntering, setIsEntering, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

// function getUserFromLocalStorage() {
//   const userInfo = localStorage.getItem("user");
//   return userInfo ? JSON.parse(userInfo) : null;
// };

// export default function UserProvider({ children }) {
//   const [userData, setUserData] = useState(getUserFromLocalStorage());

//   function logout() {
//     localStorage.removeItem("user");
//     setUserData(null);
//   };

//   function setUser(newUser) {
//     setUserData(newUser);
//     localStorage.setItem("user", JSON.stringify(newUser));
//   };

//   return (
//     <UserContext.Provider value={{ userData, logout, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
