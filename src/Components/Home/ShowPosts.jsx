import React, { useEffect, useState } from "react";
import { Spin, Avatar  , Tag} from "antd";
import axiosInstance from "../../Lib/axios";
import { format } from 'date-fns'; 
import { CiHeart } from "react-icons/ci";
import { TfiComment } from "react-icons/tfi";

const ShowPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/all-posts`);
      if (response.data.success) {
        const updatedPosts = response.data.data.map((post) => {

          if (
            Array.isArray(post.tags) &&
            post.tags.length === 1 &&
            typeof post.tags[0] === "string"
          ) {
            try {
              post.tags = JSON.parse(post.tags[0]); 
            } catch (error) {
              console.error("Error parsing tags:", error);
            }
          }
  
          // Format the createdAt date into a human-readable format
          if (post.createdAt) {
            post.createdAt = format(new Date(post.createdAt), 'MMM dd, yyyy HH:mm:ss');
          }
  
          return post;
        });
  
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); // The empty array makes sure this runs only once on mount
  console.log(posts);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center pt-20">
          <Spin />
        </div>
      ) : posts ? (
        <div className="h-full space-y-4">
          {/* Render your posts here */}
          {posts.map((post) => (
            <div
              className=" bg-white flex flex-col text-black shadow-lg w-full max-sm:p-3 p-6 rounded-xl max-sm:rounded-lg"
              key={post._id}
            >
              <div className=" flex space-x-4 max-sm:space-x-2 items-center">
                <Avatar size={45} src={post.author.imageDetails.imageURL} />
                <div className=" flex flex-col">
                  <p className="text-lg max-sm:text-base">{post.author.name}</p>
                  <p className=" text-gray-400 text-sm max-sm:text-xs">{post.createdAt}</p>
                </div>
              </div>
              <div className=" sm:space-y-2">
                <h3 className=" text-2xl max-sm:text-lg font-bold">
                  {post.title}
                </h3>
                <div>
                  {post.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </div>
                <p>{post.content}</p>
                <img
                  className=" w-full h-[14rem] sm:h-[32rem] object-cover"
                  src={post.imageDetails.imageURL}
                  alt="img"
                />
              </div>
              <div className=" flex justify-evenly mt-6 max-sm:mt-2 text-2xl max-sm:text-lg items-center py-2 border-t-[1px] border-gray-400">
                       <CiHeart className=" text-3xl max-sm:text-2xl cursor-pointer text-pink-700"/>
                       <TfiComment className=" cursor-pointer"/> 
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default ShowPosts;
