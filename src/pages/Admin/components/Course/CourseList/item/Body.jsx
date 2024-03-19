import React from 'react'
import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { setDataUpdate,setUpdateStatus  } from '../../../../../../redux/slices/course-slice';
import UpdateCourse from './UpdateCourse';



export default function Body() {
  const dispatch = useDispatch()
  const {skip,take,total,is_search,courseList} = useSelector((state) => state.courseSlice);
  async function handleGetUserList() {
    const getList = await apis.userApi.get_all(access_token,skip,take);
    if (getList.status==200) {
    dispatch(list(getList.data.data));
    dispatch(pagination({ total: Math.round(getList.data.total) }));
    }
  }
  async function handleSearchUserList() {
      const searchList = await apis.courseApi.search(access_token,value_search,skip,take);
      if (searchList.status==200) {
          dispatch(list(searchList.data.users));
          dispatch(pagination({total:searchList.data.total}));
      }
  }
  // useEffect(()=>{
  //     if(!is_search){
  //         handleGetCourseList({})
  //     }else{
  //         handleSearchCourseList({})
  //     }
  // },[skip,take,total,is_search])


  //Detail
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = (data) => {
      setShowDetail(true);
      dispatch(info(data))
  };
  const handleOk = () => {
      setShowDetail(false);
  };
  const handleCancel = () => {
      setShowDetail(false);
  };
  //Update
  const handleOpenModalUpdate = (data) => {
    console.log("data111111",data);
      dispatch(setDataUpdate({...data,role:data.role?.[0]?.role_name}));
      dispatch(setUpdateStatus(true));
  };





  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Duration
          </th>
          <th scope="col" className="px-6 py-3">
            Start date
          </th>
          <th scope="col" className="px-6 py-3">
            End date
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {courseList.map(
          (course) => (
            <tr
              key={course.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4">{course.id}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {course.name}
              </th>
              <td className="px-6 py-4">{course.duration}</td>
              <td className="px-6 py-4">{course.start_date}</td>
              <td className="px-6 py-4">{course.end_date}</td>
              <td className="px-6 py-4">{course.description}</td>
              <td className="px-6 py-4">
                <div className="flex justify-between">
                  <Button type="dashed" dark 
                  // onClick={handleShowDetail}
                  >
                    Detail
                  </Button>
                  {showDetail && (
                    <Modal
                      title="COURSE DETAILS"
                      open={showDetail}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <p>ID: {course.id}</p>
                      <p>Name: {course.name}</p>
                      <p>Duration: {course.duration}</p>
                      <p>Start date: {course.start_date}</p>
                      <p>End date: {course.end_date}</p>
                      <p>Description: {course.description}</p>
                    </Modal>
                  )}
                  <Button
                    type="dashed"
                    dark
                    onClick={()=>handleOpenModalUpdate(course)}
                  >
                    <span>
                      <EditOutlined />
                    </span>
                  </Button>
                    {(<UpdateCourse></UpdateCourse>)}
                  <Button
                    type="dashed"
                    dark
                    onClick={() => handleDelete(course.id)}
                  >
                    <span>
                      <DeleteOutlined />
                    </span>
                  </Button>
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
  )
}
