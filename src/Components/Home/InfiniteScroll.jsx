import React from 'react'
import {CreatePost, ShowPosts} from "../index"
const InfiniteScroll = () => {
  return (
    <div className=' w-3/4 max-md:w-screen sm:bg-[#414d63] sm:rounded-2xl space-y-4 sm:p-4 overflow-y-scroll'>
        <CreatePost/>
         <ShowPosts/>
    </div>
  )
}

export default InfiniteScroll