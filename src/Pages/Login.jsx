import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import ReactTypingEffect from "react-typing-effect";
import { SignupPic } from "../../public/image";
import {  motion } from "framer-motion";
import { Link, useNavigate } from "react-router"; // Ensure you're using react-router-dom
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import {useAuth} from "../Zustand/store"
const Login = () => {
  const navigate = useNavigate();
  const {login , loading , reset} = useAuth();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
        const data =  await login(values);
        if(data.status)
         {
          message.success(data.msg)
          navigate("/");
         }
        else{
          message.error(data.msg)
        }
  };
    useEffect(()=>{
      return reset();
    },[]);
  return (
    <div className="h-screen py-4 max-sm:py-6 overflow-y-hidden">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 px-12 max-sm:px-4 h-full">
        <motion.div
          key={`Div-a`}
          initial={{
            x: "100%",
            opacity: 0,
          }}
          animate={{
            x: "0",
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
            ease: "easeIn",
          }}
          exit={{
            x: "100%",
            opacity: 0,
            transition:{
              duration:0.35,
              ease:"easeOut"
            }
          }}
          className="flex flex-col space-y-6 order-2 justify-center max-sm:pb-12"
        >
          <h1 className="text-xl font-medium py-3 max-sm:text-xl self-center">
            Log In to Share Your{" "}
            <span className="text-[2rem] font-semibold max-sm:text-[1.75rem]">
              <ReactTypingEffect
                text={["Thoughts", "Stories", "Ideas", "Journey"]}
                speed={200}
                eraseDelay={500}
                typingDelay={0}
                eraseSpeed={100}
              />
            </span>
          </h1>
          <Form
            className="flex flex-col w-[70%] max-sm:w-[90%] self-center"
            form={form}
            name="signup"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            {/* Form Fields */}
            <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "The input is not valid E-mail!" }]}>
              <Input prefix={<MdOutlineMailOutline />} className="p-3" placeholder="john@example.com" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password prefix={<IoKeyOutline />} className="p-3" placeholder="********" />
            </Form.Item>
            
           
            <Form.Item>
              <div className="flex flex-col justify-center items-center pt-4">
                <Button loading={loading} type="primary" htmlType="submit" className="w-full md:w-auto">
                    Login
                </Button>
                <p className="text-sm text-center py-4 text-white">
                 Did not have an account?{" "}
                  <Link className="text-blue-500 text-md" to="/signup">
                    Sign up
                  </Link>
                </p>
              </div>
            </Form.Item>
          </Form>
        </motion.div>
        <motion.div
          key={`Div-B`}
          className="max-sm:hidden order-1"
          initial={{
            x: "-100%",
            opacity: 0,
          }}
          animate={{
            x: "0",
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
            ease: "easeIn",
          }}
          exit={{
            x: "-100%",
            opacity: 0,
            transition:{
              duration:0.35,
              ease:"easeOut"
            }
          }}
        >
          <motion.img
            src={SignupPic}
            alt="Signup"
            animate={{
              y: [`0%`, `5%`, '0%' , '-5%' ,  `0%`],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "easeInOut",
            }}
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
