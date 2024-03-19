import axios from "axios";

export const adminModule= {
  register: async (form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/admin",
        form_data
      )
      .then((response) => response)
      .catch((error) => {
        return error.response.data
      });
  },
};
