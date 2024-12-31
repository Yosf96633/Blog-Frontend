import { create } from "zustand";
import axiosInstance from "../Lib/axios";
import { message } from "antd";

export const useAuth = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('UserData')),
  loading:false, 
  sign_up : async ({name , email , password}) => {
    set({loading:true})
    try {
      const response = await axiosInstance.post(`/auth/register` , {name , email , password});
      if(response.data)
        return {
           userData:response.data.userData,
           status:true,
      }
    } catch (error) {
      return {
           msg : error.response.data.message,
           status  :error.response.data.status,
      };
    }
    finally{
      set({loading:false})
    }
  },
  login: async ({ email, password }) => {
     set({loading:true})
   try {
    const response = await axiosInstance.post(`/auth/login`, {
        email,
        password,
      });
      if (response.data) {
        console.log(response.data.userData);
        
        localStorage.setItem(`UserData` , JSON.stringify(response.data.userData))
        set({user:response.data.userData});
        return {
          msg : response.data.message,
          status: response.data.success,
        };
      }
   } catch (error) {
       return {
        msg : error.response.data.message,
        status: error.response.data.success,
       }

   }
   finally{
    set({loading:false});
   }
  },
  logout : async () => {
    try {
       const response = await axiosInstance.post(`/auth/logout`);
       if(response.data.success){
           localStorage.removeItem(`UserData`);
           set({user:null})
           message.success(response.data.message)
           return;
       }
    } catch (error) {
      message.error(error.response.data.message)
        return;
    }
  },
  deleteAccount : async () => {
    try {
      const response = await axiosInstance.delete(`/auth/delete`);
      if(response.data.success){
        set({user:null})
        localStorage.removeItem(`UserData`);
        message.success(response.data.message)
        return;
      }
    } catch (error) {
      message.error(error.response.data.message)
      return;
    }
  },
  reset : () =>{
      set({loading: false});

  }
}));
