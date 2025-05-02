import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Flex align="center" gap={3}>
      {/* Logo Icon */}
      <Box
        boxSize="40px"
        bg="#DB4C3F"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M3 5.5l7.5 2.5L21 3v2l-10.5 5L3 7.5V5.5zM3 10.5l7.5 2.5L21 8v2l-10.5 5L3 12.5v-2zM3 15.5l7.5 2.5L21 13v2l-10.5 5L3 17.5v-2z" />
        </svg>
      </Box>

      {/* Text */}
      <Text
        fontSize="2xl"
        fontWeight="semibold"
        color="#DB4C3F"
        fontFamily="sans-serif"
      >
        todoist
      </Text>
    </Flex>
  );
};

export default Logo;
