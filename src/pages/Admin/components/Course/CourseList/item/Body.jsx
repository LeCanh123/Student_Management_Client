import React from 'react'
import { Button, Modal ,message} from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateCourse from './UpdateCourse';
import apis from '../../../../../../services/apis/modules';
import { list,pagination } from '../../../../../../redux/slices/course-slice';
import AddCourse from './AddCourse';

export default function Body() {
  const dispatch = useDispatch()
  const access_token = localStorage.getItem("access_token");
  const {skip,take,total,is_search,courseList,value_search} = useSelector((state) => state.courseSlice);
  async function handleGetCourseList() {
    const getList = await apis.courseApi.get_all(access_token,skip,take);
    if (getList.status==200) {
    dispatch(list(getList.data.data));
    dispatch(pagination({ total: Math.round(getList.data.total) }));
    }
  }
  async function handleSearchCourseList() {
      const searchList = await apis.courseApi.search(access_token,value_search,skip,take);
      console.log("searchList",searchList);
      if (searchList.status==200) {
          dispatch(list(searchList.data.data));
          dispatch(pagination({total:searchList.data.total}));
      }
  }
  useEffect(()=>{
      if(!is_search){
          handleGetCourseList({})
      }else{
          handleSearchCourseList({})
      }
  },[skip,take,total,is_search])


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
  const [dataUpdate,setDataUpdate]=useState({})
  const [openModelUpdate,setOpenModelUpdate]=useState(false)
  const handleOpenModalUpdate = (data) => {
      setOpenModelUpdate(true)

      let start_date = data.start_date.slice(0, 10);
      let end_date = data.end_date.slice(0, 10);
      setDataUpdate({...data,start_date,end_date})
  };
   //model add course
   const [openFormAddNewCourse,setOpenFormAddNewCourse]=useState(false);

    //Message
    const [messageApi, contextHolder] = message.useMessage();
    const success = (message) => {
        messageApi.open({
          type: 'success',
          content: message,
        });
    };
    const error = (message) => {
      messageApi.open({
          type: 'error',
          content: message,
      });
    }


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    {contextHolder}
    <button 
            onClick={() => setOpenFormAddNewCourse(true)}
            style={{float: "right" ,background:"#0099FF",
            width:"200px",
            height:"50px",
            margin:"20px",
            borderRadius:"10px"
            }}>Add New Course</button>
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
                    {(<UpdateCourse data={{dataUpdate,open:openModelUpdate,setOpen:setOpenModelUpdate,
                    success,error,handleGetCourseList
                    }}></UpdateCourse>)}
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
    <AddCourse data={{open:openFormAddNewCourse,setOpen:setOpenFormAddNewCourse,getData:handleGetCourseList}}></AddCourse>
  </div>
  )
}
