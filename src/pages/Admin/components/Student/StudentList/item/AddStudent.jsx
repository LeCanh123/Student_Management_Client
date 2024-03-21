import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { Button, message, Space, Modal } from 'antd';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import apis from '../../../../../../services/apis/modules';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


export default function AddStudent(data) {
    const handleOk = () => {
        data.data.setOpen(false)
    };
    const handleCancel = () => {
        data.data.setOpen(false)
    };

    // Date
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY-MM-DD';
    const dayNow= new Date();
    const year = dayNow.getFullYear();
    const month = (dayNow.getMonth() + 1).toString().padStart(2, '0');
    const day = dayNow.getDate().toString().padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}`;
    dayNow.setDate(dayNow.getDate() + 1);
    const newYear = dayNow.getFullYear();
    const newMonth = (dayNow.getMonth() + 1).toString().padStart(2, '0');
    const newDay = dayNow.getDate().toString().padStart(2, '0');
    const newDefaultDate = `${newYear}-${newMonth}-${newDay}`;

    //Get list class
    const [listClass,setListClass]= useState([])
    useEffect(()=>{
        async function getClass(){
            let getClass =await apis.classApi.get_all()
            if(getClass.status==200){
                setListClass(getClass.data.data)  
            }
        }
        getClass()
    },[])
    
    //Data submit
    const [newStudentData,setNewStudentData] = useState({dob:newDefaultDate});
    //Birth day
    function getDobDay(e){
        const dobDate = new Date(`${e.$y}-${e.$M+1}-${e.$D}`)
        dobDate.setDate(dobDate.getDate() + 1);
        setNewStudentData(prevData => ({
          ...prevData,
          dob:dobDate
        }));
    }


    //set form
    function setFormData(e) {
        const { name, value } = e.target;
        if(name=="email"){
            if(!isValidEmail(value)){
                setIsUserEmailvalid("Invalid email")
            }else{
                setIsUserEmailvalid("")
            }
        }
        if(name=="phone"){
            if(!isValidPhone(value)){
                setIsUserPhoneValid("Invalid phone number")
            }else{
                setIsUserPhoneValid("")
            }
        }
        setNewStudentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    //set class id
    function setClassId(e) {
        setNewStudentData(prevState => ({
            ...prevState,
            class_id: e
        }));
    }


    //submit
    async function handleFormSubmit(e){
        e.preventDefault() 
        const access_token = localStorage.getItem("access_token");
        if(newStudentData.name&&newStudentData.dob&&
            newStudentData.email,newStudentData.phone,
            newStudentData.address
        ){
            let createNewStudent=await apis.studentApi.create(access_token,newStudentData);
            if(createNewStudent.status==201){
                data.data.setOpen(false);
                data.data.success(createNewStudent.data?.message)
                data.data.getData()
            }else{
                data.data.error(createNewStudent.message)
            }
        }else{
            data.data.error("Please fill in all fields")
        }
  
    }
    
    
    //email
    const [isUserEmailvalid,setIsUserEmailvalid]=useState('')
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    //phone
    const [isUserPhoneValid,setIsUserPhoneValid]=useState('')
    function isValidPhone(phone) {
        const regex = /^\d{6,15}$/;
        return regex.test(phone);
    }
  return (
    
    <Modal
    title="ADD NEW STUDENT"
    open={data.data.open}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form onSubmit={(e) => {handleFormSubmit(e);}}>
            <div className="grid gap-4 sm:grid-cols-1 sm:gap-6">
{/* Name + Birthday*/}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Student Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id='name'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Name of student"
                            required=""
                            onChange={(e)=>{ setFormData(e)}}
                        />

                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="dob"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Dob (Birth Day)
                        </label>
                        <DatePicker
                        className="w-full"
                        defaultValue={dayjs(defaultDate, dateFormat)}
                        minDate={dayjs('1990-08-01', dateFormat)}
                        maxDate={dayjs('2100-10-31', dateFormat)}
                        onChange={(e)=>{getDobDay(e)}}
                        />
                        {/* {isUserNamevalid?<div style={{color:"red"}}>* {isUserNamevalid}</div>:null} */}
                    </div>
                </div>
{/* Email + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id='email'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Email"
                            required=""
                            onChange={(e)=>{ setFormData(e)}}
                        />
                        {isUserEmailvalid?<div style={{color:"red"}}>* {isUserEmailvalid}</div>:null}
                    </div>
                    <div className="sm:col-span-2 relative">
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Phone
                        </label>
                        <input
                            type="number"
                            name="phone"
                            id='email'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Phone"
                            required=""
                            onChange={(e)=>{ setFormData(e)}}
                        />
                        {isUserPhoneValid?<div style={{color:"red"}}>* {isUserPhoneValid}</div>:null}
                    </div>
                </div>
{/* Address */}                
                <div className="sm:col-span-2">
                    <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Address
                    </label>
                    <input 
                        type="text"
                        name="address"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                        w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Address"
                        required=""
                        onChange={(e) => setFormData(e)}
                    />
                </div>
{/* Class */}                
                <div className="sm:col-span-2">
                    <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Class
                    </label>
                    <select id="countries" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                    onChange={(e)=>{setClassId(e.target.value);}}

                    >
                        <option selected value="none">Choose a class</option>
                        <option value="none">None</option>
                        {listClass.map((classData)=>{
                            return (
                                <option value={classData.id}>{classData.name}</option>
                            )
                            
                        })}
                    </select>
                </div>
            </div>
{/* Submit */}
            <button
                type="submit"
                className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
                Add New Student
            </button>
        </form>
    </div>
    </Modal>
  )
}
