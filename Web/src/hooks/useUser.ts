import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import type { User } from "../interfaces/User";

export const useUser = () => {
  const { setUser, user  } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
    // console.log("addUser", localStorage.getItem("user"));
  };

  const removeUser = () => {
    setUser(null);
    setItem('app_token', "")
    setItem("user", "");
  };

  return { addUser, removeUser, user, setUser };
};
