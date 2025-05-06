import React, { useState } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  For,
  HStack,
  Portal,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import "./SideNavBar.css";
import {
  LuSearch,
  LuFastForward,
  LuBanknote,
  LuSettings,
  LuSettings2,
  LuLogOut,
} from "react-icons/lu";
import { FaCalendarDay, FaMastodon, FaBars } from "react-icons/fa";
const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {};

  const handleSideNavBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Drawer.Root placement={"start"}>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="md" onClick={handleSideNavBar}>
          <FaBars />
        </Button>
      </Drawer.Trigger>
      <Portal isOpen={isOpen}>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <InputGroup flex="1" startElement={<LuSearch />}>
                <Input placeholder="Search " />
              </InputGroup>
              <Text fontSize="12px" fontWeight="bold" mt={6}>
                TASKS
              </Text>
              <div
                className="upcomming"
                style={{
                  display: "flex",
                  marginTop: "4px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <LuFastForward /> <span className="sideBarText">All Tasks</span>
              </div>
              <div
                className="upcomming"
                style={{
                  display: "flex",
                  marginTop: "4px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <FaMastodon /> <span className="sideBarText">Today</span>
              </div>
              <div
                className="upcomming"
                style={{
                  display: "flex",
                  marginTop: "4px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <FaCalendarDay /> <span className="sideBarText">Calender</span>
              </div>
              <div
                className="upcomming"
                style={{
                  display: "flex",
                  marginTop: "4px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <LuBanknote /> <span className="sideBarText">Sticky Wall</span>
              </div>
              <Text fontSize="12px" fontWeight="bold" mt={12}>
                LISTS
              </Text>
              <div
                className="upcomming"
                style={{
                  display: "flex",
                  marginTop: "4px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <div
                  style={{
                    width: "13px",
                    height: "13px",
                    backgroundColor: "yellow",
                  }}
                ></div>{" "}
                <span className="sideBarText">Personal</span>
              </div>
              <div
                className="upcomming"
                style={{
                  display: "flex",
                  marginTop: "4px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <div
                  style={{
                    width: "13px",
                    height: "13px",
                    backgroundColor: "red",
                  }}
                ></div>{" "}
                <span className="sideBarText">Work</span>
              </div>
              <div
                className="upcomming"
                style={{
                  display: "flex",
                  marginTop: "4px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <div
                  style={{
                    width: "13px",
                    height: "13px",
                    backgroundColor: "green",
                  }}
                ></div>{" "}
                <span className="sideBarText">Entertainment</span>
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div
                  className="upcomming"
                  style={{
                    display: "flex",
                    marginTop: "4px",
                    alignItems: "center",
                    marginLeft: "8px",
                    position: "relative",
                    right: "190px",
                  }}
                >
                  <LuLogOut /> <span className="sideBarText">Sign Out</span>
                </div>
                <div
                  className="upcomming"
                  style={{
                    display: "flex",
                    marginTop: "4px",
                    alignItems: "center",
                    marginLeft: "8px",
                    position: "relative",
                    right: "190px",
                  }}
                >
                  <LuSettings2 /> <span className="sideBarText">Settings</span>
                </div>
              </div>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default SideNavBar;
