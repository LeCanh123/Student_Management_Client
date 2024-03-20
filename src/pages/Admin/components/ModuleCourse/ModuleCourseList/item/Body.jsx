import React from 'react'
import { Button, Modal ,message} from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateModuleCourse from './UpdateModuleCourse';
import apis from '../../../../../../services/apis/modules';
import { list,pagination } from '../../../../../../redux/slices/module-course-slice';
import AddModuleCourse from './AddModuleCourse';
import ModuleCourseInfo from './ModuleCourseInfo';

export default function Body() {
  const dispatch = useDispatch()
  const access_token = localStorage.getItem("access_token");
  const {skip,take,total,is_search,moduleCourseList,value_search} = useSelector((state) => state.moduleCourseSlice);
  async function handleGetModuleCourseList() {
    const getList = await apis.moduleCourseApi.get_all(access_token,skip,take);
    if (getList.status==200) {
    dispatch(list(getList.data.data));
    dispatch(pagination({ total: Math.round(getList.data.total) }));
    }
  }
  async function handleSearchModuleCourseList() {
      const searchList = await apis.moduleCourseApi.search(access_token,value_search,skip,take);
      if (searchList.status==200) {
          dispatch(list(searchList.data.data));
          dispatch(pagination({total:searchList.data.total}));
      }
  }
  useEffect(()=>{
      if(!is_search){
          handleGetModuleCourseList({})
      }else{
          handleSearchModuleCourseList({})
      }
  },[skip,take,total,is_search])


  //Detail
  const [dataDetail, setDataDetail] = useState({});
  const handleShowDetail = (data) => {
    setOpenModelShowDetail(true)
    setDataDetail(data)
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
  //Model add module course
  const [openFormAddNewModuleCourse,setOpenFormAddNewModuleCourse]=useState(false);

  //Model show detail
  const [openModelShowDetail,setOpenModelShowDetail]=useState(false)


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
            onClick={() => setOpenFormAddNewModuleCourse(true)}
            style={{float: "right" ,background:"#0099FF",
            width:"200px",
            height:"50px",
            margin:"20px",
            borderRadius:"10px"
            }}>Add New Module Course</button>
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
        {moduleCourseList.map(
          (moduleCourse) => (
            <tr
              key={moduleCourse.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4">{moduleCourse.id}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {moduleCourse.name}
              </th>
              <td className="px-6 py-4">{moduleCourse.duration}</td>
              <td className="px-6 py-4">{moduleCourse.start_date?.slice(0,10)}</td>
              <td className="px-6 py-4">{moduleCourse.end_date?.slice(0,10)}</td>
              <td className="px-6 py-4">{moduleCourse.description}</td>
              <td className="px-6 py-4">
                <div className="flex justify-between">
                  <Button type="dashed" dark 
                  onClick={()=>handleShowDetail(moduleCourse)}
                  >
                    Detail
                  </Button>
                    <ModuleCourseInfo data={{open:openModelShowDetail,
                    setOpen:setOpenModelShowDetail,
                    dataDetail,
                    }}></ModuleCourseInfo>
                  <Button
                    type="dashed"
                    dark
                    onClick={()=>handleOpenModalUpdate(moduleCourse)}
                  >
                    <span>
                      <EditOutlined />
                    </span>
                  </Button>
                    {(<UpdateModuleCourse data={{dataUpdate,open:openModelUpdate,setOpen:setOpenModelUpdate,
                    success,error,handleGetModuleCourseList
                    }}></UpdateModuleCourse>)}
                  <Button
                    type="dashed"
                    dark
                    onClick={() => handleDelete(moduleCourse.id)}
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
    <AddModuleCourse data={{open:openFormAddNewModuleCourse,setOpen:setOpenFormAddNewModuleCourse,getData:handleGetModuleCourseList,
    success,error
    }}></AddModuleCourse>
  </div>
  )
}
