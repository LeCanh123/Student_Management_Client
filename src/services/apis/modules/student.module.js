import axios from "axios";

export const studentModule= {
  create: async (access_token, form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/students", form_data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => response)
      .catch((error) => {
        return error.response.data
      });
  },

  search: async (access_token,keyword,skip,take) => {
    return await axios
      .get(
        import.meta.env.VITE_SERVER_HOST +
          "/api/students/search?keyword=" +
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
          message: "Search teacher failed",
          data: null,
        };
      });
  },

  get_all: async (access_token,skip,take) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + `/api/students?skip=${skip}&take=${take}`,
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
          message: "Get students list failed",
          data: null,
        };
      });
  },

  update: async (access_token, data) => {
    return await axios
      .put(
        import.meta.env.VITE_SERVER_HOST + "/api/students/" + data.student_id,
        data.newDataUpdate,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => response)
      .catch((error) => {
       return  error?.response?.data
      });
  },

  delete: async (teacher_id) => {
    return await axios
      .delete(import.meta.env.VITE_SERVER_HOST + "api/students" + teacher_id)
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "Deleted teacher successfully",
            data: response.data,
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "You do not have permission to delete this teacher",
        };
      });
  },

  find_by_id: async (teacher_id) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "api/students" + teacher_id)
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "Find details of teacher successfully",
          };
        }
      }).catch((error) => {
        return {
            status: false,
            message: "Teacher information with the provided ID could not be found"
        }
      });
  },
};
