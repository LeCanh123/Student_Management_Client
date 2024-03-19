
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import apis from "../../../../../services/apis/modules";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Search from "./item/Search";
import Body from "./item/Body";
import PaginationPage from "./item/Pagination";
import { list } from "../../../../../redux/slices/course-slice";
const CourseList = () => {
  const dispatch = useDispatch()
  const {skip,take,total,is_search,courseList} = useSelector((state) => state.courseSlice);
  console.log("courseList",courseList);
  const [allowAccess,setAllowAccess]=useState(false)
  const access_token = localStorage.getItem("access_token");

  useEffect(()=>{
    async function handleGetCourseList() {
      const getCourseList = await apis.courseApi.find_all(access_token);
      console.log("getCourseList",getCourseList);
      if (getCourseList.status==200) {
        dispatch(list(getCourseList.data));
      }
    }
    handleGetCourseList()
  },[])
 

  
  return (
    <div>
      <Search></Search>
      <Body></Body>
      <PaginationPage></PaginationPage>
    </div>
  );
};

export default CourseList;
