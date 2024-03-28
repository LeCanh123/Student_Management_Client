import React, { useState } from "react";
import { GiTeacher } from "react-icons/gi";
import {
  UserOutlined,
  ApartmentOutlined,
  UsergroupAddOutlined,
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
import ClassList from "./components/Class/ClassList/ClassList";
import TeacherList from "./components/Teacher/TeacherList/TeacherList";
import UserList from "./components/User/UserList/UserList";
import StudentList from "./components/Student/StudentList/StudentList";
import ModuleCourseList from "./components/ModuleCourse/ModuleCourseList/ModuleCourseList";
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
  getItem("User", "sub0", <UserOutlined />, 
  // [
    // getItem("Create User", "11", <PlusOutlined />),
    // getItem("User list", "12", <UnorderedListOutlined />),
  // ]
  ),

  getItem("Course", "sub1", <ReadOutlined />, 
  // [
  //   getItem("Create course", "1", <PlusOutlined />),
  //   getItem("Course list", "2", <UnorderedListOutlined />),
  // ]
  ),

  getItem("Module Course", "sub7", <ReadOutlined />, 
  // [
  //   getItem("Create course", "1", <PlusOutlined />),
  //   getItem("Course list", "2", <UnorderedListOutlined />),
  // ]
  ),

  getItem("Class", "sub2", <ApartmentOutlined />, 
  // [
  //   getItem("Create class", "3", <PlusOutlined />),
  //   getItem("Class list", "4", <UnorderedListOutlined />),
  // ]
  ),

  getItem("Teacher", "sub3", <GiTeacher />, 
  // [
  //   // getItem("Create teacher", "5", <PlusOutlined />),
  //   // getItem("Teacher list", "6", <UnorderedListOutlined />),
  // ]
  ),

  getItem("Student", "sub4", <UsergroupAddOutlined />, 
  // [
  //   // getItem("Create teacher", "5", <PlusOutlined />),
  //   // getItem("Teacher list", "6", <UnorderedListOutlined />),
  // ]
  ),

  getItem("Setting", "sub5", <SettingOutlined />, [
    getItem("Profile", "7", <ProfileOutlined />),
  ]),

  getItem("Authentication", "sub6", <LockOutlined />, [
    getItem("Forgot password", "8"),
    getItem("Reset password", "9"),
  ]),

  getItem("Log out", "10", <LogoutOutlined />),
];

const Admin = () => {
  function logOut(){
    localStorage.removeItem("access_token");
    window.location.href='/'
  }
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

  //render
  const renderComponent = () => {
    switch (menuItem) {
      case "1":
        return <CreateCourse />;
      case "2":
        return <CourseList />;
      case "3":
        return <></>;
      case "4":
        return <ClassList />;
      case "5":
        return <CreateTeacher />;
      case "6":
        return <TeacherList />;
      case "10":
        logOut()
        return <>Waiting logout</>
      case "11":
        return <>User</>;
      // case "12":
      //   return <UserList/>;
      case "sub0":
        return <UserList/>;
      case "sub1":
        return <CourseList/>;
      case "sub2":
        return <ClassList/>;
      case "sub3":
        return <TeacherList/>;
      case "sub4":
        return <StudentList/>;
      case "sub7":
        return <ModuleCourseList/>;
      default:
        return  <ClassList/>;
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
