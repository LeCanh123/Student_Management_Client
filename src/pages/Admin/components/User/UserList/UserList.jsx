import { Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import apis from "../../../../../services/apis/modules";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import { useSelector, useDispatch } from 'react-redux'
import { info,list } from "../../../../../redux/slices/user-slice";
import Search from "./item/Search";
import Body from "./item/Body";
const UserList = () => {
  const dispatch = useDispatch()
  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    async function handleGetUserList() {
      const getList = await apis.userApi.get_all(access_token);
      if (getList.status==200) {
      console.log("getList",getList.data);

      dispatch(list(getList.data));
      }
    }
    handleGetUserList();
  }, []);
  return (
    <div>
      <Search></Search>
      <Body></Body>
    </div>
  );
};

export default UserList;
