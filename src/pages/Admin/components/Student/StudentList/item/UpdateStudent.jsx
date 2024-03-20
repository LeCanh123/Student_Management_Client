import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Space, Modal } from 'antd';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function UpdateStudent(data) {
  //data update
  const {dataUpdate}=data.data;
  const [newDataUpdate,setNewDataUpdate]=useState({});
  console.log("newDataUpdate",newDataUpdate);
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
    console.log("date",date);
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

  //Submit
  const handleFormSubmit = async (student_id, e) => {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      const result=await apis.studentApi.update(access_token,{newDataUpdate, student_id});
      console.log("result",result);
      if(result?.status==200){
          data.data.success("Update student success")
          data.data.handleGetStudentList()
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
  //Set form data
  function setFormData(e) {
      const { name, value } = e.target;
      setNewDataUpdate(prevData => ({
        ...prevData,
        [name]: value 
    }));
  }
  //set class id
  function setClassId(e) {
    setNewDataUpdate(prevState => ({
        ...prevState,
        class_id: e
    }));
  }
  //Get list class
  const [listClass,setListClass]= useState([])
  useEffect(()=>{
      async function getClass(){
          let getClass =await apis.classApi.get_all()
          if(getClass.status==200){
              setListClass(getClass.data.data)  
          }
      }
      getClass()
  },[])
  return (
    <Modal
      title="UPDATE STUDENT INFORMATION"
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
{/* Name */}
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
{/* Dob */}
            <div className="w-full">
              <label
                htmlFor="duration"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Dob (Birthday)
              </label>
              {newDataUpdate.dob?<DatePicker
                        className="w-full"
                        value={dayjs(formatDate(newDataUpdate.dob), dateFormat)}
                        minDate={dayjs('1990-08-01', dateFormat)}
                        maxDate={dayjs('2100-10-31', dateFormat)}
                        onChange={(e)=>{getDobDay(e)}}
              />:<></>}
            </div>
{/* Email */}
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
{/* Phone */}
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
{/* Address */}
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
{/* Class */}                
            <div className="sm:col-span-2">
                    <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Class
                    </label>
                    <select id="countries" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                    onChange={(e)=>{setClassId(e.target.value);}}

                    >
                        <option value="none">Choose A Class</option>
                        <option value="none">None</option>
                        {listClass.map((classData)=>{
                            return (
                                <option selected={newDataUpdate.class?.id == classData.id} value={classData.id}>{classData.name}</option>
                            )
                            
                        })}
                    </select>
            </div>
{/* Submit */}
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
