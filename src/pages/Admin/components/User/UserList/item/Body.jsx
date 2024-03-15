import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { info } from '../../../../../../redux/slices/user-slice';
import UserInfo from '../UserInfo';
import apis from '../../../../../../services/apis/modules';

export default function Body() {
    //Store
    const dispatch = useDispatch()
    const userList = useSelector((state) => state.userSlice.userList)

    //Detail
    const [showDetail, setShowDetail] = useState(false);
    const handleShowDetail = (data) => {
        setShowDetail(true);
        dispatch(info(data))
    };
    const handleOk = () => {
        setShowDetail(false);
        setUserUpdate(false);
    };
    const handleCancel = () => {
        setShowDetail(false);
        setUserUpdate(false);
    };
    //Update
    const [userUpdate, setUserUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    console.log("dataUpdate", dataUpdate);
    function setFormData(e) {
        const { name, value } = e.target;
        setDataUpdate(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleOpenModalUpdate = (data) => {
        setUserUpdate(true);
        setDataUpdate(data)
    };
    const handleFormSubmit = async (course_id, e) => {
        e.preventDefault();
        const access_token = localStorage.getItem("access_token");
        await apis.userApi.update(access_token, course_id);
    };


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                        {userUpdate && (
                                            <Modal
                                                title="UPDATE USER INFORMATION"
                                                open={userUpdate}
                                                onOk={handleOk}
                                                onCancel={handleCancel}
                                            >
                                                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                                    <form
                                                        onSubmit={(e) => {
                                                            handleFormSubmit(user.id, e);
                                                        }}
                                                    >
                                                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                            <div className="sm:col-span-2">
                                                                <label
                                                                    htmlFor="avatar"
                                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    Avatar
                                                                </label>
                                                                <img src={dataUpdate.avatar} alt="avatar" style={{ width: "50px", height: "50px" }} />
                                                                <input
                                                                    type="file"
                                                                    name="avatar"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                    placeholder="Full name of user"
                                                                    required=""
                                                                    // value={dataUpdate.fullname}
                                                                    onChange={(e) => setFormData(e)}
                                                                />

                                                            </div>
                                                            <div className="sm:col-span-2">
                                                                <label
                                                                    htmlFor="fullname"
                                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    FullName
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="fullname"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                    placeholder="Full name of user"
                                                                    required=""
                                                                    value={dataUpdate.fullname}
                                                                    onChange={(e) => setFormData(e)}
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                <label
                                                                    htmlFor="email"
                                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    Email
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                    placeholder="Email"
                                                                    value={dataUpdate.email}
                                                                    onChange={(e) => setFormData(e)}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label
                                                                    htmlFor="phone"
                                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    Phone
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="phone"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                    placeholder="Phone number"
                                                                    value={dataUpdate.phone}
                                                                    onChange={(e) => setFormData(e)}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label
                                                                    htmlFor="role"
                                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    Role
                                                                </label>
                                                                <select
                                                                    name="role"
                                                                    // value={formData.role}
                                                                    value={dataUpdate.role}
                                                                    onChange={(e) => setFormData(e)}
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                >
                                                                    <option value="ADMIN">ADMIN</option>
                                                                    <option value="SUB_ADMIN">SUB_ADMIN</option>
                                                                    <option value="TEACHER">TEACHER</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                                        >
                                                            Update
                                                        </button>
                                                    </form>
                                                </div>
                                            </Modal>
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
            </table>
        </div>
    )
}
