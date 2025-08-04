import { useCallback } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import type { User } from "../interfaces/User";
import APIService from "../api/API.service";

export const useAuth = () => {
  const { addUser, removeUser, user, setUser } = useUser();
  const { getItem, setItem } = useLocalStorage();

  const loadUserInformation = async () => {
    const user = getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user) as User;
      if (parsedUser) {
        addUser(parsedUser);
        setItem("app_token", parsedUser.authToken ?? "");
        return parsedUser;
      }
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await APIService.login({ email, password });
      console.log("res", res);
      const data = res?.data;
      if (data.token && data.user) {
        const userInfo: User = { authToken: data.token, ...data.user };
        addUser(userInfo);
      }
    } catch (err) {
      console.log("TOKEN ERROR", err);
    }
  }, []);

  const logout = () => {
    removeUser();
  };

  return { login, logout, user, setUser, loadUserInformation };
};
