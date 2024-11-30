import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { AppUtils } from "../../utils/app.utils";
import { ALERT_TYPE } from "../../types/alert.type";

const { Text } = Typography;

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuthContext();

  const [api, contextHolder] = notification.useNotification();

  console.log("isAuthenticated signin", isAuthenticated);
  const onFinish = async (values: any) => {
    try {
      await login(values);
      navigate("/app");
    } catch (e: any) {
      AppUtils.openNotification(ALERT_TYPE.ERROR, api, {
        message: "Error",
        description: e.message,
        placement: "topRight",
      });
    }
  };

  return (
    <div className="centeredForm">
      {contextHolder}

      <Card className="cardForm">
        <div className="container">
          <Text strong className="formTitle">
            Sign In
          </Text>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" className="button">
                Sign In
              </Button>
              <div className="formFooter">
                or{" "}
                <Link to="/signup" className="link">
                  {" "}
                  Sign Up now!{" "}
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
