import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user-slice'
import courseSlice from './slices/course-slice'
import teacherSlice from './slices/teacher-slice'
export const store = configureStore({
  reducer: {
    userSlice,
    courseSlice,
    teacherSlice
  },
})