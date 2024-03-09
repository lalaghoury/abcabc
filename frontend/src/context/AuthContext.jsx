import { message } from "antd";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    signout: async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signout"
        );
        const data = response.data;
        console.log(data);
        if (data.success) {
          localStorage.removeItem("auth");
          message.success(data.message, 1, () => {
            window.location.href = "/sign-in";
          });
        }
      } catch (error) {
        message.error(
          error.response.data.message
            ? error.response.data.message
            : "Something went wrong"
        );
        console.log(error);
      }
    },
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, user: parsedData.user, token: parsedData.token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
