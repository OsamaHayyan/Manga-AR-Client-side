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
import { Facebook, Google, Password, Person } from "../icons";
import Input from "../input";

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

    console.log(email.current.value);
    console.log(password.current.value);
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
            <Input
              Icon={<Person />}
              type={"email"}
              name={"email"}
              ref={email}
              placeholder={"Email"}
              required={true}
            />
            <Input
              Icon={<Password />}
              type={"password"}
              name={"password"}
              ref={password}
              placeholder={"Password"}
              required={true}
            />
          </div>
          <div
            className="d-flex flex-row justify-content-between align-items-center"
            style={{ marginTop: "120px", width: "100%" }}
          >
            <p className={userLogin.forgotPw}>Forgot password?</p>
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
        <div
          style={{
            borderTop: "5px solid #1e1e1e",
            marginTop: "101px",
            width: "100%",
          }}
        >
          <div className={userLogin.thirdPartyloginContainer}>
            <p
              style={{ fontWeight: "300", fontSize: "24px", color: "#FFFFFF" }}
            >
              Or Login with
            </p>
            <p>
              <Google />
              Google
            </p>
            <p>
              <Facebook />
              Facebook
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
