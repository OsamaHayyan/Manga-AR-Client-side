import Image from "next/image";
import React, { useState } from "react";

import userForm from "../../styles/userForm.module.css";
import backgroundImage from "../../public/images/userFormBackground.jpg";
import { useRouter } from "next/router";

export default function User({ children }: { children: React.ReactNode }) {
  const route = useRouter();

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
            route.pathname === "/user/login"
              ? `${userForm.selected} ${userForm.loginBtnPosition}`
              : null
          }
          type="button"
          onClick={() => route.push("login", undefined, { scroll: false })}
        >
          <div
            className={
              route.pathname === "/user/login"
                ? userForm.textSelected
                : `${userForm.textNotSelected} ${userForm.loginTextPosition}`
            }
          >
            LOGIN
          </div>
        </button>
        <button
          className={
            route.pathname === "/user/signup"
              ? `${userForm.selected} ${userForm.signBtnPosition}`
              : null
          }
          type="button"
          onClick={() => route.push("signup", undefined, { scroll: false })}
        >
          <div
            className={
              route.pathname === "/user/signup"
                ? userForm.textSelected
                : `${userForm.textNotSelected} ${userForm.signTextPosition}`
            }
          >
            SIGN UP
          </div>
        </button>
        <div className={userForm.background}></div>
      </div>
      <div className={userForm.formSide}>{children}</div>
    </div>
  );
}
