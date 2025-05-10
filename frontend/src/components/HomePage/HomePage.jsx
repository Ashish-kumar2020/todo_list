import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../slice/todoSlice";
import { deleteTodoApiCall } from "../../slice/deleteTodoSlice";
import EditTodo from "../EditTodo/EditTodo";

const HomePage = () => {
  const items = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditTodoDrawerOpen, setIsEditTodoDrawerOpen] = useState(false);
  const [editCurrentTodo, setEditCurrentTodo] = useState();
  const [currentTodo, setCurrentTodo] = useState();
  const handleShowTodoComponent = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(fetchTodos({ userID: "680de41483e5f28bb0974fba" }));
  }, []);

  useEffect(() => {
    if (!isLoading && data?.todos) {
      setCurrentTodo(data.todos);
    }
  }, [isLoading, data]);

  async function handleDeleteTodo(todoID) {
    try {
      await dispatch(
        deleteTodoApiCall({
          userID: "680de41483e5f28bb0974fba",
          todoID: todoID,
        })
      ).unwrap();
      dispatch(fetchTodos({ userID: "680de41483e5f28bb0974fba" }));
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  function handleEditTodoComponent(item) {
    setEditCurrentTodo(item);
    setIsEditTodoDrawerOpen(true);
  }
  function handleCloseEditDrawer() {
    setIsEditTodoDrawerOpen(false);
  }
  return (
    <div className="todo-container">
      <div>
        <Text fontSize="32px" fontWeight="bold" mb={4}>
          Tasks
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
          {isEditTodoDrawerOpen && (
            <EditTodo
              isOpen={isEditTodoDrawerOpen}
              onClose={handleCloseEditDrawer}
              editCurrentTodo={editCurrentTodo}
            />
          )}
          <div className="todo-display">
            <Accordion.Root collapsible w={800}>
              {currentTodo &&
                currentTodo.map((item, index) => (
                  <Accordion.Item key={item.todoID} value={item.todoID}>
                    <Accordion.ItemTrigger>
                      <Span flex="1">{item.title}</Span>
                      <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                      <Accordion.ItemBody>
                        {item.description}
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                    <Accordion.ItemContent>
                      <Accordion.ItemBody>
                        <Button variant="outline" mr={5}>
                          {item.dueDate}
                        </Button>
                        <Button variant="outline" mr={5}>
                          {item.status}
                        </Button>
                        <Button variant="outline" mr={5}>
                          {item.tagName}
                        </Button>
                        <Button
                          bg="#DB4C3F"
                          color="#ffff"
                          w="70px"
                          h="40px"
                          onClick={() => {
                            handleDeleteTodo(item.todoID);
                            console.log("ITEMID", item.todoID);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          bg="green"
                          color="#ffff"
                          ml={5}
                          w="70px"
                          h="40px"
                          onClick={() => handleEditTodoComponent(item)}
                        >
                          Edit
                        </Button>
                      </Accordion.ItemBody>
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
