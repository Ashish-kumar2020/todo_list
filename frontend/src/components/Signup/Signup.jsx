import React, { useState } from "react";
import {
  Text,
  Button,
  Box,
  Stack,
  HStack,
  Icon,
  Field,
  Input,
  InputGroup,
  Image,
  Grid,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaApple,
  FaLock,
  FaVoicemail,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Signup.css";
import { LuUser } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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

  const signupMutation = useMutation({
    mutationFn: (userData) => {
      return axios.post(import.meta.env.VITE_API_URL_SIGNUP_ROUTE, userData);
    },
    onSuccess: (res) => {
      console.log(res.data);
    },
    onError: (err) => {
      console.error("Signup", err);
    },
  });
  function submitUserData() {
    console.log(userData);
    signupMutation.mutate(userData);
  }
  return (
    <div className="signup-container">
      <div className="signup-heading">
        <Text fontSize="32px" fontWeight="bold" mb={4}>
          Signup
        </Text>

        <div className="form-container">
          <Box mt="10px">
            <InputGroup startElement={<LuUser />}>
              <Input
                placeholder="Username"
                minWidth="60px"
                maxWidth="400px"
                value={userData.userName}
                onChange={(e) =>
                  setData({ ...userData, userName: e.target.value })
                }
              />
            </InputGroup>
          </Box>
          <Box mt="10px">
            <InputGroup startElement={<FaLock />}>
              <Input
                placeholder="Password"
                type="password"
                minWidth="60px"
                maxWidth="400px"
                value={userData.password}
                onChange={(e) =>
                  setData({ ...userData, password: e.target.value })
                }
              />
            </InputGroup>
          </Box>
          <Box mt="10px">
            <InputGroup startElement={<LuUser />}>
              <Input
                placeholder="FirstName"
                minWidth="60px"
                maxWidth="400px"
                value={userData.firstName}
                onChange={(e) =>
                  setData({ ...userData, firstName: e.target.value })
                }
              />
            </InputGroup>
          </Box>
          <Box mt="10px">
            <InputGroup startElement={<LuUser />}>
              <Input
                placeholder="LastName"
                minWidth="60px"
                maxWidth="400px"
                value={userData.lastName}
                onChange={(e) =>
                  setData({ ...userData, lastName: e.target.value })
                }
              />
            </InputGroup>
          </Box>
          <Box mt="10px">
            <InputGroup startElement={<FaVoicemail />}>
              <Input
                placeholder="Email"
                minWidth="60px"
                maxWidth="400px"
                value={userData.email}
                onChange={(e) =>
                  setData({ ...userData, email: e.target.value })
                }
              />
            </InputGroup>
          </Box>
          <Box mt="10px">
            <InputGroup startElement={<FaVoicemail />}>
              <Input
                type="date"
                placeholder="Select Date"
                minWidth="60px"
                maxWidth="400px"
                value={userData.DateOfBirth}
                onChange={(e) =>
                  setData({ ...userData, DateOfBirth: e.target.value })
                }
              />
            </InputGroup>
          </Box>
          <Box mt="20px">
            <Button
              w="100%"
              fontWeight="bold"
              fontSize="md"
              variant="outline"
              borderRadius="lg"
              py={6}
              bg="#DB4C3F"
              onClick={submitUserData}
            >
              Signup with Email
            </Button>
          </Box>
          <Box mt="20px">
            <Text fontSize="13px">
              By continuing with Google, Apple, or Email, you agree to Todoist’s{" "}
              <br />
              <Text
                as="span"
                textDecoration="underline"
                color="#DB4C3F"
                fontWeight="medium"
                cursor="pointer"
              >
                Terms of Service
              </Text>{" "}
              and
              <Text
                as="span"
                textDecoration="underline"
                color="#DB4C3F"
                fontWeight="medium"
                ml="4px"
                cursor="pointer"
              >
                Privacy Policy.
              </Text>{" "}
            </Text>
          </Box>
          <Box mt="20px" textAlign="center">
            <Text fontSize="13px">
              Already signed up?{" "}
              <Text
                as="span"
                textDecoration="underline"
                color="#DB4C3F"
                fontWeight="medium"
                cursor="pointer"
              >
                Go to login
              </Text>
            </Text>
          </Box>
        </div>
      </div>
      <div className="right-container">
        <Grid templateColumns={{ base: "1fr", md: "2fr 2fr" }} gap={8}>
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
      </div>
    </div>
  );
};

export default Signup;
