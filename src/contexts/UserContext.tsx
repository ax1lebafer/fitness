import React, { createContext, useState } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  user: string[] | null;
  setUser: (prevState: null | string[]) => void;
  isEntering: boolean;
  setIsEntering: (prevState: boolean) => void;
  logout: () => void;
  isProfile: boolean;
  setIsProfile: (prevState: boolean) => void;
};

export const UserContext = createContext<null | ContextType>(null);

export default function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<null | string[]>(null);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isEntering,
        setIsEntering,
        logout,
        isProfile,
        setIsProfile,
      }}
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
