import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { Button, message, Space, Modal } from 'antd';


export default function AddUser() {
    const dispatch = useDispatch()

    const handleOk = () => {
        // dispatch(setUpdateStatus(false));
    };
    const handleCancel = () => {
        // dispatch(setUpdateStatus(false));
    };


    const [avatarUrl,setAvatarUrl] =useState(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("file",file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };
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
    
    <Modal
    title="ADD NEW USER"
    open={true}
    onOk={handleOk}
    onCancel={handleCancel}
    >
        {contextHolder}
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form
            onSubmit={(e) => {
                // handleFormSubmit(data_update.id, e);
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
                    <img 
                    src={avatarUrl}
                     alt="avatar" style={{ width: "50px", height: "50px" }} />
                    <input
                        type="file"
                        name="avatar"
                        id='avatar'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Full name of user"
                        required=""
                        onChange={handleFileChange}
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
                        // value={data_update.fullname}
                        // onChange={(e) => setFormData(e)}
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
                        // value={data_update.email}
                        // onChange={(e) => setFormData(e)}
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
                        // value={data_update.phone}
                        // onChange={(e) => setFormData(e)}
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
                        // value={data_update.role}
                        // onChange={(e) => setFormData(e)}
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
  )
}
