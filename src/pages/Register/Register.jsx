import { message } from "antd";
import apis from "../../services/apis/modules/index";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const confirm_password = e.target.confirm_password.value;

  //   const form_data = {
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   };

  //   if (form_data.email == null || form_data.email == "") {
  //     message.warning("Email can not be blank");
  //     return false;
  //   } else if (form_data.password.length < 6) {
  //     message.warning("Password must be at least 6 characters long");
  //   } else if (form_data.password !== confirm_password) {
  //     message.warning("You have entered the wrong password");
  //     return false;
  //   }

  //   const validateEmail = (email) => {
  //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //     return emailRegex.test(email);
  //   };

  //   if (!validateEmail) {
  //     message.warning("Please enter a valid e-mail address");
  //   }

  //   await apis.userApi.register(form_data);
  // };

  //avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl,setAvatarUrl] =useState(null)
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const imageUrl = URL.createObjectURL(file);
          setAvatarUrl(imageUrl);
          setAvatarFile(file)
      }
  };

  //password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  //user name
  const [isUserNamevalid,setIsUserNamevalid]=useState('')
  function isValidUsername(username) {
      const regex = /^[a-zA-Z0-9_]{4,20}$/;
      return regex.test(username);
  }
  //email
  const [isUserEmailvalid,setIsUserEmailvalid]=useState('')
  function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }
  //password
  const [isUserPasswordValid,setIsUserPasswordValid]=useState('')
  function isValidPassword(password) {
      return password.length >= 6;
  }
  //password
  const [isConfirmPasswordValid,setIsConfirmPasswordValid]=useState('')
  function isValidConfirmPassword(password) {
    if(password != newUserData.password){
      setIsConfirmPasswordValid("Passwords do not match")
    }else{
      setIsConfirmPasswordValid()
    }
  }
  //phone
  const [isUserPhoneValid,setIsUserPhoneValid]=useState('')
  function isValidPhone(phone) {
      const regex = /^\d{6,15}$/;
      return regex.test(phone);
  }
  //set form
  const [newUserData,setNewUserData] = useState({role:"ADMIN"});
  function setFormData(e) {
      const { name, value } = e.target;
      if(name=="username"){
          if(!isValidUsername(value)){
              setIsUserNamevalid("Invalid username")
          }else{
              setIsUserNamevalid("")
          }
      }
      if(name=="email"){
          if(!isValidEmail(value)){
              setIsUserEmailvalid("Invalid email")
          }else{
              setIsUserEmailvalid("")
          }
      }
      if(name=="password"){
          if(!isValidPassword(value)){
              setIsUserPasswordValid("Invalid password")
          }else{
              setIsUserPasswordValid("")
          }
      }
      if(name=="phone"){
          if(!isValidPhone(value)){
              setIsUserPhoneValid("Invalid phone number")
          }else{
              setIsUserPhoneValid("")
          }
      }
      setNewUserData(prevState => ({
          ...prevState,
          [name]: value
      }));
  }
  //submit
  async function handleFormSubmit(e){
      e.preventDefault() 
      const access_token = localStorage.getItem("access_token");
      const formData = new FormData();
      for (let key in newUserData) {
      formData.append(key, newUserData[key]);
      }
      if(avatarFile){
          formData.append('avatar', avatarFile);
      }
      if(newUserData.username&&newUserData.password&&
          newUserData.fullname&&newUserData.email&&
          newUserData.phone
      ){
          let createNewUser=await apis.adminApi.register(formData);
          if(createNewUser.status==200){
              success(createNewUser.data?.message)
              window.location.href="/"
          }else{
              error(createNewUser.message)
          }
      }else{
          error("Please fill in all fields")
      }

  }

  //Message
  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
      messageApi.open({
          type: 'success',
          content: message,
      });
  };
  const error = (message) => {
  messageApi.open({
      type: 'error',
      content: message,
  });
  };
  return (
    <div>
      {contextHolder}
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
                Create New Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleFormSubmit}
              >
{/* avatar */}
                <div className="row flex">
                  <div className="col-sm flex-1">
                    <label
                      htmlFor="avater"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      Avatar
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      id='avatar'
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                      focus:border-primary-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-sm flex-1">
                    {avatarUrl?<img 
                      src={avatarUrl}
                      alt="avatar" style={{ width: "50px", height: "50px" ,marginTop:"11%"}} 
                    />:<></>}
                  </div>
                </div>
{/* username +full name */}
                <div className="row flex" >
                  <div className="col-sm flex-1">
                    <label
                      htmlFor="username"
                      className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      User name
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                      focus:border-primary-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 
                      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Username"
                      onChange={(e)=>{setFormData(e)}}
                    />
                    {isUserNamevalid?<div style={{color:"red"}}>* {isUserNamevalid}</div>:null}
                  </div>

                  <div className="col-sm flex-1">
                    <label
                      htmlFor="fullname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Full Name"
                      onChange={(e)=>{setFormData(e)}}
                    />
                  </div>
                </div>
{/* email + role */}      
                <div className="row flex">
                  <div className="col-sm flex-1">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block 
                      w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@gmail.com"
                      onChange={(e)=>{setFormData(e)}}
                    />
                    {isUserEmailvalid?<div style={{color:"red"}}>* {isUserEmailvalid}</div>:null}
                  </div>
                  <div className="col-sm flex-1">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      Role
                    </label>
                    <select
                        name="role"
                        value={newUserData.role}
                        onChange={(e) => setFormData(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUB_ADMIN">SUB_ADMIN</option>
                        <option value="TEACHER">TEACHER</option>
                    </select>
                  </div>
                </div>
{/* password */}
                <div className="row flex">
                  <div className="col-sm flex-1 relative">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
                        onChange={(e)=>{setFormData(e)}}
                      />
                      <button
                      type="button"
                      style={{ position: 'absolute', top: '60%', right: '45px', transform: 'translateY(-60%)' }}
                      onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {isUserPasswordValid?<div style={{color:"red"}}>* {isUserPasswordValid}</div>:null}
            
                  </div>
                  <div className="col-sm flex-1 relative">
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e)=>{isValidConfirmPassword(e.target.value)}}
                      />
                      <button
                      type="button"
                      style={{ position: 'absolute', top: '70%', right: '10px', transform: 'translateY(-60%)' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {isConfirmPasswordValid?<div style={{color:"red"}}>* {isConfirmPasswordValid}</div>:null}
                  </div>
                </div>
{/* phone */}
                <div className="row flex">
                  <div className="col-sm flex-1 relative">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      style={{color:"#0099FF"}}
                    >
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        type='number'
                        name="phone"
                        placeholder="Phone number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"
                        onChange={(e)=>{setFormData(e)}}
                      />
                    </div>
                    {isUserPhoneValid?<div style={{color:"red"}}>* {isUserPhoneValid}</div>:null}
            
                  </div>
                </div>
{/* submit  */}
                <button
                  type="submit"
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
