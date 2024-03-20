import React from 'react'
import { Button ,message} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState,useEffect } from 'react';
import AddTeacher from './AddTeacher';
import { useSelector, useDispatch } from 'react-redux'
import apis from '../../../../../../services/apis/modules';
import { list,pagination } from '../../../../../../redux/slices/teacher-slice';
import UpdateTeacher from './UpdateTeacher';
import TeacherInfo from './TeacherInfo';
export default function Body() {

  const dispatch = useDispatch()
  const access_token = localStorage.getItem("access_token");
  const {skip,take,total,is_search,teacherList,value_search} = useSelector((state) => state.teacherSlice);
  async function handleGetTeacherList() {
      const getList = await apis.teacherApi.get_all(access_token,skip,take);
      if (getList.status==200) {
      dispatch(list(getList.data.data));
      dispatch(pagination({ total: Math.round(getList.data.total) }));
      }
  }
  async function handleSearchTeacherList() {
      const searchList = await apis.teacherApi.search(access_token,value_search,skip,take);
      if (searchList.status==200) {
          dispatch(list(searchList.data.data));
          dispatch(pagination({total:searchList.data.total}));
      }
  }
  useEffect(()=>{
      if(!is_search){
        handleGetTeacherList({})
      }else{
        handleSearchTeacherList({})
      }
  },[skip,take,total,is_search])

  //Update
  const [dataUpdate,setDataUpdate]=useState({})
  const [openModelUpdate,setOpenModelUpdate]=useState(false)
  const handleOpenModalUpdate = (data) => {
    setOpenModelUpdate(true)
    setDataUpdate(data)
  };


  //Model add teacher
  const [openFormAddNewTeacher,setOpenFormAddNewTeacher]=useState(false);

  //Detail
  const [dataDetail, setDataDetail] = useState({});
  const handleShowDetail = (data) => {
    setOpenModelShowDetail(true)
    setDataDetail(data)
  };
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
    onClick={() => setOpenFormAddNewTeacher(true)}
    style={{float: "right" ,background:"#0099FF",
    width:"200px",
    height:"50px",
    margin:"20px",
    borderRadius:"10px"
    }}>
        Add New Teacher
    </button>
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
            Date of birth
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Phone number
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {teacherList.map((teacher)=>(
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">{teacher.id}</td>
            <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
            {teacher.name}
            </th>
            <td className="px-6 py-4">{teacher.dob?.slice(0,10)}</td>
            <td className="px-6 py-4">{teacher.email}</td>
            <td className="px-6 py-4">{teacher.phone}</td>
            <td className="px-6 py-4">
            <div className="flex justify-between">
                <Button type="dashed" dark
                onClick={()=>handleShowDetail(teacher)}
                >
                Detail
                </Button>
                <TeacherInfo data={{open:openModelShowDetail,
                    setOpen:setOpenModelShowDetail,
                    dataDetail,
                }}></TeacherInfo>


                <Button type="dashed" dark
                  onClick={()=>handleOpenModalUpdate(teacher)}
                >
                  <span>
                      <EditOutlined />
                  </span>
                </Button>
                {(<UpdateTeacher data={{dataUpdate,open:openModelUpdate,setOpen:setOpenModelUpdate,
                  success,error,handleGetTeacherList
                }}></UpdateTeacher>)}


                <Button type="dashed" dark>
                <span>
                    <DeleteOutlined />
                </span>
                </Button>
            </div>
            </td>
            </tr>
        ))}

      </tbody>
    </table>
    <AddTeacher data={{open:openFormAddNewTeacher,setOpen:setOpenFormAddNewTeacher,success,error,getData:handleGetTeacherList}} ></AddTeacher>
  </div>
  )
}
