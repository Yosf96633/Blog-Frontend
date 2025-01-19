import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axiosInstance from "../Lib/axios";
import { Spin } from "antd";
const Search = () => {
  const [search_params] = useSearchParams();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const name = search_params.get("name");
  const fetch_data = async () => {
    try {
      const response = await axiosInstance.get(`/get-user?name=${name}`);
      if (response.data.success) {
        setFriends(response.data.data);
    
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch_data();
  }, [name]);
  return (
    <div className=" min-h-screen bg-[#232D3F] text-white">
      {loading ? (
        <div className=" flex justify-center pt-28 max-sm:pt-16">
          <Spin />
        </div>
      ) : (
        <div>
          {friends.length == 0 ? (
            <div className=" flex justify-center pt-28 max-sm:pt-16">
              <h1>No user found</h1>
            </div>
          ) : (
            <div className=" pt-12 m-4">
              <h1>Friends</h1>
              {friends.map((_, i) => {
                return (
                  <div
                    onClick={() => {
                        navigate(`/profile/${_._id}`)
                    }}
                    key={_._id}
                    className="bg-[#414d63] cursor-pointer flex justify-between rounded-lg p-4"
                  >
                    <div className=" flex space-x-4 items-center">
                      <img
                        className=" size-14 rounded-full object-cover"
                        src={_.imageDetails.imageURL}
                        alt=""
                      />
                      <h3>{_.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
