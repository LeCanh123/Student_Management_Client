import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Space, Modal } from 'antd';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function UpdateModuleCourse(data) {
  //data update
  const {dataUpdate}=data.data;
  const [newDataUpdate,setNewDataUpdate]=useState({start_date:"2024-03-04"});
  useEffect(() => {
    setNewDataUpdate(dataUpdate);
  }, [dataUpdate]);
  //day config
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY-MM-DD';
  

  //day time
  function getStartDay(e){
    const startDate = new Date(`${e.$y}-${e.$M+1}-${e.$D}`)
    startDate.setDate(startDate.getDate() + 1);
    setNewDataUpdate(prevData => ({
      ...prevData,
      start_date:startDate
    }));
  }
  function getEndDay(e){
    const endDate = new Date(`${e.$y}-${e.$M+1}-${e.$D}`)
    endDate.setDate(endDate.getDate() + 1);
    setNewDataUpdate(prevData => ({
      ...prevData,
      end_date:endDate
    }));
  }
  function formatDate(date) {
    if(date.length<11){
      return date
    }else{
      const previousDate = new Date(date);
      previousDate.setDate(previousDate.getDate() - 1);
      const year = previousDate.getFullYear();
      const month = String(previousDate.getMonth() + 1).padStart(2, '0');
      const day = String(previousDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }


  function convertDay(e){
    const newDate = new Date(e)
    newDate.setDate(newDate.getDate());
    return newDate
  }

  const handleFormSubmit = async (module_course_id, e) => {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      const result=await apis.moduleCourseApi.update(access_token,{formData:{...newDataUpdate,
        start_date:newDataUpdate.start_date?.length>11?newDataUpdate.start_date:convertDay(newDataUpdate.start_date),
        end_date:newDataUpdate.end_date?.length>11?newDataUpdate.end_date:convertDay(newDataUpdate.end_date),
      }, module_course_id});
      if(result.status==200){
          data.data.success("Update module course success")
          data.data.handleGetModuleCourseList()
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
      title="UPDATE MODULE COURSE INFORMATION"
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
                placeholder="Name of module course"
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
                placeholder="Module course duration"
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
                // defaultValue={dayjs('1981-01-01', dateFormat)}
                value={dayjs(formatDate(newDataUpdate.start_date), dateFormat)}
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
                // defaultValue={dayjs('1981-01-01', dateFormat)}
                value={dayjs(formatDate(newDataUpdate.end_date), dateFormat)}
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
              placeholder="Module course description"
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
