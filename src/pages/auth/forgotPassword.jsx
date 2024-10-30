import React, { useContext, useEffect, useRef, useState } from "react";
import LeftImage from "../../components/Auth/LeftImage";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import {
  collection,
  db,
  getDocs,
  query,
  where,
} from "../../firbase/FirebaseInit";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { setOtp, setForgetEmail, setOtpVal, setLoader, loader } =
    useContext(MyContext);
  const navigate = useNavigate("");
  const sendOTP = async (e) => {
    e.preventDefault();
    setLoader(true);
    setOtpVal("");
    setForgetEmail(email);
    const toastId = toast.loading("Sending OTP...");
    try {
      const res = await fetch(
        `https://nodejsotp-e03zn32vm-zackcoles-projects.vercel.app/sendOtp?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();
      if (res) {
        console.log(data, "data");
        setOtp(data.result.otp);
        toast.update(toastId, {
          render: "OTP sent successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setLoader(false);
        navigate("/otp");
      } else {
        setLoader(false);
        toast.update(toastId, {
          render: "Failed to send OTP.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoader(false);
    }
  };

  console.log(loader, "loader:");

  return (
    <div className="grid sm:grid-cols-1 h-screen lg:grid-cols-2  md:py-10 md:px-10 gap-4 flex items-center ">
      <div className="h-full">
        <LeftImage />
      </div>
      <div className="">
        <div className="flex items-center flex-col">
          <img src="/logo.webp" className="mb-3" alt="" />
          <h2 className="mb-3 font-bold text-[32px] leading-[38px]">
            Forgot Password?
          </h2>
          <p className="mb-3 font-medium text-base leading-[19px] text-center">
            Enter your email to reset your password and <br /> swiftly resume
            your experience.
          </p>
        </div>
        <form onSubmit={(e) => sendOTP(e)} className="max-w-sm mx-auto mt-4">
          <div className="mb-5">
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:placeholder-gray-400  focus:outline-[#0A8A33] "
              placeholder="Email Address"
              required
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              disabled={loader ? loader : false}
              className="text-white bg-[#0A8A33]  rounded-lg inline-flex justify-center w-full  px-5 py-2.5 text-center"
            >
              Next
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
          <NavLink
            to={"/login"}
            className="flex items-center hover:text-[#0A8A33]"
          >
            <img src="/back.webp" width={20} alt="" />
            <span class="ml-1 text-base font-normal ">Back</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
