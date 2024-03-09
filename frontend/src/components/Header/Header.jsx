import React from "react";
import "./Header.scss";
import {
  Logo,
  Search,
  Links,
  SelectLanguage,
  Buttons,
  ToggleTheme,
} from "./Navbar";
import AppLayout from "../../config/AppLayout/AppLayout";
import { useAuth } from "../../context/AuthContext";

const HeaderUser = ({ changeTheme }) => {
  const { auth } = useAuth();
  return (
    <AppLayout>
      <div className="header">
        <Logo />
        {auth.user && <Links />}
        <Search />
        {!auth.user && <SelectLanguage />}
        <ToggleTheme changeTheme={changeTheme} />
        <Buttons />
      </div>
    </AppLayout>
  );
};

export default HeaderUser;
