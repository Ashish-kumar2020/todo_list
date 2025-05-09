import React from "react";
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
import {
  FaFacebook,
  FaApple,
  FaLock,
  FaVoicemail,
  FaCalendarAlt,
} from "react-icons/fa";
const CreateTodo = ({ isOpen, onClose }) => {
  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });
  const taskStatusDetails = createListCollection({
    items: [
      { label: "Backlog", value: "Backlog" },
      { label: "Inprogress", value: "Inprogress" },
      { label: "Done", value: "Done" },
    ],
  });

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
                <Input placeholder="Add Todo Title" />
              </InputGroup>

              <Textarea
                placeholder="Add Todo Description..."
                mt={5}
                rows={10}
              />

              {/* Select List with horizontal layout */}
              <Select.Root collection={frameworks} size="sm" mt={2}>
                <Select.HiddenSelect />
                <Flex align="center" gap={10} mt={4} mr={20}>
                  <Select.Label whiteSpace="nowrap">
                    Select Task type :
                  </Select.Label>
                  <Select.Control width="250px">
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Task Type" />
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
                  />
                </InputGroup>
              </Flex>
              {/* Set Task Current Status */}

              <Select.Root collection={taskStatusDetails} size="sm">
                <Select.HiddenSelect />
                <Flex align={"center"} gap={20} mt={2}>
                  <Select.Label>Select Tag :</Select.Label>
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
              <Button bg="#DB4C3F" color="#ffff">
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
