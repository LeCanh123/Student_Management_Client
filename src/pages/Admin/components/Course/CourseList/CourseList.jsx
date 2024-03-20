
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

 

  
  return (
    <div>
      <Search></Search>
      <Body></Body>
      <PaginationPage></PaginationPage>
    </div>
  );
};

export default CourseList;
