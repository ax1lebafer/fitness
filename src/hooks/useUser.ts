import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser должен использоваться внутри UserPovider");
  }
  return context;
};
