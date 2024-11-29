import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  notification,
  Alert,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { AppUtils } from "../../utils/app.utils";
import { ALERT_TYPE } from "../../types/alert.type";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuthContext();

  const [api, contextHolder] = notification.useNotification();

  console.log("isAuthenticated signin", isAuthenticated);
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);

    console.log("Received values of form: ", values);

    try {
      await login(values);
      navigate("/app");
    } catch (e: any) {
      AppUtils.openNotification(ALERT_TYPE.ERROR, api, {
        message: "Error",
        description: e.message,
        placement: "topRight",
      });
      console.log("errrrrrrrr in signin", e);
    }
  };

  return (
    <div className="centeredPage">
      {contextHolder}

      <Card
        style={{
          width: 300,
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" className="button">
                Sign In
              </Button>
              or{" "}
              <Link to="/signup" className="link">
                {" "}
                Sign Up now!{" "}
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;

// {/* <Form.Item>
//         <Flex justify="space-between" align="center">
//           <Form.Item name="remember" valuePropName="checked" noStyle>
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>
//           <a href="">Forgot password</a>
//         </Flex>
//       </Form.Item> */}

//           {/* <Form.Item>
//         <Button block type="primary" htmlType="submit">
//           Sign In
//         </Button>
//         or <a href="">Sign Up now!</a>
//       </Form.Item> */}
