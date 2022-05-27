import React from "react";
import { AppBar } from "@mui/material";
import * as navbarStyle from "./navbar.module.css";
import * as image from "../../public/images/logo.png";
import Image from "next/image";
const Logo = ({ logoImage }) => {
  if (logoImage) {
    return (
      <div className={navbarStyle.logoImageWarpper}>
        <Image
          src={logoImage}
          layout="intrinsic"
          className={navbarStyle.logoImage}
        />
      </div>
    );
  }
  return <h2 className={navbarStyle.logoName}>Logo</h2>;
};
export default function Navbar() {
  return (
    <div className={navbarStyle.navbarContainer}>
      <div className={navbarStyle.leftSide}>
        <Logo logoImage={image} />
        <ul className={navbarStyle.navItemsContainer}>
          <li className={navbarStyle.navItem}>Item 1</li>
          <li className={navbarStyle.navItem}>Item 2</li>
          <li className={navbarStyle.navItem}>Item 3</li>
        </ul>
      </div>
      <div className={navbarStyle.rightSide}>image</div>
    </div>
  );
}
