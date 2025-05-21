import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import axios from "axios";

const Login = ({ setToken }) => {
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setError("");
    try {
      const resp = await axios.post("http://localhost:8000/token", new URLSearchParams(values), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setToken(resp.data.access_token);
      localStorage.setItem("token", resp.data.access_token);
    } catch (e) {
      setError("Login failed, invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      {error && <Alert message={error} type="error" />}
      <Form name="login" onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
