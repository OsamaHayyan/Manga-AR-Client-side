import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import validator from "validator";
import * as userLogin from "../../styles/login.module.css";

export default function Login() {
  const email = useRef("");
  const password = useRef("");

  const [valid, setValid] = useState({
    emailValid: true,
    password: true,
  });
  const handleSubmet = (e) => {
    e.preventDefault();

    let checkValidation = validation(
      email.current.value,
      password.current.value
    );
    if (!checkValidation) {
      const formData = new FormData();
      formData.append("email", email.current.value);
      formData.append("password", password.current.value);

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

  const validation = (email, password) => {
    setValid({
      ...valid,
      emailValid: validator.isEmail(email),
      password: validator.isStrongPassword(password, { minUppercase: 0 }),
    });

    if (Object.values(valid).includes(false)) {
      return true;
    }
    return false;
  };

  return (
    <>
      {!valid.emailValid || !valid.password ? (
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
