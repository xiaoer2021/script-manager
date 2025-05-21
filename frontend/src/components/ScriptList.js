import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const ScriptList = ({ token }) => {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    const fetchScripts = async () => {
      const resp = await axios.get("http://localhost:8000/scripts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScripts(resp.data);
    };
    fetchScripts();
  }, [token]);

  const columns = [
    { title: "Script Name", dataIndex: "name", key: "name" },
    { title: "Content", dataIndex: "content", key: "content" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/scripts/${record.id}/edit`}>
            <Button>Edit</Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/scripts/new">Create New Script</Link>
      </Button>
      <Table columns={columns} dataSource={scripts} rowKey="id" />
    </div>
  );
};

export default ScriptList;
