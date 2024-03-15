import React, { useState } from "react";
import { GiTeacher } from "react-icons/gi";
import {
  ApartmentOutlined,
  LogoutOutlined,
  ReadOutlined,
  LockOutlined,
  SettingOutlined,
  ProfileOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import CreateCourse from "./components/Course/CreateCourse/CreateCourse";
import CourseList from "./components/Course/CourseList/CourseList";
import CreateClass from "./components/Class/CreateClass/CreateClass";
import ClassList from "./components/Class/ClassList/ClassList";
import CreateTeacher from "./components/Teacher/CreateTeacher/CreateTeacher";
import TeacherList from "./components/Teacher/TeacherList/TeacherList";
import UserList from "./components/User/UserList/UserList";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("User", "sub0", <ReadOutlined />, [
    getItem("Create User", "11", <PlusOutlined />),
    getItem("User list", "12", <UnorderedListOutlined />),
  ]),

  getItem("Course", "sub1", <ReadOutlined />, [
    getItem("Create course", "1", <PlusOutlined />),
    getItem("Course list", "2", <UnorderedListOutlined />),
  ]),

  getItem("Class", "sub2", <ApartmentOutlined />, [
    getItem("Create class", "3", <PlusOutlined />),
    getItem("Class list", "4", <UnorderedListOutlined />),
  ]),

  getItem("Teacher", "sub3", <GiTeacher />, [
    getItem("Create teacher", "5", <PlusOutlined />),
    getItem("Teacher list", "6", <UnorderedListOutlined />),
  ]),

  getItem("Setting", "sub4", <SettingOutlined />, [
    getItem("Profile", "7", <ProfileOutlined />),
  ]),

  getItem("Authentication", "sub5", <LockOutlined />, [
    getItem("Forgot password", "8"),
    getItem("Reset password", "9"),
  ]),

  getItem("Log out", "10", <LogoutOutlined />),
];

const Admin = () => {
  const [breadcrumb, setBreadcrumb] = useState([]);

  const [menuItem, setMenuItem] = useState(null);

  const handleMenuClick = (e) => {
    const { key } = e;
    setMenuItem(key);

    switch (key) {
      case "1":
        setBreadcrumb(["Course", "Create course"]);
        break;
      case "2":
        setBreadcrumb(["Course", "Course list"]);
        break;
      case "3":
        setBreadcrumb(["Class", "Create Class"]);
        break;
      case "4":
        setBreadcrumb(["Class", "Class list"]);
        break;
      case "5":
        setBreadcrumb(["Teacher", "Create teacher"]);
        break;
      case "6":
        setBreadcrumb(["Teacher", "Teacher list"]);
        break;
      case "7":
        setBreadcrumb(["Setting", "Profile"]);
        break;
      case "8":
        setBreadcrumb(["Authentication", "Forgot password"]);
        break;
      case "9":
        setBreadcrumb(["Authentication", "Reset password"]);
        break;
      default:
        setBreadcrumb([]);
    }
  };

  const renderComponent = () => {
    switch (menuItem) {
      case "1":
        return <CreateCourse />;
      case "2":
        return <CourseList />;
      case "3":
        return <CreateClass />;
      case "4":
        return <ClassList />;
      case "5":
        return <CreateTeacher />;
      case "6":
        return <TeacherList />;
      case "11":
        return <>User</>;
      case "12":
        return <UserList/>;
      default:
        return  <UserList />;
    }
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <img
            className="h-12 w-auto mx-auto mt-2"
            src="https://test.rikkei.edu.vn/img/logo.ff4ef557.png"
          />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {breadcrumb.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderComponent()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Rikkei Academy © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
