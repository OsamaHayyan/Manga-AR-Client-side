import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import * as userForm from "../styles/userForm.module.css";
import Login from "../components/user/login";
import Signup from "../components/user/signup";
import backgroundImage from "../public/images/userFormBackground.jpg";
export default function User() {
  return (
    <div className={userForm.container}>
      <div className={userForm.imageSide}>
        <Image src={backgroundImage} fill style={{ objectFit: "contain" }} />
      </div>
      <div className={userForm.formSide}>
        <Login />
      </div>
    </div>
  );
}
