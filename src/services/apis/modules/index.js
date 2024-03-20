import userModule from "./user.module";
import { courseModule } from "./course.module";
import classModule from "./class.module";
import { adminModule } from "./admin.module";
import { teacherModule } from "./teacher.module";
const apis= {
  userApi: userModule,
  courseApi: courseModule,
  classApi: classModule,
  adminApi:adminModule,
  teacherApi:teacherModule,
};
export default apis;
