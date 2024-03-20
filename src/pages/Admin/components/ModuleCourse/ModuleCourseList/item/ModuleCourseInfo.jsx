import React from 'react'
import {Modal } from 'antd';

export default function ModuleCourseInfo(data) {
    const {dataDetail}=data.data
    const handleOk = () => {
        data.data.setOpen(false);
    };
    const handleCancel = () => {
        data.data.setOpen(false);
    };
  return (

    <Modal
    title="MODULE COURSE DETAILS"
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
{/*Module Course Name */}
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Module Course Name
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.name}</span>
    </div>
{/* Duration */}
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Duration
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.duration}</span>
    </div>
{/* Start Date */}
    <div className="w-full">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Start Date
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.start_date?.slice(0,10)}</span>
    </div>
{/* End Date */}
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        End Date
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.end_date?.slice(0,10)}</span>
    </div>
{/* Description */}
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Description
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.description}</span>
    </div>
    </div>
    </form>
    </div>
    </Modal>
  )
}
