import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user-slice'
import courseSlice from './slices/course-slice'
import teacherSlice from './slices/teacher-slice'
import studentSlice from './slices/student-slice'
import classSlice from './slices/class-slice'
import moduleCourseSlice from './slices/module-course-slice'
export const store = configureStore({
  reducer: {
    userSlice,
    courseSlice,
    teacherSlice,
    studentSlice,
    classSlice,
    moduleCourseSlice
  },
})