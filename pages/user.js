import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

import * as userForm from "../styles/userForm.module.css";
import Login from "../components/user/login";
import Signup from "../components/user/signup";
import backgroundImage from "../public/images/userFormBackground.jpg";
export default function User() {
  return (
    <div className={userForm.container}>
      <div className={userForm.imageSide}>
        <Image
          src={backgroundImage}
          fill
          className={userForm.backgroundImage}
        />
        <button className={true ? userForm.selected : null} type="button">
          <div
            className={true ? userForm.textSelected : userForm.textNotSelected}
          >
            LOGIN
          </div>
        </button>
        <button className={false ? userForm.selected : null} type="button">
          <div
            className={false ? userForm.textSelected : userForm.textNotSelected}
          >
            SIGN UP
          </div>
        </button>
        <div className={userForm.background}></div>
      </div>
      <div className={userForm.formSide}>
        <Login />
      </div>
    </div>
  );
}
