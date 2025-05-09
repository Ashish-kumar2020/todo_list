import React, { useState } from "react";
import {
  Text,
  Container,
  Input,
  InputGroup,
  Accordion,
  Span,
  Box,
  Button,
} from "@chakra-ui/react";
import "./HomePage.css";
import CreateTodo from "../Todo/CreateTodo";
const HomePage = () => {
  const items = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleShowTodoComponent = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="todo-container">
      <div>
        <Text fontSize="32px" fontWeight="bold" mb={4}>
          Add Todo
        </Text>
        <Container>
          <Box mt="30px">
            <Button
              w="100%"
              fontWeight="bold"
              fontSize="md"
              variant="outline"
              borderRadius="lg"
              py={6}
              bg="#DB4C3F"
              onClick={handleShowTodoComponent}
            >
              Create Task
            </Button>
          </Box>
          <CreateTodo isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
          <div className="todo-display">
            <Accordion.Root collapsible w={800}>
              {items.map((item, index) => (
                <Accordion.Item key={index} value={item.value}>
                  <Accordion.ItemTrigger>
                    <Span flex="1">{item.title}</Span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
