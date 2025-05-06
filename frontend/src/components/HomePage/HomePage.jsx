import React from "react";
import {
  Text,
  Container,
  Input,
  InputGroup,
  Accordion,
  Span,
} from "@chakra-ui/react";
import { LuCalendarPlus } from "react-icons/lu";
const HomePage = () => {
  const items = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
  ];
  return (
    <div>
      <Text fontSize="32px" fontWeight="bold" mb={4}>
        Todo
      </Text>
      <div>
        <Container>
          <InputGroup startElement={<LuCalendarPlus />} w={800}>
            <Input placeholder="Add New Task" />
          </InputGroup>
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
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
