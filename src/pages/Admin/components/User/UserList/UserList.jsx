import { Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import apis from "../../../../../services/apis/modules";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import { useSelector, useDispatch } from 'react-redux'
import { info,list } from "../../../../../redux/slices/user-slice";
import Search from "./item/Search";
import Body from "./item/Body";
import PaginationPage from "./item/Pagination";
const UserList = () => {
  const dispatch = useDispatch()
  const access_token = localStorage.getItem("access_token");
  const {skip,take,total,is_search} = useSelector((state) => state.userSlice);
  console.log("skip bo qua",skip);
  console.log("tổng",total);
  useEffect(() => {
    async function handleGetUserList() {
      const getList = await apis.userApi.get_all(access_token,skip,take);
      if (getList.status==200) {
      dispatch(list(getList.data.data));
      }
    }
    handleGetUserList();
  }, []);
  return (
    <div>
      <Search></Search>
      <Body></Body>
      <PaginationPage></PaginationPage>
    </div>
  );
};

export default UserList;
