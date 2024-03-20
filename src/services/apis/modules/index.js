import userModule from "./user.module";
import { courseModule } from "./course.module";
import classModule from "./class.module";
import { adminModule } from "./admin.module";
import { teacherModule } from "./teacher.module";
import { studentModule } from "./student.module";
import { moduleCourseModule } from "./module-course.module";
const apis= {
  userApi: userModule,
  courseApi: courseModule,
  moduleCourseApi: moduleCourseModule,
  classApi: classModule,
  adminApi:adminModule,
  teacherApi:teacherModule,
  studentApi:studentModule,
};
export default apis;
