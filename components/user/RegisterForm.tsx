import { Button } from "@mui/material";
import React, { PropsWithChildren } from "react";
import userLogin from "../../styles/registerForm.module.css";
import Icon from "../Icon";

type Props = PropsWithChildren<{
  formName: string;
  handleSubmet: React.FormEventHandler<HTMLFormElement>;
  disable: boolean;
  style?: React.CSSProperties;
}>;
export default function RegisterForm({
  formName,
  handleSubmet,
  children,
  disable,
  style,
}: Props) {
  return (
    <form
      method="POST"
      encType="multipart/form-data"
      className={userLogin.formLogin}
      onSubmit={handleSubmet}
      style={style}
    >
      <div className={userLogin.container}>
        <h1 className={userLogin.loginHead}>{formName}</h1>

        <div className={userLogin.inputsContainer}>{children}</div>
        {/* forgot password section */}
        <div
          className={
            formName == "LOGIN" ? userLogin.loginSubmit : userLogin.signupSubmit
          }
        >
          {formName == "LOGIN" ? (
            <p className={userLogin.forgotPw}>Forgot password?</p>
          ) : null}

          <Button
            disabled={disable ? true : false}
            type="submit"
            variant="contained"
          >
            {formName}
          </Button>
        </div>
      </div>

      {/* third party login section */}
      {formName == "LOGIN" ? (
        <div className={userLogin.thirdPartyloginContainer}>
          <p>Login with</p>
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ gap: "8px" }}
          >
            <Icon name="google" size={24} />
            <p>Google</p>
          </div>
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ gap: "8px" }}
          >
            <Icon name="facebook" size={24} />
            <p>Facebook</p>
          </div>
        </div>
      ) : null}
    </form>
  );
}
