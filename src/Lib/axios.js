 import axios from "axios";


 const axiosInstance = axios.create({
    baseURL:`https://blog-backend-yh6d.onrender.com/api`,
    withCredentials:true,
    headers:{
        "Content-Type" : "application/json"
    }
 })

 export default axiosInstance; 