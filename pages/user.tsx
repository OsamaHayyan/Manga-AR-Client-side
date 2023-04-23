import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

import userForm from "../styles/userForm.module.css";
import Login from "../components/user/Login";
import Signup from "../components/user/Signup";
import backgroundImage from "../public/images/userFormBackground.jpg";

type Props = {
  handleLoginState: Dispatch<SetStateAction<boolean>>;
};
export default function User({ handleLoginState }: Props) {
  const [component, setComponent] = useState({ login: true, signup: false });
  return (
    <div className={userForm.container}>
      <div className={userForm.imageSide}>
        <Image
          src={backgroundImage}
          fill
          className={userForm.backgroundImage}
          alt="Background image"
        />
        <button
          className={
            component.login
              ? `${userForm.selected} ${userForm.loginBtnPosition}`
              : null
          }
          type="button"
          onClick={() => setComponent({ login: true, signup: false })}
        >
          <div
            className={
              component.login
                ? userForm.textSelected
                : `${userForm.textNotSelected} ${userForm.loginTextPosition}`
            }
          >
            LOGIN
          </div>
        </button>
        <button
          className={
            component.signup
              ? `${userForm.selected} ${userForm.signBtnPosition}`
              : null
          }
          type="button"
          onClick={() => setComponent({ login: false, signup: true })}
        >
          <div
            className={
              component.signup
                ? userForm.textSelected
                : `${userForm.textNotSelected} ${userForm.signTextPosition}`
            }
          >
            SIGN UP
          </div>
        </button>
        <div className={userForm.background}></div>
      </div>
      <div className={userForm.formSide}>
        {component.login ? (
          <Login handleLoginState={handleLoginState} />
        ) : (
          <Signup />
        )}
      </div>
    </div>
  );
}
