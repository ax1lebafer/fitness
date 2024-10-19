import React, { createContext, useEffect, useState } from "react";
import { UserType } from "../types/user.ts";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  user: UserType | null;
  isEntering: boolean;
  setUser: (user: UserType | null) => void;
  setIsEntering: (prevState: boolean) => void;
  logout: () => void;
  isContain: boolean;
  setIsContain: (prevState: boolean) => void;
};

export const UserContext = createContext<null | ContextType>(null);

export default function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<null | UserType>(null);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [isContain, setIsContain] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsEntering(true);
      }
    } catch (error) {
      console.error("Ошибка при загрузке пользователя из localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  function setUserAndPersist(newUser: UserType | null) {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    setUser(newUser);
    setIsEntering(!!newUser);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    setIsEntering(false);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserAndPersist,
        isEntering,
        setIsEntering,
        logout,
        isContain,
        setIsContain,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
