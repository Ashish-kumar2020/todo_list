import React from "react";
import { ClientOnly, IconButton, Skeleton, Box } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
import Logo from "../../assets/Logo";
import "./Header.css";
const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <div className="header-container">
      <div>
        <Logo />
      </div>
      <div>
        <Box w="100%" p="4">
          <ClientOnly fallback={<Skeleton boxSize="8" />}>
            <IconButton onClick={toggleColorMode} variant="outline" size="sm">
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
          </ClientOnly>
        </Box>
      </div>
    </div>
  );
};

export default Header;
