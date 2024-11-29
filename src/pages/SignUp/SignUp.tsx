import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Card } from "antd";
import { useAuthContext } from "../../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { AppUtils } from "../../utils/app.utils";
import styles from "./signUp.module.scss"; // Import the SCSS module
import { ALERT_TYPE } from "../../types/alert.type";
import { Typography } from "antd";

const { Text } = Typography;

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const { signUp } = useAuthContext();

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);

    try {
      await signUp(values);
      navigate("/app");
    } catch (e: any) {
      console.log("errrrrrrrr", e);
      AppUtils.openNotification(ALERT_TYPE.ERROR, api, {
        message: "Error",
        description: e.message,
        placement: "topRight",
      });
    }
  };

  return (
    <div className="centeredForm">
      <Card
        style={{
          width: 300,
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {contextHolder}
        <div className="container">
          <Text strong className="formTitle">
            Sign Up
          </Text>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              // rules={[{ required: true, message: "Please input your email!" }]}
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                {
                  pattern:
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, have at least 1 letter, 1 number, and 1 special character.",
                },
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
                Sign Up
              </Button>
              <div className="formFooter">
                or{" "}
                <Link to="/" className="link">
                  {" "}
                  Back to Sign In!{" "}
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;

// {
//   /* <div className={`centeredPage ${styles.centeredPage} `}></div> */
// }
