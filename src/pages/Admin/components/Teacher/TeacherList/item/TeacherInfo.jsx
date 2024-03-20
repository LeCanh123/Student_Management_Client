import React from 'react'
import {Modal } from 'antd';

export default function TeacherInfo(data) {
    const {dataDetail}=data.data 
    const handleOk = () => {
        data.data.setOpen(false);
    };
    const handleCancel = () => {
        data.data.setOpen(false);
    };
  return (

    <Modal
    title="TEACHER DETAILS"
    open={data.data.open}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <form>
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
{/* Id */}
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
        >{dataDetail.id}</span>
    </div>
{/* Teacher Name */}
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Teacher Name
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.name}</span>
    </div>
{/* Dob (Birthday) */}
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Dob (Birthday)
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.dob?.slice(0,10)}</span>
    </div>
{/* Email */}
    <div className="w-full">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Email
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.email}</span>
    </div>
{/* Phone */}
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Phone
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.phone}</span>
    </div>
{/* Status */}
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Status
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.status?"true":"false"}</span>
    </div>
{/* Address */}
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Address
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.address}</span>
    </div>
    </div>
    </form>
    </div>
    </Modal>
  )
}
