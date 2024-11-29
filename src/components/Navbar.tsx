// import React, { useState } from "react";
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Button, Menu } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../hooks/auth";

// export const Navbar: React.FC = () => {
//   const navigate = useNavigate();

//   const { logout } = useAuthContext();

//   const onClick = () => {
//     console.log("click ");
//     logout();
//     navigate("/");
//   };

//   return <Button onClick={onClick}> logout</Button>;
// };

// export default Navbar;

import React from "react";
import { Layout, Menu, Dropdown, Button, Space } from "antd";
import {
  DownOutlined,
  UserOutlined,
  HomeOutlined,
  SearchOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/auth";

const { Header } = Layout;

const Navbar: React.FC = () => {
  // Menu for user dropdown
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Log Out</Menu.Item>
    </Menu>
  );

  const navigate = useNavigate();

  const { logout } = useAuthContext();

  const onClick = () => {
    console.log("click ");
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <Header style={{ background: "#001529", padding: 0, height:"60px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* Logo or Brand Name */}
          <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
            My App
          </div>

          {/* Navbar Menu */}
          {/* <Menu mode="horizontal" theme="dark" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<SearchOutlined />}>
              Search
            </Menu.Item>
            <Menu.Item key="3">
              <a href="/about">About</a>
            </Menu.Item>
            <Menu.Item key="4">
              <a href="/contact">Contact</a>
            </Menu.Item>
          </Menu> */}

          {/* User Dropdown */}

          {/* <Dropdown overlay={userMenu} trigger={['click']}>
            <Button icon={<UserOutlined />} style={{ background: 'transparent', border: 'none', color: 'white' }}>
              User <DownOutlined />
            </Button>
          </Dropdown> */}

          <div>
            {/* <Button onClick={onClick}>Logout</Button> */}
            <Button
              icon={<LogoutOutlined />}
              onClick={onClick}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
              }}
            >Logout</Button>
            <Button
              icon={<UserOutlined />}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
              }}
            >
              User
            </Button>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
