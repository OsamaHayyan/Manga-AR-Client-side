import React from "react";
import footerStyle from "./footer.module.css";
import Icon from "../Icon";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";
type Props = {};

function Footer({}: Props) {
  return (
    <div className={footerStyle.container}>
      <div className={footerStyle.backgroundImage}></div>
      <section className={footerStyle.footerContent}>
        <div className={footerStyle.footerNav}>
          <div className={footerStyle.logoContainer}>
            <Image src={logo} alt="logo" fill placeholder="blur" />
          </div>
          <div className={footerStyle.navTabs}>
            <Link href="/">Home</Link>
            <Link href="/library">Library</Link>
          </div>
        </div>
        <div className={footerStyle.policy}>
          <p>All rights reserved.</p>
          <div className={footerStyle.termsContainer}>
            <p>Privacy Policy</p>
            <p>|</p>
            <p>Terms of use</p>
            <p>|</p>
            <p>Sitemap</p>
          </div>
        </div>
      </section>
      <section className={footerStyle.socialMediaSection}>
        <div
          className={footerStyle.socialMediaIconContainer}
          style={{ background: "#004587", border: "none" }}
        >
          <Icon name="blankFacebook" color="#000000" size={33} />
        </div>
        <div className={footerStyle.socialMediaIconContainer}>
          <Icon name="twitter" color="#C8C8C8" size={40} />
        </div>
        <div className={footerStyle.socialMediaIconContainer}>
          <Icon name="instagram" color="#C8C8C8" size={35} />
        </div>
      </section>
    </div>
  );
}

export default Footer;
