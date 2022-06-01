import { Button } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import validator from "validator";
import * as userSignup from "../../styles/signup.module.css";
export default function Signup() {
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  const [valid, setValid] = useState({
    usernameValid: true,
    emailValid: true,
    password: true,
    confirmPassword: true,
    profileImage: true,
    profileImageData: null,
  });
  const handleSubmet = (e) => {
    e.preventDefault();

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
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
      console.log("submeted");
    } else {
      console.log("not submitted");
    }
  };

  const validation = (username, email, password, confirmPassword) => {
    setValid({
      ...valid,
      usernameValid: validator.isLength(username, { min: 4, max: 15 }),
      emailValid: validator.isEmail(email),
      password: validator.isStrongPassword(password, { minUppercase: 0 }),
      confirmPassword: validator.equals(confirmPassword, password),
    });

    if (Object.values(valid).includes(false)) {
      return true;
    }
    return false;
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const fileType = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!file) return;
    if (file.size > 4 * Math.pow(10, 6) || !fileType.includes(file.type)) {
      setValid({ ...valid, profileImage: false });
      e.target.value = null;
    } else {
      setValid({ ...valid, profileImage: true, profileImageData: file });
    }
  };
  return (
    <form
      method="POST"
      encType="multipart/form-data"
      className={userSignup.formSignup}
      onSubmit={handleSubmet}
    >
      <div className={userSignup.container}>
        <h1 style={{ marginBottom: "20px" }}>Sign Up</h1>
        <label htmlFor="username">Username:</label>
        <input
          className={userSignup.inputs}
          name="username"
          type={"text"}
          placeholder="Required in 4-15 letters & numbers"
          ref={username}
          required
        />
        {!valid.usernameValid && <span>Please type a valid username</span>}

        <label htmlFor="email">Email:</label>
        <input
          className={userSignup.inputs}
          name="email"
          type={"email"}
          placeholder="Required valid email"
          ref={email}
          required
        />
        {!valid.emailValid && <span>Please type a valid email</span>}
        <label htmlFor="password">Password:</label>
        <input
          className={userSignup.inputs}
          name="password"
          type={"password"}
          placeholder="Required at least 8 numbers & letters & symbols"
          ref={password}
          required
        />
        {!valid.password && <span>Please type a valid password</span>}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          className={userSignup.inputs}
          name="confirmPassword"
          type={"password"}
          placeholder="Rewrite your password"
          ref={confirmPassword}
          required
        />
        {!valid.confirmPassword && (
          <span>Password confirm doesn't equal you password</span>
        )}

        <Form.Group controlId="formFile" style={{ width: "100%" }}>
          <Form.Label style={{ padding: "10px 0", margin: "0" }}>
            Profile Image:
          </Form.Label>
          <Form.Control
            style={{ width: "100%" }}
            type="file"
            placeholder="Upload your image"
            accept=".jpeg, .png, .webp, .jpg"
            onChange={handleFileInput}
            multiple
          />
          {!valid.profileImage && <span>Please use valid photo</span>}
        </Form.Group>

        <Button
          className={userSignup.submit}
          type="submit"
          variant="contained"
          size="large"
        >
          SIGN UP
        </Button>
      </div>
    </form>
  );
}
