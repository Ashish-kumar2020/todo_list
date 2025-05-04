import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import SideNavBar from "../SideNavBar/SideNavBar";

const Body = () => {
  return (
    <>
      <div style={{ display: "flex", padding: "10px" }}>
        <SideNavBar />
        <Outlet />
      </div>
    </>
  );
};

export default Body;
