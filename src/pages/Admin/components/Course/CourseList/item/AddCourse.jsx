import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { Button, message, Space, Modal } from 'antd';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import apis from '../../../../../../services/apis/modules';


export default function AddCourse(data) {
    const dispatch = useDispatch()
    const handleOk = () => {
        data.data.setOpen(false)
    };
    const handleCancel = () => {
        data.data.setOpen(false)
    };

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
    const [newUserData,setNewUserData] = useState({role:"TEACHER"});
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
    //phone
    const [isUserPhoneValid,setIsUserPhoneValid]=useState('')
    function isValidPhone(phone) {
        const regex = /^\d{6,15}$/;
        return regex.test(phone);
    }
    //set form
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
            let createNewUser=await apis.userApi.register(access_token,formData);
            if(createNewUser.status==200){
                data.data.setOpen(false);
                data.data.getData()
                success(createNewUser.data?.message)
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
    
    <Modal
    title="ADD NEW USER"
    open={data.data.open}
    onOk={handleOk}
    onCancel={handleCancel}
    >
        {contextHolder}
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form
            onSubmit={(e) => {
                handleFormSubmit(e);
            }}
        >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
{/* avatar */}
                <div className="sm:col-span-2">
                    <label
                        htmlFor="avatar"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Avatar
                    </label>
                    <img 
                    src={avatarUrl}
                     alt="avatar" style={{ width: "50px", height: "50px" }} />
                    <input
                        type="file"
                        name="avatar"
                        id='avatar'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Full name of user"
                        required=""
                        onChange={handleFileChange}
                    />

                </div>
{/* user name */}
                <div className="sm:col-span-2">
                    <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="User name"
                        required=""
                        value={newUserData.username}
                        onChange={(e) => setFormData(e)}
                    />
                    {isUserNamevalid?<div style={{color:"red"}}>* {isUserNamevalid}</div>:null}
                </div>
{/* full name */}                
                <div className="sm:col-span-2">
                    <label
                        htmlFor="fullname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        FullName
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Full name of user"
                        required=""
                        value={newUserData.fullname}
                        onChange={(e) => setFormData(e)}
                    />
                </div>
{/* email */}
                <div className="w-full">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Email"
                        value={newUserData.email}
                        onChange={(e) => setFormData(e)}
                    />
                     {isUserEmailvalid?<div style={{color:"red"}}>* {isUserEmailvalid}</div>:null}
                </div>
{/* password */}
                <div className="sm:col-span-2 relative">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Password"
                        required=""
                        value={newUserData.password}
                        onChange={(e) => setFormData(e)}
                    />
                     {isUserPasswordValid?<div style={{color:"red"}}>* {isUserPasswordValid}</div>:null}
                    <button
                    type="button"
                    style={{ position: 'absolute', top: '70%', right: '8px', transform: 'translateY(-50%)' }}
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
{/* phone */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Phone
                    </label>
                    <input
                        type="number"
                        name="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Phone number"
                        value={newUserData.phone}
                        onChange={(e) => setFormData(e)}
                    />
                     {isUserPhoneValid?<div style={{color:"red"}}>* {isUserPhoneValid}</div>:null}

                </div>
{/* role */}
                <div>
                    <label
                        htmlFor="role"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            <button
                type="submit"
                className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Create
            </button>
        </form>
    </div>
    </Modal>
  )
}
