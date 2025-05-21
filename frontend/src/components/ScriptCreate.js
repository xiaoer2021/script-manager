import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ScriptCreate = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const resp = await axios.post(
        "http://localhost:8000/scripts",
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Script created successfully!");
      history.push("/scripts"); // Redirect to the script list page
    } catch (error) {
      message.error("Failed to create script.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}>
      <h2>Create New Script</h2>
      <Form
        name="script_create"
        onFinish={onFinish}
        initialValues={{
          name: "",
          content: "",
        }}
      >
        <Form.Item
          label="Script Name"
          name="name"
          rules={[{ required: true, message: "Please input the script name!" }]}
        >
          <Input placeholder="Enter script name" />
        </Form.Item>

        <Form.Item
          label="Script Content"
          name="content"
          rules={[{ required: true, message: "Please input the script content!" }]}
        >
          <Input.TextArea placeholder="Enter script content" rows={8} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create Script
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ScriptCreate;
