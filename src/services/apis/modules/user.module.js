import axios from "axios";

export default {
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
        console.log("error", error);
        return {
          status: false,
          message: "Invalid email or password.",
        };
      });
  },
  get_all: async (access_token) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/user", {
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      })
      .then((response) => response)
      .catch((error) => {
        console.log("error", error);
        return {
          status: false,
          message: "Get list user failed",
        };
      });
  },
  search: async (access_token,keyword) => {
    return await axios
      .get(import.meta.env.VITE_SERVER_HOST + "/api/user/search?keyword="+keyword, {
        headers: {
          Authorization: `Bearer ${access_token}` 
        }
      })
      .then((response) => response)
      .catch((error) => {
        console.log("error", error);
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
        console.log("error", error);
        return {
          status: false,
          message: "Update user failed",
        };
      });
  },
};
