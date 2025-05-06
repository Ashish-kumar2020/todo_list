import React from "react";
import { ClientOnly, IconButton, Skeleton, Box } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import Logo from "../../assets/Logo";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <div className="header-container">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="theme-controller">
        <ul className="header-list">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            {" "}
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="stickywall">Sticky Wall</Link>
          </li>
          <li>Logout</li>
          <li>
            {" "}
            <ClientOnly fallback={<Skeleton boxSize="8" />}>
              <IconButton onClick={toggleColorMode} variant="outline" size="sm">
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
              </IconButton>
            </ClientOnly>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
