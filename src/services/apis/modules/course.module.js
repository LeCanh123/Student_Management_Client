import axios from "axios";

export const courseModule= {
  create: async (access_token, form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/course", form_data, {
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
    console.log("dataa");
    return await axios
      .put(
        import.meta.env.VITE_SERVER_HOST + "/api/course/" + data.course_id,
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

  delete: async (course_id) => {
    return await axios
      .delete(import.meta.env.VITE_SERVER_HOST + "/api/course/" + course_id)
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
      .get(import.meta.env.VITE_SERVER_HOST + "/api/course" + course_id)
      .then((response) => {
        return {
          status: true,
          message: "Get detailed course information successfully",
          data: response.data,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Get failed course details",
          data: null,
        };
      });
  },

  get_all: async (access_token,skip,take) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + `/api/course?skip=${skip}&take=${take}`,
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
          message: "Get the list of failed courses",
          data: null,
        };
      });
  },

  search: async (access_token,keyword,skip,take) => {
    return await axios
      .get(
        import.meta.env.VITE_SERVER_HOST +
          "/api/course/search?keyword=" +
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
          message: "Course search failed",
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
        console.log("erroer",error);
        return {
          status: false,
          data: null,
        };
      });
  },
};
