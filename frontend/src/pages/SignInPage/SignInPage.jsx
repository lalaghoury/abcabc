import React from "react";
import "./SignInPage.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import GoogleSvg from "../../assests/images/Google.svg";
import TwitterSvg from "../../assests/images/twitter.svg";
import SignInImage from "../../assests/images/signup.png";
import { Button, Divider, message, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onFinish = async (values) => {
    if (!values.email || !values.password) {
      return message.error("All fields are required");
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        values
      );
      const data = response.data;
      if (data.success) {
        message.success(data.message);
        setAuth((previousAuth) => ({
          ...previousAuth,
          user: data.user,
          token: data.token,
        }));
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.user,
            token: data.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
      setIsSubmitting(false);
    }
  };
  return (
    <AppLayout>
      <div className="signin-page">
        <div className="signin-left">
          <img src={SignInImage} alt="signin" />
        </div>
        <div className="signin-right">
          <div className="signin-main">
            <div className="signin-text">
              <h1 className="mb-50">Sign In Here</h1>
              <div className="signup-btns">
                <Button className="signup-btn" block>
                  <img src={GoogleSvg} alt="google img" />
                  <span>Continue With Google</span>
                </Button>{" "}
                <Button className="signup-btn" block>
                  <img src={TwitterSvg} alt="google img" />
                  <span>Continue With Twitter</span>
                </Button>{" "}
              </div>
            </div>
            <Divider orientation="center">
              <span className="ant-divider-inner">OR</span>
            </Divider>

            <div className="signin-form">
              <Form
                layout="vertical"
                onFinish={onFinish}
                className="signin-form"
              >
                <Form.Item
                  name={"email"}
                  label="User name or email address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your user name or email address!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input size="large" placeholder="designer@gmail.com" />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input.Password size="large" />
                </Form.Item>

                <div className="forgot-password">
                  <Link className="link text-sec" to={"/forgot-password"}>
                    Forget your password
                  </Link>
                </div>
                <Form.Item>
                  <Button
                    disabled={isSubmitting}
                    type="primary"
                    htmlType="submit"
                  >
                    {isSubmitting ? "Loading..." : "Log In"}
                  </Button>
                  <div className="mt-5">
                    Don’t have an account?{" "}
                    <Link className="link text-sec" to={"/sign-up"}>
                      Sign up
                    </Link>{" "}
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignInPage;
