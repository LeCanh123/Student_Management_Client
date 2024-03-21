import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Space, Modal } from 'antd';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function UpdateTeacher(data) {
  //data update
  const {dataUpdate}=data.data;
  const [newDataUpdate,setNewDataUpdate]=useState({});
  useEffect(() => {
    setNewDataUpdate(dataUpdate);
  }, [dataUpdate]);
  // Date
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY-MM-DD';
  const dayNow= new Date();
  const year = dayNow.getFullYear();
  const month = (dayNow.getMonth() + 1).toString().padStart(2, '0');
  const day = dayNow.getDate().toString().padStart(2, '0');
  const defaultDate = `${year}-${month}-${day}`;
  
  //Birth day
  function getDobDay(e){
    const dobDate = new Date(`${e.$y}-${e.$M+1}-${e.$D}`)
    dobDate.setDate(dobDate.getDate() + 1);
    setNewDataUpdate(prevData => ({
      ...prevData,
      dob:dobDate
    }));
  }

  //day time
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

  const handleFormSubmit = async (teacher_id, e) => {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      const result=await apis.teacherApi.update(access_token,{newDataUpdate, teacher_id});
      if(result?.status==200){
          data.data.success("Update teacher success")
          data.data.handleGetTeacherList()
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
      title="UPDATE TEACHER INFORMATION"
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
                placeholder="Name"
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
                Dob (Birthday)
              </label>
              {newDataUpdate.dob?<DatePicker
                        className="w-full"
                        // defaultValue={dayjs(formatDate(newDataUpdate.start_date), dateFormat)}
                        value={dayjs(formatDate(newDataUpdate.dob), dateFormat)}
                        minDate={dayjs('1990-08-01', dateFormat)}
                        maxDate={dayjs('2100-10-31', dateFormat)}
                        onChange={(e)=>{getDobDay(e)}}
              />:<></>}
            </div>

            <div className="sm:col-span-2">
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
                required=""
                value={newDataUpdate.email}
                onChange={(e)=>{setFormData(e)}}
              />
            </div>

            <div className="sm:col-span-2">
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
                placeholder="Phone"
                required=""
                value={newDataUpdate.phone}
                onChange={(e)=>{setFormData(e)}}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Address"
                required=""
                value={newDataUpdate.address}
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
