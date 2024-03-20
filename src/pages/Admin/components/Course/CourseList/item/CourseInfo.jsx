import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Space, Modal } from 'antd';

export default function CourseInfo(data) {


    
    const handleOk = () => {
        data.data.setOpen(false);
    };
    const handleCancel = () => {
        data.data.setOpen(false);
    };
  return (

    <Modal
    title="COURSE DETAILS"
    open={data.data.open}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <form>
    <div className="" style={{display:"block"}}>
        <label
            htmlFor="id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            Avatar
        </label>
        <img src={userInfo.avatar} style={{width:"100px",height:"100px",  border: "2px solid black"}} alt='Avatar'></img>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
    <div className="sm:col-span-2">
        <label
        htmlFor="id"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Id
        </label>
        <span
        type="text"
        name="id"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Full name of user"
        required=""
        >{userInfo.id}</span>
    </div>
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        UserName
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{userInfo.username}</span>
    </div>
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Full Name
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{userInfo.fullname}</span>
    </div>
    <div className="w-full">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Email
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{userInfo.email}</span>
    </div>
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Phone
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{userInfo.phone}</span>
    </div>
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Role
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{userInfo.role?.[0]?.role_name}</span>
    </div>
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Status
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{String(userInfo.status)}</span>
    </div>
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Created at
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{userInfo.created_at}</span>
    </div>
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Updated at
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{userInfo.updated_at}</span>
    </div>
    </div>
    </form>
    </div>
    </Modal>
  )
}
