import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
