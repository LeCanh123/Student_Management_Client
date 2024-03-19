import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Space, Modal } from 'antd';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function UpdateCourse(data) {
  //data update
  const {dataUpdate}=data.data;
  const [newDataUpdate,setNewDataUpdate]=useState({start_date:"2024-03-04"});

useEffect(() => {
  setNewDataUpdate(dataUpdate);
}, [dataUpdate]);
  //day config
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY-MM-DD';
  const dayNow= new Date();
  const year = dayNow.getFullYear();
  const month = (dayNow.getMonth() + 1).toString().padStart(2, '0');
  const day = dayNow.getDate().toString().padStart(2, '0');
  const defaultDate = `${year}-${month}-${day}`;

  //day time
  function getStartDay(e){
    setNewDataUpdate(prevData => ({
      ...prevData,
      start_date:`${e.$y}-${e.$M+1}-${e.$D}`
    }));
  }
  function getEndDay(e){
    setNewDataUpdate(prevData => ({
      ...prevData,
      end_date:`${e.$y}-${e.$M+1}-${e.$D}`
    }));
  }
    const handleFormSubmit = async (course_id, e) => {
        e.preventDefault();
        const access_token = localStorage.getItem("access_token");
        const result=await apis.courseApi.update(access_token,{formData:newDataUpdate, course_id});
        if(result.status==200){
            data.data.success("Update course success")
            data.data.handleGetCourseList()
            data.data.setOpen(false)
        }else{
            data.data.error(result?.message)
        }
    };
    const handleOk = () => {
      data.data.setOpen(false)
    };
    const handleCancel = () => {
      data.data.setOpen(false)
    };
    function setFormData(e) {
        const { name, value } = e.target;
        setNewDataUpdate(prevData => ({
          ...prevData,
          [name]: value 
      }));
    }
  return (
    <Modal
      title="UPDATE COURSE INFORMATION"
      open={data.data.open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form
          onSubmit={(e) => {
            handleFormSubmit(newDataUpdate.id, e);
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
                value={newDataUpdate.name}
                onChange={(e)=>{setFormData(e)}}
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
                value={newDataUpdate.duration}
                onChange={(e)=>{setFormData(e)}}
              />
            </div>

            <div>
              <label
                htmlFor="start_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start date
              </label>
              {newDataUpdate.start_date?<DatePicker
                defaultValue={dayjs(newDataUpdate.start_date, dateFormat)}
                minDate={dayjs('1990-08-01', dateFormat)}
                maxDate={dayjs('2100-10-31', dateFormat)}
                onChange={(e)=>{getStartDay(e)}}
              />:<></>}
            </div>

            <div>
              <label
                htmlFor="end_date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End date
              </label>
              {newDataUpdate.end_date?<DatePicker
                defaultValue={dayjs(newDataUpdate.end_date, dateFormat)}
                minDate={dayjs('1990-08-01', dateFormat)}
                maxDate={dayjs('2100-10-31', dateFormat)}
                onChange={(e)=>{getEndDay(e)}}
              />:<></>}
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
              value={newDataUpdate.description}
              onChange={(e)=>{setFormData(e)}}
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
