import React from 'react'
import { useState, useEffect } from "react";
import { Modal } from 'antd';
import apis from '../../../../../../services/apis/modules';


export default function UpdateClass(data) {
  const access_token = localStorage.getItem("access_token");
  //data update
  const {dataUpdate}=data.data;
  const [newDataUpdate,setNewDataUpdate]=useState({});
  useEffect(() => {
    setNewDataUpdate({...dataUpdate,
      course_id:dataUpdate.course?.id||null,
      teacher_id:dataUpdate.teacher?.id||null,
  });
  }, [dataUpdate]);

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
  //Get list teacher
  const [listTeacher,setListTeacher]= useState([])
  useEffect(()=>{
      async function getTeacher(){
          let getTeacher =await apis.teacherApi.get_all(access_token)
          if(getTeacher.status==200){
              setListTeacher(getTeacher.data.data)  
          }
      }
      getTeacher()
  },[])

  //Submit
  const handleFormSubmit = async (class_id, e) => {
      e.preventDefault();
      const access_token = localStorage.getItem("access_token");
      const result=await apis.classApi.update(access_token,{newDataUpdate, class_id});
      if(result?.status==200){
          data.data.success("Update class success")
          data.data.handleGetClassList()
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
  //set course id
  function setCourseId(e) {
    setNewDataUpdate(prevState => ({
        ...prevState,
        course_id: e
    }));
  }
  //set teacher id
  function setTeacherId(e) {
    setNewDataUpdate(prevState => ({
          ...prevState,
          teacher_id: e
      }));
  }

  return (
    <Modal
      title="UPDATE CLASS INFORMATION"
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
{/* Max student */}
            <div className="w-full">
              <label
                htmlFor="max_students"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Max student
              </label>
              <input
                  type="number"
                  name="max_students"
                  id='email'
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Max student"
                  required=""
                  value={newDataUpdate.max_students}
                  onChange={(e)=>{ setFormData(e)}}
              />
            </div>
{/* Course id */}
            <div className="sm:col-span-2">
              <label
                htmlFor="course_id"
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
{/* Teacher id */}
            <div className="sm:col-span-2">
              <label
                htmlFor="teacher_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Teacher
              </label>
              <select id="teacher_id" 
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
              
              onChange={(e)=>{setTeacherId(e.target.value);}}

              >
                  <option selected value="none">Choose a teacher</option>
                  <option value="none">None</option>
                  {listTeacher.map((teacher)=>{
                      return (
                          <option selected={teacher.id==newDataUpdate.teacher?.id}  value={teacher.id}>{teacher.name}</option>
                      )
                  })}
              </select>
            </div>
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
