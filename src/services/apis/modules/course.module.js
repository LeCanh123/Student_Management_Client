import axios from "axios";

export default {
  create: async (access_token, form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/course", form_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "The course has been created successfully.",
            data: response.data,
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Invalid data. Please check and try again.",
          data: null,
        };
      });
  },

  update: async (access_token, course_id, form_data) => {
    return await axios
      .put(
        import.meta.env.VITE_SERVER_HOST + "/api/course/" + course_id,
        form_data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "Successfully updated course information",
            data: response.data,
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Update failed course information",
          data: null,
        };
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

  find_all: async () => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/course")
      .then((response) => response)
      .catch((error) => {
        return {
          status: false,
          message: "Get the list of failed courses",
          data: null,
        };
      });
  },

  search: async (keyword) => {
    return await axios
      .get(
        import.meta.env.VITE_SERVER_HOST +
          "/api/course/search?keyword=" +
          keyword
      )
      .then((response) => {
        return {
          status: true,
          message: "Search for a successful course",
          data: response.data,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Course search failed",
          data: null,
        };
      });
  },
  check_auth: async () => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/course")
      .then((response) => response)
      .catch((error) => {
        return {
          status: false,
          message: "Get the list of failed courses",
          data: null,
        };
      });
  },
};
