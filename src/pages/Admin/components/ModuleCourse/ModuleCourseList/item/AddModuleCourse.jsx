import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { Button, message, Space, Modal } from 'antd';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


export default function AddModuleCourse(data) {
    const access_token = localStorage.getItem("access_token");
    const handleOk = () => {
        data.data.setOpen(false)
    };
    const handleCancel = () => {
        data.data.setOpen(false)
    };

    //Get list course
    const [listCourse,setListCourse]= useState([])
    useEffect(()=>{
        async function getCourse(){
            let getCourse =await apis.courseApi.get_all(access_token);
            console.log("getCourse",getCourse);
            if(getCourse.status==200){
                setListCourse(getCourse.data.data)  
            }
        }
        getCourse()
    },[])
    //set course id
    function setCourseId(e) {
        setNewModuleCourseData(prevState => ({
            ...prevState,
            course_id: e
        }));
    }

    //set form
    function setFormData(e) {
        const { name, value } = e.target;
        setNewModuleCourseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    //Data submit
    const [newModuleCourseData,setNewModuleCourseData] = useState({});
    console.log("newModuleCourseData",newModuleCourseData);
    //submit
    async function handleFormSubmit(e){
        e.preventDefault() 
        if(newModuleCourseData.name&&newModuleCourseData.duration
        ){
            let createNewModuleCourse=await apis.moduleCourseApi.create(access_token,newModuleCourseData);
            if(createNewModuleCourse.status==201){
                data.data.setOpen(false);
                data.data.success(createNewModuleCourse.data?.message)
            }else{
                data.data.error(createNewModuleCourse.message)
            }
        }else{
            data.data.error("Please fill in all fields")
        }
  
    }
  return (
    
    <Modal
    title="ADD NEW MODULE COURSE"
    open={data.data.open}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form onSubmit={(e) => {handleFormSubmit(e);}}>
            <div className="grid gap-4 sm:grid-cols-1 sm:gap-6">
{/* Name + Duration*/}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Module Course Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id='name'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Name of module course"
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
{/* Course id */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="w-full">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Start date
                        </label>
                        <select id="course_id" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        
                        onChange={(e)=>{setCourseId(e.target.value);}}

                        >
                            <option selected value="none">Choose a course</option>
                            <option value="none">None</option>
                            {listCourse.map((course)=>{
                                return (
                                    <option value={course.id}>{course.name}</option>
                                )
                                
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Create Module Course
            </button>
        </form>
    </div>
    </Modal>
  )
}
