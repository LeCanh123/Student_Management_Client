import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Space, Modal } from 'antd';
import { setUpdateStatus,setDataUpdate,pagination } from '../../../../../../redux/slices/course-slice';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';


export default function UpdateCourse(data) {
    const dispatch = useDispatch()
    const {update_status} = useSelector((state) => state.courseSlice);
    console.log("update_status",update_status);
    const handleFormSubmit = async (course_id, e) => {
        e.preventDefault();
        const access_token = localStorage.getItem("access_token");
        const formData = new FormData();
        for (const key in data_update) {
            formData.append(key, data_update[key]);
        }
        const file = e.target.elements.avatar.files[0];
        if (file) {
            formData.append('avatar', file);
        }
        if(isUserPasswordValid!=""){
            data.data.error("Invalid password")
            return
        }
        const result=await apis.userApi.update(formData,{access_token, user_id});
        if(result.status==200){
            data.data.success("Update info success")
            dispatch(setUpdateStatus(false));
            data.data.handleGetUserList()
            setAvatarUrl(null)
        }else{
            data.data.error(result?.message)
        }
    };
    const [avatarUrl,setAvatarUrl] =useState(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };
    const handleOk = () => {
        dispatch(setUpdateStatus(false));
        setAvatarUrl(null)
    };
    const handleCancel = () => {
        dispatch(setUpdateStatus(false));
        setAvatarUrl(null)
    };
    const {data_update} = useSelector((state) => state.courseSlice);
    console.log("data_update",data_update);
    function setFormData(e) {
        const { name, value } = e.target;
        dispatch(setDataUpdate({...data_update,[name]: value}))
    }
  return (
    <Modal
      title="UPDATE COURSE INFORMATION"
      open={update_status}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form
          onSubmit={(e) => {
            handleFormSubmit(course.id, e);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Name of course"
                required=""
                value={data_update.name}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="duration"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Duration
              </label>
              <input
                type="number"
                name="duration"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Course duration"
                value={data_update.duration}

              />
            </div>

            <div>
              <label
                htmlFor="start_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start date
              </label>
              {/* <input
                type="text"
                name="start_date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="YYYY-MM-DD"
                value={data_update.start_date}
              /> */}
               <DatePicker
    defaultValue={dayjs('2019-09-03', dateFormat)}
    minDate={dayjs('2019-08-01', dateFormat)}
    maxDate={dayjs('2020-10-31', dateFormat)}
  />
            </div>

            <div>
              <label
                htmlFor="end_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End date
              </label>
              <input
                type="text"
                name="end_date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="YYYY-MM-DD"
                value={data_update.end_date}

              />
            </div>
          </div>

          <div className="mt-6 sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              type="text"
              name="description"
              rows={8}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Course description"
              value={data_update.description}
            />
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
