import React from 'react'
import { Button ,message} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState,useEffect } from 'react';
import AddClass from './AddClass';
import { useSelector, useDispatch } from 'react-redux'
import apis from '../../../../../../services/apis/modules';
import { list,pagination } from '../../../../../../redux/slices/class-slice';
import UpdateClass from './UpdateClass';
import ClassInfo from './ClassInfo';
export default function Body() {

  const dispatch = useDispatch()
  const access_token = localStorage.getItem("access_token");
  const {skip,take,total,is_search,classList,value_search} = useSelector((state) => state.classSlice);

  async function handleGetClassList() {
      const getList = await apis.classApi.get_all(access_token,skip,take);
      console.log("getList",getList);
      if (getList.status==200) {
      dispatch(list(getList.data.data));
      dispatch(pagination({ total: Math.round(getList.data.total) }));
      }
  }
  async function handleSearchClassList() {
      const searchList = await apis.classApi.search(access_token,value_search,skip,take);
      console.log("searchList",searchList);
      if (searchList.status==200) {
          dispatch(list(searchList.data.data));
          dispatch(pagination({total:searchList.data.total}));
      }
  }
  useEffect(()=>{
      if(!is_search){
        handleGetClassList({})
      }else{
        handleSearchClassList({})
      }
  },[skip,take,total,is_search])

  //Update
  const [dataUpdate,setDataUpdate]=useState({})
  const [openModelUpdate,setOpenModelUpdate]=useState(false)
  const handleOpenModalUpdate = (data) => {
    setOpenModelUpdate(true)
    setDataUpdate(data)
  };


  //Model add Class
  const [openFormAddNewClass,setOpenFormAddNewClass]=useState(false);

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
    onClick={() => setOpenFormAddNewClass(true)}
    style={{float: "right" ,background:"#0099FF",
    width:"200px",
    height:"50px",
    margin:"20px",
    borderRadius:"10px"
    }}>
        Add New Class
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
            Course
          </th>
          <th scope="col" className="px-6 py-3">
           Max Student
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Teacher
          </th>
        </tr>
      </thead>
      <tbody>
        {classList.map((class1)=>(
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">{class1.id}</td>
            <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
            {class1.name}
            </th>
            <td className="px-6 py-4">{(class1.course)?(class1.course?.name):'null'}</td>
            <td className="px-6 py-4">{class1.max_students}</td>
            <td className="px-6 py-4">{class1.status?"True":"False"}</td>
            <td className="px-6 py-4">{(class1.teacher)?(class1.teacher?.name):'null'}</td>
            <td className="px-6 py-4">
            <div className="flex justify-between">
                <Button type="dashed" dark
                onClick={()=>handleShowDetail(class1)}
                >
                Detail
                </Button>
                <ClassInfo data={{open:openModelShowDetail,
                    setOpen:setOpenModelShowDetail,
                    dataDetail,
                }}></ClassInfo>


                <Button type="dashed" dark
                  onClick={()=>handleOpenModalUpdate(class1)}
                >
                  <span>
                      <EditOutlined />
                  </span>
                </Button>
                {(<UpdateClass data={{dataUpdate,open:openModelUpdate,setOpen:setOpenModelUpdate,
                  success,error,handleGetClassList
                }}></UpdateClass>)}


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
    <AddClass data={{open:openFormAddNewClass,setOpen:setOpenFormAddNewClass,success,error,getData:handleGetClassList}} ></AddClass>
  </div>
  )
}
