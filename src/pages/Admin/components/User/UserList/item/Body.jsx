import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { info } from '../../../../../../redux/slices/user-slice';
import UserInfo from '../UserInfo';
import apis from '../../../../../../services/apis/modules';
import { Button, message, Space, Modal } from 'antd';
import { list,setUpdateStatus } from '../../../../../../redux/slices/user-slice'; 
import { pagination,setDataUpdate } from '../../../../../../redux/slices/user-slice';
import UpdateUser from './UpdateUser';
import AddUser from './AddUser';
export default function Body() {
    //Store
    const dispatch = useDispatch()
    const {skip,take,total,is_search,value_search} = useSelector((state) => state.userSlice);
    const userList = useSelector((state) => state.userSlice.userList)
    const access_token = localStorage.getItem("access_token");
    async function handleGetUserList() {
        const getList = await apis.userApi.get_all(access_token,skip,take);
        if (getList.status==200) {
        dispatch(list(getList.data.data));
        dispatch(pagination({ total: Math.round(getList.data.total) }));
        }
    }
    async function handleSearchUserList() {
        const searchList = await apis.userApi.search(access_token,value_search,skip,take);
        if (searchList.status==200) {
            dispatch(list(searchList.data.users));
            dispatch(pagination({total:searchList.data.total}));
        }
    }
    useEffect(()=>{
        if(!is_search){
            handleGetUserList({})
        }else{
            handleSearchUserList({})
        }
    },[skip,take,total,is_search])
    
    
    //Detail
    const [showDetail, setShowDetail] = useState(false);
    const handleShowDetail = (data) => {
        setShowDetail(true);
        dispatch(info(data))
    };
    const handleOk = () => {
        setShowDetail(false);
    };
    const handleCancel = () => {
        setShowDetail(false);
    };
    //Update
    const handleOpenModalUpdate = (data) => {
        dispatch(setDataUpdate({...data,role:data.role?.[0]?.role_name}));
        dispatch(setUpdateStatus(true));
    };

    //model add user
    const [openFormAddnewUser,setOpenFormAddnewUser]=useState(false);
    
    //Message
    const [messageApi, contextHolder] = message.useMessage();
    const success = (message) => {
        messageApi.open({
          type: 'success',
          content: message,
        });
    };
    const error = (message) => {
    messageApi.open({
        type: 'error',
        content: message,
    });
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
             {contextHolder}
            <button 
            onClick={() => setOpenFormAddnewUser(true)}
            style={{float: "right" ,background:"#0099FF",
            width:"200px",
            height:"50px",
            margin:"20px",
            borderRadius:"10px"
            }}>Add New User</button>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(userList).map(
                        (user) => (
                            <tr
                                key={user.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4">{user.id}</td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {user.fullname}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4">{user.role?.[0].role_name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-between">
                                        <Button type="dashed" dark onClick={() => handleShowDetail({ ...user })}>
                                            Detail
                                        </Button>
                                        {showDetail && (
                                            <Modal
                                                title="USER DETAILS"
                                                open={showDetail}
                                                onOk={handleOk}
                                                onCancel={handleCancel}
                                            >
                                                <UserInfo id={{ id: user.id }} ></UserInfo>
                                            </Modal>
                                        )}
                                        <Button
                                            type="dashed"
                                            dark
                                            onClick={() => handleOpenModalUpdate(user)}
                                        >
                                            <span>
                                                <EditOutlined />
                                            </span>
                                        </Button>
                                        {(
                                          <UpdateUser data={{handleGetUserList,success,error}}></UpdateUser>
                                        )}
                                        <Button
                                            type="dashed"
                                            dark
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <span>
                                                <DeleteOutlined />
                                            </span>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
                <AddUser data={{open:openFormAddnewUser,setOpen:setOpenFormAddnewUser,getData:handleGetUserList}}></AddUser>
            </table>
        </div>
    )
}
