import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { Button, message, Space, Modal } from 'antd';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


export default function AddCourse(data) {
    const dispatch = useDispatch()
    const handleOk = () => {
        data.data.setOpen(false)
    };
    const handleCancel = () => {
        data.data.setOpen(false)
    };

    // Date
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';
    const dayNow= new Date();
    const year = dayNow.getFullYear();
    const month = (dayNow.getMonth() + 1).toString().padStart(2, '0');
    const day = dayNow.getDate().toString().padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}`;


    //Data submit
    const [newCourseData,setNewCourseData] = useState({start_date:defaultDate,end_date:defaultDate});
    //Start date + end date
    function getStartDay(e){
        setNewCourseData(prevData => ({
          ...prevData,
          start_date:`${e.$y}-${e.$M+1}-${e.$D}`
        }));
      }
      function getEndDay(e){
        setNewCourseData(prevData => ({
          ...prevData,
          end_date:`${e.$y}-${e.$M+1}-${e.$D}`
        }));
      }

    //set form
    function setFormData(e) {
        const { name, value } = e.target;
        setNewCourseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    //submit
    async function handleFormSubmit(e){
        e.preventDefault() 
        const access_token = localStorage.getItem("access_token");

        if(newCourseData.name&&newCourseData.start_date&&
            newCourseData.end_date
        ){
            let createNewCourse=await apis.courseApi.create(access_token,newCourseData);
            console.log("createNewCourse",createNewCourse);
            if(createNewCourse.status==201){
                data.data.setOpen(false);
                data.data.success(createNewCourse.data?.message)
            }else{
                data.data.error(createNewCourse.message)
            }
        }else{
            data.data.error("Please fill in all fields")
        }
  
    }
    //Message
  return (
    
    <Modal
    title="ADD NEW COURSE"
    open={data.data.open}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form
            onSubmit={(e) => {
                handleFormSubmit(e);
            }}
        >
            <div className="grid gap-4 sm:grid-cols-1 sm:gap-6">
{/* Name + Duration*/}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Course Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id='name'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Name of course"
                            required=""
                            onChange={(e)=>{ setFormData(e)}}
                        />

                    </div>
                    <div className="sm:col-span-2">
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
                            placeholder="Duration"
                            required=""
                            onChange={(e)=>{ setFormData(e)}}
                        />
                        {/* {isUserNamevalid?<div style={{color:"red"}}>* {isUserNamevalid}</div>:null} */}
                    </div>
                </div>
{/* start date+ end date */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="w-full">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Start date
                        </label>
                        {<DatePicker
                        className="w-full"
                        defaultValue={dayjs(defaultDate, dateFormat)}
                        minDate={dayjs('1990-08-01', dateFormat)}
                        maxDate={dayjs('2100-10-31', dateFormat)}
                        onChange={(e)=>{getStartDay(e)}}
                        />}
                    </div>
                    <div className="sm:col-span-2 relative">
                        <label
                            htmlFor="enddate"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            End date
                        </label>
                        {<DatePicker
                        className="w-full"
                        defaultValue={dayjs(defaultDate, dateFormat)}
                        minDate={dayjs('1990-08-01', dateFormat)}
                        maxDate={dayjs('2100-10-31', dateFormat)}
                        onChange={(e)=>{getEndDay(e)}}
                    />}
                    </div>
                </div>
{/* Description */}                
                <div className="sm:col-span-2">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <textarea 
                        type="text"
                        name="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                        w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Course description"
                        required=""
                        onChange={(e) => setFormData(e)}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Create Course
            </button>
        </form>
    </div>
    </Modal>
  )
}
