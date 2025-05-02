import React from "react";
import { ClientOnly, IconButton, Skeleton, Box, Flex } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";
const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex justify="space-between">
      <Box w="100%" p="4">
        This is the Box
        <ClientOnly fallback={<Skeleton boxSize="8" />}>
          <IconButton onClick={toggleColorMode} variant="outline" size="sm">
            {colorMode === "light" ? <LuSun /> : <LuMoon />}
          </IconButton>
        </ClientOnly>
      </Box>
    </Flex>
  );
};

export default Header;
