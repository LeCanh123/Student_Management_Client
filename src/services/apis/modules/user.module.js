import axios from "axios";

export default {
  register: async (access_token,form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/user",
        form_data
      ,
      {
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      }
      )
      .then((response) => response)
      .catch((error) => {
        return error.response.data
      });
  },
  login: async (form_data) => {
    return await axios
      .post(import.meta.env.VITE_SERVER_HOST + "/api/user/login", {
        ...form_data,
      })
      .then((response) => {
        if (response.status === 200) {
          const access_token = response.data.access_token;
          localStorage.setItem("access_token", access_token);

          return {
            status: true,
            message: "Login successful",
            data: response.data,
          };
        }
      })
      .catch((error) => {
        return {
          status: false,
          message: "Invalid email or password.",
        };
      });
  },
  get_all: async (access_token,skip,take) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + `/api/user?skip=${skip}&take=${take}`, {
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      })
      .then((response) => response)
      .catch((error) => {
        return {
          status: false,
          message: "Get list user failed",
        };
      });
  },
  search: async (access_token,keyword,skip,take) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/user/search?keyword="+keyword+`&skip=${skip}&take=${take}`, {
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      })
      .then((response) => response)
      .catch((error) => {
        return {
          status: false,
          message: "Search user failed",
        };
      });
  },
  update: async (form_data,data) => {
    return await axios
      .put(import.meta.env.VITE_SERVER_HOST + "/api/user/"+`${data.user_id}`,
        form_data
      ,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}` 
        }
      }
      )
      .then((response) => response)
      .catch((error) => {
        return error.response.data
      });
  },
};
