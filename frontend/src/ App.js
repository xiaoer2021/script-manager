import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScriptList from "./components/ScriptList";
import ScriptCreate from "./components/ScriptCreate";
import ScriptEdit from "./components/ScriptEdit";
import Login from "./components/Login";
import { Layout, Menu } from "antd";
import axios from "axios";

const { Header, Content } = Layout;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <a href="/">Script List</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/scripts/new">Create Script</a>
            </Menu.Item>
            <Menu.Item key="3" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ padding: 24, minHeight: 280 }}>
            <Switch>
              <Route path="/" exact>
                {token ? <ScriptList token={token} /> : <Login setToken={setToken} />}
              </Route>
              <Route path="/scripts/new">
                <ScriptCreate token={token} />
              </Route>
              <Route path="/scripts/:id/edit">
                <ScriptEdit token={token} />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
