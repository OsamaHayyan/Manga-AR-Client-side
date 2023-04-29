import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import userSignup from "../../styles/signup.module.css";
import Input from "../Input";
import InputUpload from "../Upload_input";
import RegisterForm from "./RegisterForm";
import Icon from "../Icon";
export default function Signup() {
  const username = useRef<HTMLInputElement>();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const confirmPassword = useRef<HTMLInputElement>();

  const [disable, setDisable] = useState(false);
  const [fileName, setFileName] = useState("Choose a profile picture");
  const [valid, setValid] = useState({
    usernameValid: true,
    emailValid: true,
    password: true,
    confirmPassword: true,
    profileImage: true,
    profileImageData: null,
  });
  const handleSubmet: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setDisable(true);
    let checkValidation = validation(
      username.current.value,
      email.current.value,
      password.current.value,
      confirmPassword.current.value
    );

    if (!checkValidation) {
      const formData = new FormData();
      formData.append("username", username.current.value);
      formData.append("email", email.current.value);
      formData.append("password", password.current.value);
      formData.append("confirm", confirmPassword.current.value);
      if (valid.profileImageData) {
        formData.append(
          "profile_photo",
          valid.profileImageData,
          valid.profileImageData.name
        );
      }

      axios
        .post("http://localhost:8080/user/signup", formData)
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            error.response.data.data.forEach((data) => {
              toast.error(data.msg);
            });
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            toast.error("Can't Signup try again, please!");
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("Can't Signup try again, please!");
          }
        });
      console.log("submeted");
    } else {
      console.log("not submitted");
    }
    setDisable(false);
  };

  const validation = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const dataValid = {
      usernameValid: validator.isLength(username, { min: 4, max: 15 }),
      emailValid: validator.isEmail(email),
      password: validator.isStrongPassword(password, { minUppercase: 0 }),
      confirmPassword: validator.equals(confirmPassword, password),
    };
    setValid({
      ...valid,
      usernameValid: dataValid.usernameValid,
      emailValid: dataValid.emailValid,
      password: dataValid.password,
      confirmPassword: dataValid.confirmPassword,
    });

    if (Object.values(dataValid).includes(false)) {
      return true;
    }
    return false;
  };

  const handleFileInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files[0];
    if (!file) return setFileName("Choose a profile picture");
    const fileType = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (file.size > 4 * Math.pow(10, 6) || !fileType.includes(file.type)) {
      setValid({ ...valid, profileImage: false });
      e.target.value = null;
    } else {
      setValid({ ...valid, profileImage: true, profileImageData: file });
      setFileName(file.name);
    }
  };

  return (
    <RegisterForm
      formName={"SIGNUP"}
      handleSubmet={handleSubmet}
      disable={disable}
      style={{ marginBottom: "50px" }}
    >
      <Input
        Icon={<Icon name="person" />}
        type={"text"}
        name={"username"}
        ref={username}
        placeholder={"Username"}
        required={true}
        style={{ width: "641px" }}
        validation={!valid.usernameValid}
        validationText={"Please type a valid username"}
      />
      <Input
        Icon={<Icon name="person" />}
        type={"email"}
        name={"email"}
        ref={email}
        placeholder={"Email"}
        required={true}
        style={{ width: "641px" }}
        validation={!valid.emailValid}
        validationText={"Please type a valid email"}
      />
      <div className={userSignup.passwordContainer}>
        <Input
          Icon={<Icon name="password" />}
          lastIcon={{
            icon: <Icon name="eyeSlash" size={32} />,
            width: 32,
          }}
          type={"password"}
          name={"password"}
          ref={password}
          placeholder={"Password"}
          required={true}
          validation={!valid.password}
          validationText={"Required at least 8 numbers & letters & symbols"}
          validationStyle={{ width: "278px" }}
        />
        <Input
          Icon={<Icon name="password" />}
          lastIcon={{
            icon: <Icon name="eyeSlash" size={32} />,
            width: 32,
          }}
          type={"password"}
          name={"confirmPassword"}
          ref={confirmPassword}
          placeholder={"Confirm"}
          required={true}
          validation={!valid.confirmPassword}
          validationText={"Password confirm doesn't equal you password"}
          validationStyle={{ width: "278px" }}
        />
      </div>

      <InputUpload
        icon={<Icon name="addPhoto" />}
        handleFileInput={handleFileInput}
        fileName={fileName}
        errors={{ other: !valid.profileImage }}
        validationText={"Please add a valid photo"}
        accept={".jpeg, .png, .webp, .jpg"}
      />
    </RegisterForm>
  );
}
