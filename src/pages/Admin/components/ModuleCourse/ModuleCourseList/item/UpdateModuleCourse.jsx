import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Space, Modal } from 'antd';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function UpdateModuleCourse(data) {
  const access_token = localStorage.getItem("access_token");
  //data update
  const {dataUpdate}=data.data;
  const [newDataUpdate,setNewDataUpdate]=useState();
  useEffect(() => {
    setNewDataUpdate({...dataUpdate,
      course_id:(dataUpdate.course?.id)?dataUpdate.course:null
    });
  }, [dataUpdate]);

  //Submit
  const handleFormSubmit = async (module_course_id, e) => {
      e.preventDefault();
      const result=await apis.moduleCourseApi.update(access_token,{formData:newDataUpdate, module_course_id});
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

  //Set form
  function setFormData(e) {
      const { name, value } = e.target;
      setNewDataUpdate(prevData => ({
        ...prevData,
        [name]: value 
    }));
  }

  //Get list course
  const [listCourse,setListCourse]= useState([])
  useEffect(()=>{
      async function getCourse(){
          let getCourse =await apis.courseApi.get_all(access_token);
          if(getCourse.status==200){
              setListCourse(getCourse.data.data)  
          }
      }
      getCourse()
  },[])
  //set course id
  function setCourseId(e) {
    setNewDataUpdate(prevState => ({
        ...prevState,
        course_id: e
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
                placeholder="Name of module course"
                required=""
                value={newDataUpdate?.name}
                onChange={(e)=>{setFormData(e)}}
              />
            </div>
{/* Duration */}
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
                value={newDataUpdate?.duration}
                onChange={(e)=>{setFormData(e)}}
              />
            </div>
{/* Course */}
            <div>
              <label
                htmlFor="course"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Course
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
                          <option selected={course.id==newDataUpdate.course?.id} value={course.id}>{course.name}</option>
                      )
                  })}
              </select>
            </div>
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
