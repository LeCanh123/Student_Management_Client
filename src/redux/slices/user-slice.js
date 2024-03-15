import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userList:[],
    userInfo:{name:"canh"},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    info: (state,action) => {
      state.userInfo = action.payload
    },
    list: (state,action) => {
        state.userList = action.payload
    }
  },
})
export const { info,list } = userSlice.actions
export default userSlice.reducer