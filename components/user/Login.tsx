import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import validator from "validator";

import Icon from "../Icon";
import Input from "../Input";
import RegisterForm from "./RegisterForm";

type Props = {};
export default function Login({}: Props) {
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const router = useRouter();
  const cookies = new Cookies();
  const valid = useRef({
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
        console.log("submeted");
        router.replace("/");
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

  const validation = async (email: string, password: string) => {
    try {
      valid.current = {
        emailValid: validator.isEmail(email),
        password: validator.isStrongPassword(password, { minUppercase: 0 }),
      };
      setServerAccept(true);

      if (Object.values(valid.current).includes(false)) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  return (
    <RegisterForm
      formName={"LOGIN"}
      handleSubmet={handleSubmet}
      disable={disable}
    >
      <Input
        Icon={<Icon name="person" />}
        type={"email"}
        name={"email"}
        ref={email}
        placeholder={"Email"}
        required={true}
      />
      <Input
        Icon={<Icon name="password" />}
        type={"password"}
        name={"password"}
        ref={password}
        placeholder={"Password"}
        required={true}
        validation={
          !valid.current.emailValid || !valid.current.password || !serverAccept
            ? true
            : false
        }
        validationText={"Your email or password is incorrect"}
      />
    </RegisterForm>
  );
}
