import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "universal-cookie";
import validator from "validator";

import Logo from "../../public/images/logo3.png";
import * as userLogin from "../../styles/login.module.css";

export default function Login({ handleLoginState }) {
  const email = useRef("");
  const password = useRef("");
  const router = useRouter();
  const cookies = new Cookies();
  const [valid, setValid] = useState({
    emailValid: true,
    password: true,
  });
  const [serverAccept, setServerAccept] = useState(true);
  const [disable, setDisable] = useState(false);
  const handleSubmet = async (e) => {
    e.preventDefault();

    try {
      setDisable(true);
      let checkValidation = await validation(
        email.current.value,
        password.current.value
      );
      if (!checkValidation) {
        await axios.post(
          "http://localhost:8080/user/login",
          {
            email: email.current.value,
            password: password.current.value,
          },
          {
            withCredentials: true,
          }
        );
        cookies.set("logged_in", "true", {
          // expire in 3h
          expires: new Date(Date.now() + 3 * (60 * 60 * 1000)),
        });
        await handleLoginState(true);
        console.log("submeted");
        router.replace("/library");
      } else {
        console.log("not submitted");
      }
      setDisable(false);
    } catch (error) {
      setDisable(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error("Your email or password is incorrect");
        setServerAccept(false);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        toast.error("Can't login try again, please!");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Can't login try again, please!");
        console.log("Error", error.message);
      }
    }
  };

  const validation = async (email, password) => {
    try {
      setValid({
        emailValid: validator.isEmail(email),
        password: validator.isStrongPassword(password, { minUppercase: 0 }),
      });
      setServerAccept(true);

      if (Object.values(valid).includes(false)) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("error: " + error);
    }
  };

  return (
    <>
      {!valid.emailValid || !valid.password || !serverAccept ? (
        <span className={userLogin.errorValidation}>
          Your email or password is incorrect
        </span>
      ) : null}
      <form
        method="POST"
        encType="multipart/form-data"
        className={userLogin.formLogin}
        onSubmit={handleSubmet}
      >
        <div className={userLogin.container}>
          <div
            style={{ height: "200px", width: "200px", position: "relative" }}
          >
            <Image src={Logo} fill style={{ objectFit: "contain" }} />
          </div>
          <h1 className={userLogin.loginHead}>LOGIN</h1>

          <div className={userLogin.inputsContainer}>
            <div className={userLogin.inputContainer}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.625 16C31.6267 13.3989 30.9789 10.8385 29.7406 8.55104C28.5022 6.26361 26.7123 4.32153 24.5334 2.90096C22.3544 1.48039 19.8553 0.626264 17.2627 0.416065C14.67 0.205867 12.066 0.646243 9.68661 1.69725C7.30726 2.74826 5.22794 4.37664 3.63725 6.4347C2.04656 8.49276 0.994834 10.9154 0.577461 13.4828C0.160088 16.0502 0.390278 18.6812 1.24715 21.1372C2.10402 23.5931 3.56047 25.7963 5.48437 27.5469C5.5239 27.5961 5.57144 27.6384 5.625 27.6719C8.4839 30.2186 12.1791 31.6258 16.0078 31.6258C19.8365 31.6258 23.5317 30.2186 26.3906 27.6719L26.5156 27.5469C28.1268 26.0861 29.414 24.3038 30.294 22.3149C31.174 20.3261 31.6275 18.1748 31.625 16ZM1.625 16C1.62481 13.6373 2.20698 11.311 3.32 9.22698C4.43303 7.1429 6.04258 5.3653 8.00624 4.05145C9.96991 2.7376 12.2271 1.92802 14.5782 1.69434C16.9293 1.46066 19.3017 1.81008 21.4856 2.71169C23.6695 3.6133 25.5974 5.0393 27.0989 6.86351C28.6004 8.68772 29.6291 10.8539 30.094 13.1704C30.5589 15.4868 30.4456 17.8822 29.7642 20.1445C29.0829 22.4068 27.8544 24.4662 26.1875 26.1406C24.6359 23.5412 22.1478 21.6347 19.2344 20.8125C20.5874 20.0911 21.6605 18.9382 22.283 17.5369C22.9054 16.1356 23.0416 14.5665 22.6699 13.0789C22.2981 11.5913 21.4397 10.2707 20.2312 9.32708C19.0226 8.38341 17.5333 7.87083 16 7.87083C14.4667 7.87083 12.9774 8.38341 11.7688 9.32708C10.5603 10.2707 9.70191 11.5913 9.33014 13.0789C8.95837 14.5665 9.09456 16.1356 9.71704 17.5369C10.3395 18.9382 11.4126 20.0911 12.7656 20.8125C9.85216 21.6347 7.3641 23.5412 5.8125 26.1406C3.13237 23.446 1.62701 19.8005 1.625 16ZM16 20.375C14.8875 20.375 13.7999 20.0451 12.8749 19.427C11.9499 18.8089 11.2289 17.9304 10.8032 16.9026C10.3774 15.8748 10.266 14.7438 10.4831 13.6526C10.7001 12.5615 11.2359 11.5592 12.0225 10.7725C12.8092 9.98585 13.8115 9.45012 14.9026 9.23308C15.9938 9.01604 17.1248 9.12743 18.1526 9.55318C19.1804 9.97892 20.0589 10.6999 20.677 11.6249C21.2951 12.5499 21.625 13.6375 21.625 14.75C21.625 16.2418 21.0324 17.6726 19.9775 18.7275C18.9226 19.7824 17.4918 20.375 16 20.375ZM6.76562 27C7.69364 25.3693 9.03694 24.0134 10.6589 23.0702C12.2809 22.127 14.1237 21.6302 16 21.6302C17.8763 21.6302 19.7191 22.127 21.3411 23.0702C22.9631 24.0134 24.3064 25.3693 25.2344 27C22.6503 29.1781 19.3796 30.3727 16 30.3727C12.6204 30.3727 9.34967 29.1781 6.76562 27Z"
                  fill="white"
                />
              </svg>
              <input
                className={userLogin.inputs}
                name="email"
                type={"email"}
                placeholder="Required valid email"
                ref={email}
                required
              />
            </div>
            <div className={userLogin.inputContainer}>
              <svg
                width="30"
                height="34"
                viewBox="0 0 30 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18.0666C14.4048 18.069 13.8268 18.2667 13.3549 18.6295C12.8829 18.9923 12.5432 19.5001 12.388 20.0747C12.2327 20.6493 12.2705 21.2591 12.4955 21.8102C12.7205 22.3613 13.1203 22.8232 13.6334 23.125V27H16.4V23.125C16.806 22.8848 17.1429 22.5438 17.378 22.1349C17.6131 21.726 17.7384 21.2633 17.7417 20.7916C17.7417 20.4324 17.6707 20.0767 17.5327 19.745C17.3947 19.4133 17.1925 19.1121 16.9377 18.8589C16.6829 18.6056 16.3805 18.4052 16.048 18.2693C15.7154 18.1333 15.3593 18.0644 15 18.0666Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25.2416 11.8083H4.7499C2.76168 11.8083 1.1499 13.4201 1.1499 15.4083V29.65C1.1499 31.6382 2.76168 33.25 4.7499 33.25H25.2416C27.2298 33.25 28.8416 31.6382 28.8416 29.65V15.4083C28.8416 13.4201 27.2298 11.8083 25.2416 11.8083Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.125 11.8083V9.63333C6.125 7.27733 7.06092 5.01782 8.72687 3.35187C10.3928 1.68592 12.6523 0.75 15.0083 0.75C17.3643 0.75 19.6238 1.68592 21.2898 3.35187C22.9557 5.01782 23.8917 7.27733 23.8917 9.63333V11.8083"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                className={userLogin.inputs}
                name="password"
                type={"password"}
                placeholder="Required at least 8 numbers & letters & symbols"
                ref={password}
                required
              />
            </div>
          </div>
          <div
            className="d-flex flex-row justify-content-between align-items-center"
            style={{ marginTop: "120px", width: "100%" }}
          >
            <p className={userLogin.forgotPw}>Forgot Password?</p>
            <Button
              disabled={disable ? true : false}
              className={userLogin.submit}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
