import React, { useState } from "react";
import * as navbarStyle from "./navbar.module.css";
import * as logo from "../../public/images/logo.png";
import * as userImage from "../../public/images/placeholder-avatar.jpg";
import Image from "next/image";
import Link from "next/link";
import { ClickAwayListener } from "@mui/material";

const Logo = ({ logoImage }) => {
  if (logoImage) {
    return (
      <div className={navbarStyle.logoImageWarpper}>
        <Link href="/">
          <Image
            src={logoImage}
            layout="intrinsic"
            className={navbarStyle.logoImage}
          />
        </Link>
      </div>
    );
  }
  return (
    <h2 className={navbarStyle.logoName}>
      <Link href="/"> Logo </Link>
    </h2>
  );
};

const Login = ({ login, username, profileImage }) => {
  let [loginClicked, setLogin] = useState(false);

  const logging = login ? (
    <ClickAwayListener onClickAway={() => setLogin(false)}>
      <div
        className={navbarStyle.rightSide}
        onClick={() => setLogin(!loginClicked)}
      >
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwWMJbZoZ26ZyYB8M-1e7OLBVUWXRLNSO6A&usqp=CAU"
          }
        />
        <p>{username}</p>
        <ul
          className={`${navbarStyle.userOption} ${
            loginClicked ? navbarStyle.userOptionClicked : null
          }`}
        >
          <li>
            <Link href="#">
              <a>Profile</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      </div>
    </ClickAwayListener>
  ) : (
    <Link href="/user/login">
      <p className={`${navbarStyle.rightSide} ${navbarStyle.login}`}>Login</p>
    </Link>
  );
  return logging;
};
export default function Navbar() {
  return (
    <div className={navbarStyle.navbarContainer}>
      <div className={navbarStyle.leftSide}>
        <Logo logoImage={logo} />
        <ul className={navbarStyle.navItemsContainer}>
          <li className={navbarStyle.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={navbarStyle.navItem}>
            <Link href="/library">
              <a>library</a>
            </Link>
          </li>
          <li className={navbarStyle.navItem}>
            <Link href="/news">
              <a>News</a>
            </Link>
          </li>
        </ul>
      </div>
      <Login login={false} username={"osama hayyan"} profileImage={userImage} />
    </div>
  );
}
