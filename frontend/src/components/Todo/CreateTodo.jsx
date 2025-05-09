import React, { useState } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Input,
  InputGroup,
  Textarea,
  Select,
  createListCollection,
  Flex,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { LuListTodo } from "react-icons/lu";
import { FaVoicemail } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createTodoApiCall } from "../../slice/createTodoSlice";
import { fetchTodos } from "../../slice/todoSlice";
const CreateTodo = ({ isOpen, onClose }) => {
  const [todoDetails, setTodoDetails] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    userID: "680de41483e5f28bb0974fba",
    tagName: "",
  });

  const frameworks = createListCollection({
    items: [
      { label: "Personal", value: "Personal" },
      { label: "Work", value: "Work" },
      { label: "Shopping", value: "Shopping" },
      { label: "Party", value: "Party" },
    ],
  });
  const taskStatusDetails = createListCollection({
    items: [
      { label: "Backlog", value: "Backlog" },
      { label: "Inprogress", value: "Inprogress" },
      { label: "Done", value: "Done" },
    ],
  });
  const dispatch = useDispatch();
  const handleCreateTodoData = async () => {
    try {
      await dispatch(createTodoApiCall(todoDetails)).unwrap();
      dispatch(fetchTodos({ userID: "680de41483e5f28bb0974fba" }));
      onClose();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <Drawer.Root open={isOpen} onClose={onClose} size="lg">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Task:</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" onClick={onClose} />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body>
              <InputGroup startElement={<LuListTodo />}>
                <Input
                  placeholder="Add Todo Title"
                  value={todoDetails.title}
                  onChange={(e) =>
                    setTodoDetails({ ...todoDetails, title: e.target.value })
                  }
                />
              </InputGroup>

              <Textarea
                placeholder="Add Todo Description..."
                mt={5}
                rows={10}
                value={todoDetails.description}
                onChange={(e) =>
                  setTodoDetails({
                    ...todoDetails,
                    description: e.target.value,
                  })
                }
              />

              {/* Select List with horizontal layout */}
              <Select.Root
                collection={frameworks}
                size="sm"
                mt={2}
                selecteditem={todoDetails.status}
                onChange={(e) =>
                  setTodoDetails({ ...todoDetails, status: e.target.value })
                }
              >
                <Select.HiddenSelect />
                <Flex align="center" gap={20} mt={4} mr={20}>
                  <Select.Label whiteSpace="nowrap">Select Tag :</Select.Label>
                  <Select.Control width="250px">
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Tag Type" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                </Flex>

                <Select.Positioner zIndex="popover">
                  <Select.Content>
                    {frameworks.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                    <InputGroup startElement={<LuListTodo />}>
                      <Input placeholder="Add New Task Type" />
                    </InputGroup>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>

              {/* date selection container */}
              <Flex align="center" justify={"center"} gap={9} mt={2}>
                {/* Label */}
                <Box minW="100px">
                  <Text fontWeight="bold">Due Date : </Text>
                </Box>

                {/* Input Field */}
                <InputGroup startElement={<FaVoicemail />} marginLeft="20px">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    minWidth="60px"
                    maxWidth="250px"
                    value={todoDetails.dueDate}
                    onChange={(e) =>
                      setTodoDetails({
                        ...todoDetails,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Flex>
              {/* Set Task Current Status */}

              <Select.Root
                collection={taskStatusDetails}
                size="sm"
                selecteditem={todoDetails.tagName}
                onChange={(e) =>
                  setTodoDetails({ ...todoDetails, tagName: e.target.value })
                }
              >
                <Select.HiddenSelect />
                <Flex align={"center"} gap={9} mt={2}>
                  <Select.Label>Select Task Type :</Select.Label>
                  <Select.Control width="250px">
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Task Status" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                </Flex>
                <Select.Positioner zIndex="popover">
                  <Select.Content>
                    {taskStatusDetails.items.map((taskStatus) => (
                      <Select.Item item={taskStatus} key={taskStatus.value}>
                        {taskStatus.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Drawer.Body>

            <Drawer.Footer>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button bg="#DB4C3F" color="#ffff" onClick={handleCreateTodoData}>
                Add Todo
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CreateTodo;
