import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import ReactTypingEffect from "react-typing-effect";
import { SignupPic } from "../../public/image";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import {useAuth} from "../Zustand/store"
const SignUp = () => {

  const navigate = useNavigate();
    const {loading , sign_up , reset} = useAuth();
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
        const data = await sign_up(values);
        if(data.status)
          navigate(`/signup/${data?.userData?.id}`);
        else{
             message.error(data.msg)
        }

  };
  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
     useEffect(()=>{
        return reset();
     } , [])
  return (
    <div className="h-screen py-4 max-sm:py-6 overflow-y-hidden">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 px-12 max-sm:px-4 h-full">
        <motion.div
          key={`Div-a`}
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
          className="flex flex-col justify-center space-y-6"
        >
          <h1 className="text-3xl font-medium py-3 max-sm:text-xl self-center">
            Sign Up to Share Your{" "}
            <span className="text-[2.6rem] font-semibold max-sm:text-[1.75rem]">
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
            <Form.Item name="name" rules={[{ required: true, message: "Please input your full name!" }]}>
              <Input prefix={<FaRegUser />} className="p-3" placeholder="John Doe" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "The input is not valid E-mail!" }]}>
              <Input prefix={<MdOutlineMailOutline />} className="p-3" placeholder="john@example.com" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password prefix={<IoKeyOutline />} className="p-3" placeholder="********" />
            </Form.Item>
            <Form.Item name="terms" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("You must accept the Terms and Conditions")) }]}>
              <Checkbox className="text-white" onChange={handleCheckboxChange}>
                I agree to the Terms and Conditions and acknowledge that I have read and understood the Privacy Policy
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <div className="flex flex-col justify-center items-center pt-4">
                <Button loading={loading} type="primary" htmlType="submit" className="w-full md:w-auto" disabled={!checked}>
                  Sign up
                </Button>
                <p className="text-sm text-center py-4 text-white">
                  Already have an account?{" "}
                  <Link className="text-blue-600 text-md" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </Form.Item>
          </Form>
        </motion.div>
        <motion.div
          key={`Div-B`}
          className="max-sm:hidden"
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
              duration: 10,
              ease: "easeInOut",
            }}
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
