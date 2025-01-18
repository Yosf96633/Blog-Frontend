import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../Lib/axios";
import { Spin, Button, Tag, Avatar } from "antd";
import { format } from "date-fns";
const Profile = () => {
  const [loading1, setloading1] = useState(true);
  const [loading2, setloading2] = useState(true);
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const dateObj = new Date(data?.DOB);
  const date = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log( loading1 , loading2);
  
  const fetch_data = async () => {
    try {
      const response = await axiosInstance.get(`/auth/user_profile/${id}`);
      if (response.data.success) {
        console.log(response.data);
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setloading1(false);
    }
  };
  const fetch_posts = async () => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      const updatedPosts = response.data.blogs?.map((post) => {
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
        if (post.createdAt) {
          post.createdAt = format(
            new Date(post.createdAt),
            "MMM dd, yyyy HH:mm:ss"
          );
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
    } finally {
      setloading2(false);
    }
  };
  useEffect(() => {
    fetch_data();
    fetch_posts();
    return ()=>{
        setloading1(true)
        setloading2(true)
    }
  } , [id]);
  return (
    <div className=" min-h-screen bg-[#232D3F] px-4 text-white py-6">
      {loading1 ? (
        <div className=" flex justify-center pt-16">
          {" "}
          <Spin />
        </div>
      ) : (
        <div className=" ">
          <div className=" flex flex-col justify-center items-center  space-y-4">
            <img
              src={data.imageDetails.imageURL}
              className=" size-32  rounded-full object-cover"
              alt=""
            />
            <h1 className=" text-2xl font-medium"> {data.name}</h1>
          </div>
          <div className=" space-y-3 py-3 flex justify-center items-center flex-col">
            <p>About {data.name}:</p>
            <p>Date of birth: {date}</p>
            <p>Bio: {data.bio}</p>
          </div>
          <div className=" flex justify-center">
            <Button
              onClick={async () => {
                try {
                  const response = await axiosInstance.post(
                    `follow-unfollow/${data._id}`
                  );
                  console.log(response);
                } catch (error) {}
              }}
            >
              Follow
            </Button>
          </div>
          <div className=" space-y-3 py-4">
            {loading2 ? (
              <Spin />
            ) : (
              <div>
                {posts.length === 0 ? (
                  <h1 className=" text-center py-4 text-xl">No posts found</h1>
                ) : (
                  <div className=" space-y-3">
                    {" "}
                    {posts.map((post) => (
                      <div
                        className=" bg-white flex flex-col text-black shadow-lg w-full max-sm:p-3 p-6 rounded-xl max-sm:rounded-lg"
                        key={post._id}
                      >
                        <div className=" flex space-x-4 max-sm:space-x-2 items-center">
                          <Avatar
                            className=" object-cover"
                            size={45}
                            src={data?.imageDetails?.imageURL}
                          />
                          <div className=" flex flex-col">
                            <p className="text-lg max-sm:text-base">
                              {post.author.name}
                            </p>
                            <p className=" text-gray-400 text-sm max-sm:text-xs">
                              {post.createdAt}
                            </p>
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
                          {post.imageDetails && (
                            <img
                              className=" w-full h-[14rem] sm:h-[32rem] object-cover"
                              src={post?.imageDetails?.imageURL}
                              alt="img"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
