import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import Logo from "../../public/images/logo3.png";
import * as userLogin from "../../styles/registerForm.module.css";
import { Facebook, Google } from "../icons";

export default function RegisterForm({
  formName,
  handleSubmet,
  children,
  disable,
}) {
  return (
    <form
      method="POST"
      encType="multipart/form-data"
      className={userLogin.formLogin}
      onSubmit={handleSubmet}
    >
      <div className={userLogin.container}>
        <div style={{ height: "200px", width: "200px", position: "relative" }}>
          <Image src={Logo} fill style={{ objectFit: "contain" }} />
        </div>
        <h1 className={userLogin.loginHead}>{formName}</h1>

        <div className={userLogin.inputsContainer}>{children}</div>
        {/* forgot password section */}
        <div
          className={
            formName == "LOGIN" ? userLogin.loginSubmit : userLogin.signupSubmit
          }
          style={{ marginTop: "120px", width: "100%" }}
        >
          {formName == "LOGIN" ? (
            <p className={userLogin.forgotPw}>Forgot password?</p>
          ) : null}

          <Button
            disabled={disable ? true : false}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>

      {/* third party login section */}
      {formName == "LOGIN" ? (
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
      ) : null}
    </form>
  );
}
