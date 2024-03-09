import React, { useEffect, useState } from "react";
import "./AdminLayout.scss";
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Skeleton, message } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AppLayout from "../AppLayout/AppLayout";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    const url = window.location.pathname;
    const urlArray = url.split("/");
    const selectedKeyFromURL = urlArray[urlArray.length - 1];
    setSelectedKey(selectedKeyFromURL);

    const verifyToken = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
        const response = await axios.get(
          "http://localhost:5000/api/auth/verify/admin"
        );
        const success = response.data.success;
        if (success) {
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        navigate("/page-not-found", { replace: true });
        message.error(error.response.data.message);
        setLoading(false);
        return;
      }
    };

    if (auth?.token) {
      verifyToken();
    } else {
      setLoading(false);
      navigate("/sign-in", { replace: true });
    }
  }, [auth?.token, navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 250,
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <AppLayout>
          <Skeleton style={{ width: "100%", height: "100%" }} active />
        </AppLayout>
      </div>
    );
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo2 dis-fcc">
          <h2>
            <span className="lg-logo">Ghoury's Pk</span>
            <span className="sm-logo">GP </span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey === "dashboard" ? "" : selectedKey]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              setSelectedKey(key);
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "orders-list",
              icon: <ProfileOutlined />,
              label: "Orders",
            },
            {
              key: "all-users-list",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              icon: <AppstoreAddOutlined />,
              label: "Products",
              key: "products",
              children: [
                {
                  key: "products/products-list",
                  icon: <AppstoreAddOutlined />,
                  label: "All Products List",
                },
                {
                  key: "products/add-product",
                  icon: <PlusSquareOutlined />,
                  label: "Add Product",
                },
              ],
            },
            {
              key: "categories/list",
              icon: <AppstoreAddOutlined />,
              label: "Categories",
              children: [
                {
                  key: "categories/categories-list",
                  icon: <AppstoreAddOutlined />,
                  label: "All Categories List",
                },
                {
                  key: "categories/add-category",
                  icon: <PlusSquareOutlined />,
                  label: "Add Category",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
