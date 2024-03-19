import React from "react";
import { message } from "antd";
import apis from "../../services/apis/modules/index";
import { MdOutlineLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form_data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (form_data.email == null || form_data.email == "") {
      message.warning("Email can not be blank");
      return false;
    } else if (form_data.password.length < 6) {
      message.warning("Password must be at least 6 characters long");
      return false;
    }

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    };

    if (!validateEmail) {
      message.warning("Invalid email address");
    }

    localStorage.removeItem("access_token");
    let loginResult = await apis.userApi.login(form_data);
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      navigate("/");
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-white-100 flex flex-col lg:flex-row">
        <div className="w-1/2">
          {/* Logo */}
          <img
            className="mt-1 ml-6 h-12 w-auto"
            src="https://test.rikkei.edu.vn/img/logo.ff4ef557.png"
          />
          <p
            style={{ color: "#000033" }}
            className="ml-6 mt-6 text-4xl font-bold"
          >
            Welcome to RikkeiEdu LMS
          </p>
          <img
            className="ml-6"
            src="https://img.freepik.com/vektoren-premium/person-erhaelt-wissen-aus-dem-studienbildungsbuch-konzeptvektorillustrations-mann-frauen-personengruppe_109722-5556.jpg?w=2000"
          />
        </div>
        {/* Vertical Line */}
        <div className="hidden lg:block bg-gray-200 w-1 ml-6"></div>

        {/* Form */}
        <div className="bg-white flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div>
              <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8" onSubmit={handleFormSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>

                  <input
                    aria-label="Email address"
                    name="email"
                    type="email"
                    required=""
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="name@gmail.com"
                  />
                </div>
                <div className="rounded-md shadow-sm"></div>
                <label
                  htmlFor="password"
                  className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <MdOutlineLock className="absolute inset-y-0 left-0 top-3 flex items-center pl-3 w-10 h-4" />
                  <input
                    aria-label="Password"
                    name="password"
                    type="password"
                    required=""
                    className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
                  >
                    Sign in
                  </button>
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm leading-5">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
