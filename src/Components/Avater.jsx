import React from 'react'
import { useAuth } from '../Zustand/store'
import { Avatar } from 'antd';

const Avater = () => {
    const {user} = useAuth();
  return (
    <div className=' flex justify-center items-center space-x-1 cursor-pointer'>
        <Avatar size={40} src={user?.imageDetails?.imageURL}/>
        <p className=' text-base '>{user?.name}</p>
    </div>
  )
}

export default Avater