import axios from "axios";

export const moduleCourseModule= { 
  create: async (access_token, form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/module-course", form_data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => response)
      .catch((error) => {
        return error.response.data
      });
  },

  update: async (access_token, data) => {
    return await axios
      .put(
        import.meta.env.VITE_SERVER_HOST + "/api/module-course/" + data.module_course_id,
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => response)
      .catch((error) => {
          return error.response.data
      });
  },

  delete: async (module_course_id) => {
    return await axios
      .delete(import.meta.env.VITE_SERVER_HOST + "/api/module-course/" + module_course_id)
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "Course deleted successfully",
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Course deletion failed",
        };
      });
  },

  find_by_id: async (course_id) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/module-course" + course_id)
      .then((response) => {
        return {
          status: true,
          message: "Get detailed module course information successfully",
          data: response.data,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Get failed module course details",
          data: null,
        };
      });
  },

  get_all: async (access_token,skip,take) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + `/api/module-course?skip=${skip}&take=${take}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      }
      )
      .then((response) => response)
      .catch((error) => {
        return {
          status: false,
          message: "Get the list of failed module course",
          data: null,
        };
      });
  },

  search: async (access_token,keyword,skip,take) => {
    return await axios
      .get(
        import.meta.env.VITE_SERVER_HOST +
          "/api/module-course/search?keyword=" +
          keyword+`&skip=${skip}&take=${take}`
      ,{
          headers: {
            Authorization: `Bearer ${access_token}` 
          }
      })
      .then((response) => response
      )
      .catch((error) => {
        return {
          status: false,
          message: "Module course search failed",
          data: null,
        };
      });
  },

  check_auth: async (access_token) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/classes",{
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      })
      .then((response) => response)
      .catch((error) => {
        return {
          status: false,
          data: null,
        };
      });
  },
};
