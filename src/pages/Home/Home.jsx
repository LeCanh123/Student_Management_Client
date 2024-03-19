import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Apis from "./../../services/apis/modules/index"  

import React from "react";
import { MdOutlineLock } from "react-icons/md";
const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    let checkAccessToken = localStorage.getItem('access_token');
    if(!checkAccessToken){
      navigate("/login")
    }else{
      let checkAuth=async()=>{
        let check=  await Apis.courseApi.check_auth(checkAccessToken)
        console.log("check",check);
        if(check.status==200){
          navigate("/admin")
        }
      }
      checkAuth()
    }
  },[])
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-auto h-12"
              src="https://test.rikkei.edu.vn/img/logo.ff4ef557.png"
              alt="logo"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 
          sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style={{width:"50%"}}
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8" >
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl "
              style={{textAlign:"center",color:"#0099FF"}}
              >
                Home Page
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="/login"
              >
                <button
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
