import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserProfile } from "../Models/User";
import { loginAPI, loginGoogleAPI, registerAPI } from "../Services/AuthService";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  loginGoogleUser: (token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);


useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
        setUser(JSON.parse(user));
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set the 'Authorization' header with the token
    }
    setIsReady(true);
}, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            id: res?.data.id,
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token);
          setUser(userObj!);
          toast.success("Login successful!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occurred!"));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          const userObj = {
            id: res?.data.id,
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token);
          setUser(userObj!);
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      })
      .catch((e) => toast.warning("Server error occurred!"));
  };

  const loginGoogleUser = async (token: string) => {
    await loginGoogleAPI(token).then((res) => {
        if (res) {
            localStorage.setItem("token", res.data.token);
            const userObj = {
                id: res?.data.id,
                userName: res?.data.userName,
                email: res?.data.email,
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setToken(token);
            setUser(userObj);
            toast.success("Login successful!");
            navigate("/dashboard");
        }
    }).catch((e) => toast.warning("Google login failed!"));
};


  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, loginGoogleUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const UserAuth = () => React.useContext(UserContext);
