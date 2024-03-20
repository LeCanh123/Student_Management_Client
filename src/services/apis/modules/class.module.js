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
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "The class has been created successfully.",
            data: response.data,
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Invalid data. Please check and try again.",
        };
      });
  },

  update: async (access_token, class_id, form_data) => {
    return (await axios.put(
      import.meta.env.VITE_SERVER_HOST + "api/classes" + class_id
    ),
    form_data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return {
            status: true,
            message: "Class information has been updated successfully",
            data: response.data,
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Invalid data. Please check and try again.",
        };
      });
  },

  delete: async (class_id) => {
    return await axios.delete(
      import.meta.env.VITE_SERVER_HOST + "api/classes/" + class_id
    );
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
    console.log("keyword",keyword);
    console.log("skip",skip);
    console.log("take",take);
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
