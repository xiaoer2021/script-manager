import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const ScriptEdit = ({ token }) => {
  const { id } = useParams(); // 获取URL中的id参数
  const history = useHistory();
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 通过 id 获取脚本数据
    const fetchScript = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/scripts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScript(response.data);
      } catch (error) {
        message.error("Failed to fetch script data.");
      }
    };

    fetchScript();
  }, [id, token]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const resp = await axios.put(
        `http://localhost:8000/scripts/${id}`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Script updated successfully!");
      history.push("/scripts"); // Redirect to script list page
    } catch (error) {
      message.error("Failed to update script.");
    } finally {
      setLoading(false);
    }
  };

  if (!script) {
    return <div>Loading...</div>; // Loading state while fetching the script data
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}>
      <h2>Edit Script</h2>
      <Form
        name="script_edit"
        onFinish={onFinish}
        initialValues={{
          name: script.name,
          content: script.content,
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
            Update Script
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ScriptEdit;
