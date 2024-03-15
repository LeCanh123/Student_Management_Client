import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Apis from "./../../services/apis/modules/index"  
const Home = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    let checkAccessToken = localStorage.getItem('access_token');
    if(!checkAccessToken){
      navigate("/login")
    }else{
      let checkAuth=async()=>{
        let check=  await Apis.courseApi.check_auth()
        if(check.status==200){
          navigate("/admin")
        }
      }
      checkAuth()
    }
  },[])
  return (
    <>Home</>
  );
};
export default Home;
