import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    courseList:[],
    courseInfo:{name:"canh"},
    skip:0,
    take:import.meta.env.VITE_TAKE,
    total:0,

    //search
    is_search:false,
    value_search:"",

    //update
    update_status:false,
    data_update:{}
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    info: (state,action) => {
      state.courseInfo = action.payload
    },
    list: (state,action) => {
        state.courseList = action.payload
    },
    pagination: (state,action) => {
      if(action.payload.skip!=undefined){
        state.skip = action.payload.skip
      }
      if(action.payload.total!=undefined){
        state.total = action.payload.total
      }
    },
    setSeachStatus:(state,action) => {
      state.is_search = action.payload.is_search
    },
    setSeachValue:(state,action) => {
      state.value_search = action.payload.value_search
    },
    setDataUpdate:(state,action) => {
      console.log("vaof r");
      state.data_update = action.payload
    },
    setUpdateStatus:(state,action) => {
      state.update_status = action.payload
    },
  },
})
export const { info,list,pagination,setSeachStatus,setSeachValue,setDataUpdate,setUpdateStatus } = courseSlice.actions
export default courseSlice.reducer