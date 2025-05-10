import React, { useState } from "react";
import {
  Text,
  Button,
  Box,
  Input,
  InputGroup,
  Image,
  Grid,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { FaLock, FaVoicemail } from "react-icons/fa";
import "./Signup.css";
import { LuUser } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const stats = [
    {
      img: "https://todoist.b-cdn.net/assets/images/37deb75469924c6270004e36b7351d94.jpg",
      title: "30 million+",
      subtitle: "app downloads",
    },
    {
      img: "https://todoist.b-cdn.net/assets/images/296179d0173b761dc233ecd5e8ce6717.jpg",
      title: "15 years+",
      subtitle: "in business",
    },
    {
      img: "https://todoist.b-cdn.net/assets/images/36f9765400f603fa8ec42ff8146fbc15.jpg",
      title: "2 billion+",
      subtitle: "tasks completed",
    },
    {
      img: "https://todoist.b-cdn.net/assets/images/303f5819b5ed1e224afcf8407064f629.jpg",
      title: "100,000+",
      subtitle: "team users",
    },
  ];

  const [userData, setData] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    DateOfBirth: "",
  });

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (userData) =>
      axios.post(import.meta.env.VITE_API_URL_SIGNUP_ROUTE, userData),
    onSuccess: (res) => {
      if (res.data.status === 200) {
        setData({
          userName: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          DateOfBirth: "",
        });
        navigate("/login");
      }
    },
    onError: (err) => {
      console.error("Signup", err);
    },
  });

  function submitUserData() {
    signupMutation.mutate(userData);
  }

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      className="signup-container"
      p={{ base: 4, md: 8 }}
      gap={8}
    >
      <Box
        className="signup-heading"
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="32px" fontWeight="bold" mb={4}>
          Signup
        </Text>

        <Box className="form-container" w="100%" maxW="400px">
          <Stack spacing={4}>
            <InputGroup>
              <Input
                placeholder="Username"
                value={userData.userName}
                onChange={(e) =>
                  setData({ ...userData, userName: e.target.value })
                }
              />
            </InputGroup>

            <InputGroup>
              <Input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setData({ ...userData, password: e.target.value })
                }
              />
            </InputGroup>

            <InputGroup>
              <Input
                placeholder="First Name"
                value={userData.firstName}
                onChange={(e) =>
                  setData({ ...userData, firstName: e.target.value })
                }
              />
            </InputGroup>

            <InputGroup>
              <Input
                placeholder="Last Name"
                value={userData.lastName}
                onChange={(e) =>
                  setData({ ...userData, lastName: e.target.value })
                }
              />
            </InputGroup>

            <InputGroup>
              <Input
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setData({ ...userData, email: e.target.value })
                }
              />
            </InputGroup>

            <InputGroup>
              <Input
                type="date"
                value={userData.DateOfBirth}
                onChange={(e) =>
                  setData({ ...userData, DateOfBirth: e.target.value })
                }
              />
            </InputGroup>

            <Button
              w="100%"
              fontWeight="bold"
              fontSize="md"
              variant="outline"
              borderRadius="lg"
              py={6}
              bg="#DB4C3F"
              color="white"
              _hover={{ bg: "#c64538" }}
              onClick={submitUserData}
            >
              Signup with Email
            </Button>

            <Text fontSize="13px" textAlign="center">
              By continuing with Google, Apple, or Email, you agree to Taskify{" "}
              <Text
                as="span"
                textDecoration="underline"
                color="#DB4C3F"
                fontWeight="medium"
                cursor="pointer"
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                as="span"
                textDecoration="underline"
                color="#DB4C3F"
                fontWeight="medium"
                ml="4px"
                cursor="pointer"
              >
                Privacy Policy.
              </Text>
            </Text>

            <Text fontSize="13px" textAlign="center">
              Already signed up?{" "}
              <Text
                as="span"
                textDecoration="underline"
                color="#DB4C3F"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => navigate("/login")}
              >
                Go to login
              </Text>
            </Text>
          </Stack>
        </Box>
      </Box>

      <Box
        className="right-container"
        flex={1}
        display={{ base: "none", md: "block" }}
      >
        <Grid
          templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
          gap={6}
          justifyContent="center"
        >
          {stats.map((stat, idx) => (
            <Box key={idx} textAlign="center">
              <Image
                src={stat.img}
                alt={stat.title}
                boxSize="180px"
                objectFit="contain"
                mx="auto"
                mb={4}
              />
              <Text fontWeight="bold" fontSize="lg">
                {stat.title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {stat.subtitle}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Signup;
