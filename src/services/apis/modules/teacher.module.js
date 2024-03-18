import axios from "axios";

export default {
  create: async (access_token, form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "api/teachers", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "The teacher has been created successfully",
            data: response.data,
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Invalid data. Please check and try again",
        };
      });
  },

  update: async (access_token, teacher_id, form_data) => {
    return await axios
      .put(
        import.meta.env.VITE_SERVER_HOST + "api/teachers" + teacher_id,
        form_data,
        {
          headers: {
            "Content-Type": "muiltipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "Teacher information has been updated successfully",
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Invalid data. Please check and try again",
        };
      });
  },

  delete: async (teacher_id) => {
    return await axios
      .delete(import.meta.env.VITE_SERVER_HOST + "api/teachers" + teacher_id)
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
      .get(import.meta.env.VITE_SERVER_HOST + "api/teachers" + teacher_id)
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
