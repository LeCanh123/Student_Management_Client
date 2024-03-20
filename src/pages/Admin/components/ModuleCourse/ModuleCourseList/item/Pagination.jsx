import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { pagination } from '../../../../../../redux/slices/module-course-slice';

export default function PaginationPage() {
  const dispatch = useDispatch()
  const {skip,take,total} = useSelector((state) => state.moduleCourseSlice);
  const take_number=Number(take)
  return (
    <div>
     <>
    <Pagination defaultCurrent={1} total={total} defaultPageSize={take_number} 
    onChange={(skip)=>{
      if(skip==1){
        dispatch(pagination({skip:0}));
      }else{
        dispatch(pagination({skip:(skip-1)*take}));
      }
      }}/>
    </>
    
    </div>
  )
}
