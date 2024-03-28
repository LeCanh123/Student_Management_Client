import axios from "axios";

export default {
  create: async (access_token, form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/classes", form_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) =>response)
      .catch((error) => {
        return error.response.data
      });
  },

  update: async (access_token,data) => {
    return await axios.put(
      import.meta.env.VITE_SERVER_HOST + "/api/classes/" + data.class_id,
      {...data.newDataUpdate},
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

  delete: async (class_id) => {
    return await axios.delete(
      import.meta.env.VITE_SERVER_HOST + "api/classes/" + class_id
    );
  },

  add_student_from_file: async (access_token, form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/classes/add-student-with-excel", form_data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => response)
      .catch((error) => {
        return error.response.data
      });
  },

  find_by_id: async (class_id) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "api/classes" + class_id)
      .then((response) => {
        return {
          status: true,
          message: "The class was found successfully",
          data: response.data,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: "Class information not found with the provided ID.",
        };
      });
  },

  get_all: async (access_token,skip,take) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + `/api/classes?skip=${skip}&take=${take}`,
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
          message: "Get classed failed",
          data: null,
        };
      });
  },

  search: async (access_token,keyword,skip,take) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/classes/search?keyword=" +
      keyword+`&skip=${skip}&take=${take}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      }
      )
      .then((response) =>response)
      .catch((error) => {
        return error.response.data
      });
  },
};
