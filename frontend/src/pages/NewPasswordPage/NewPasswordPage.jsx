import React from "react";
import "./NewPasswordPage.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import NewPasswordImage from "../../assests/images/new-password.png";
import { Button, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};

const NewPasswordPage = () => {
  return (
    <AppLayout>
      <div className="new-password-page">
        <div className="new-left">
          <img src={NewPasswordImage} alt="new-password" />
        </div>
        <div className="new-right">
          <div className="new-text">
            <h1>Create New Password</h1>
            <p>
              Your new password must be different from previous used passwords.
            </p>
          </div>

          <div className="new-form">
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="signup-form"
              scrollToFirstError
            >
              <Form.Item
                name={"password"}
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                  {
                    pattern: new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                    ),
                    message:
                      "Please enter a strong password (with uppercase, lowercase, special characters and numbers)",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <div>
                  <Input.Password size="large" />
                </div>
              </Form.Item>

              <Form.Item
                name={"confirm"}
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "New password and comfirm new password do not match!"
                        )
                      );
                    },
                  }),
                ]}
                validateTrigger="onBlur"
              >
                <div>
                  <Input.Password size="large" />
                </div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewPasswordPage;
