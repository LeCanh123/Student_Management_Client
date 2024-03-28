import React from 'react'
import {Modal } from 'antd';

export default function ClassInfo(data) {
    const {dataDetail}=data.data 
    const handleOk = () => {
        data.data.setOpen(false);
    };
    const handleCancel = () => {
        data.data.setOpen(false);
    };
  return (

    <Modal
    title="CLASS DETAILS"
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
{/* Class Name */}
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Class Name
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.name}</span>
    </div>
{/* Course Id */}
    <div className="sm:col-span-2">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Course
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{
            (dataDetail.course)?(dataDetail.course?.name):'null'
        }</span>
    </div>
{/* Teacher id */}
    <div className="w-full">
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Teacher
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{
            (dataDetail.teacher)?(dataDetail.teacher?.name + " - phone: "+ dataDetail.teacher?.phone):'null'
        }</span>
    </div>
{/* Max student */}
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Max Student
        </label>
        <span
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >{dataDetail.max_students}</span>
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
    </div>
{/* Student list */}
    <div>
        <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
        Student List
        </label>
    <table style={{width:"100%",border:"1px solid",borderCollapse:"collapse"}}>
        <tr>
            <th style={{border:"1px solid"}}>ID</th>
            <th style={{border:"1px solid"}}>Name</th>
            <th style={{border:"1px solid"}}>Email</th>
        </tr>
        {(dataDetail?.student?.length>0)&&(dataDetail?.student?.map((OneStudent)=>{
            return  <tr>
                        <td style={{border:"1px solid"}}>{OneStudent.id}</td>
                        <td style={{border:"1px solid"}}>{OneStudent.name}</td>
                        <td style={{border:"1px solid"}}>{OneStudent.email}</td>
                    </tr>
        }))}
    </table>
    </div>
{/* End Student List */}
    </form>

    </div>
    </Modal>
  )
}
