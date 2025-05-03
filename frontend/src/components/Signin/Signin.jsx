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
import "./Signin.css";

const Signin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function submitSignInDetails() {
    console.log(userData);
  }
  return (
    <div className="signin-container">
      <div className="signin-heading">
        <Text fontSize="32px" fontWeight="bold" mb={4}>
          Signin
        </Text>

        <div className="form-container">
          <Box mt="10px">
            <InputGroup startElement={<FaVoicemail />}>
              <Input
                placeholder="Email"
                minWidth="60px"
                maxWidth="400px"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </InputGroup>
          </Box>
          <Box mt="10px">
            <InputGroup startElement={<FaLock />}>
              <Input
                type="password"
                placeholder="Password"
                minWidth="60px"
                maxWidth="400px"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
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
              onClick={submitSignInDetails}
            >
              Login
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
              Don’t have an account?{" "}
              <Text
                as="span"
                textDecoration="underline"
                color="#DB4C3F"
                fontWeight="medium"
                cursor="pointer"
              >
                Signup
              </Text>
            </Text>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signin;
