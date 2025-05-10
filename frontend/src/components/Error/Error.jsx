import React from "react";
import { Box, Heading, Text, Button, Center, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Center minH="100vh" bg="gray.50" px={4}>
      <Box textAlign="center">
        <Image
          src="https://undraw.co/api/illustrations/39e81cd3-b0c4-45b9-b1ec-15321f1c6781"
          alt="Error"
          maxW="300px"
          mx="auto"
          mb={6}
        />
        <Heading size="2xl" color="red.500">
          Oops!
        </Heading>
        <Text mt={4} fontSize="lg" color="gray.600">
          Something went wrong. The page you're looking for doesn't exist or an
          error occurred.
        </Text>
        <Button mt={6} colorScheme="red" onClick={() => navigate("/")}>
          Go to Homepage
        </Button>
      </Box>
    </Center>
  );
};

export default ErrorPage;
