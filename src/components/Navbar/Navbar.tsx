import React from "react";
import { Layout, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth";
import styles from "./navbar.module.scss";
const { Header } = Layout;

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { logout } = useAuthContext();

  const onClick = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.content}>
          <div className={styles.appName}>My App</div>
          <div>
            <Button
              icon={<LogoutOutlined />}
              onClick={onClick}
              className={styles.navBarButton}
            >
              Logout
            </Button>
            <Button icon={<UserOutlined />} className={styles.navBarButton}>
              User
            </Button>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
