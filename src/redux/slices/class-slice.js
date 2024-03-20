import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    classList:[],
    classInfo:{name:"canh"},
    skip:0,
    take:import.meta.env.VITE_TAKE,
    total:0,

    //search
    is_search:false,
    value_search:"",
}

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    info: (state,action) => {
      state.classInfo = action.payload
    },
    list: (state,action) => {
        state.classList = action.payload
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
  },
})
export const { info,list,pagination,setSeachStatus,setSeachValue } = classSlice.actions
export default classSlice.reducer