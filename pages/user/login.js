import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import validator from "validator";

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
          <h1 style={{ marginBottom: "20px" }}>Login</h1>

          <label htmlFor="email">Email:</label>
          <input
            className={userLogin.inputs}
            name="email"
            type={"email"}
            placeholder="Required valid email"
            ref={email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className={userLogin.inputs}
            name="password"
            type={"password"}
            placeholder="Required at least 8 numbers & letters & symbols"
            ref={password}
            required
          />

          <Button
            disabled={disable ? true : false}
            className={userLogin.submit}
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>
          <p className={userLogin.signupLink}>
            Dont't have account?{" "}
            <Link href="/user/signup">
              <a style={{ color: "#0a58ca" }}>Sign up</a>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
