import React from "react";
import footerStyle from "./footer.module.css";
import Icon from "../Icon";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
  return (
    <div className={footerStyle.container}>
      <div className={footerStyle.backgroundImage}></div>
      <section className={footerStyle.footerContent}>
        <div className={footerStyle.footerNav}>
          <Link href={"/"} className={footerStyle.logoContainer}>
            <Icon name="logo" className={footerStyle.logo} />
          </Link>
          <div className={footerStyle.navTabs}>
            <Link href="/">Home</Link>
            <Link href="/library">Library</Link>
          </div>
        </div>
        <div className={footerStyle.policy}>
          <div className={footerStyle.copyrightsContainer}>
            <Link target="_blank" href={"https://linkedin.com/in/osamahayyan"}>
              Developed by{" "}
              <span className={footerStyle.devName}>Osama Hayyan</span>
            </Link>
            <Link
              target="_blank"
              href={"https://www.behance.net/rahmaelmadawy"}
            >
              UI/UX by{" "}
              <span className={footerStyle.devName}>Rahma Elmadawy</span>
            </Link>
          </div>
          <div className={footerStyle.termsContainer}>
            <Link href={"#"}>
              <p>© Egymanga.me</p>
            </Link>
            <Link href={"#"}>
              <p>
                Egymanga.me does not store any files on our server, we only
                linked to the 3rd party services.
              </p>
            </Link>
          </div>
        </div>
      </section>
      <section className={footerStyle.socialMediaSection}>
        <Link
          href={"#"}
          className={footerStyle.socialMediaIconContainer}
          style={{ background: "#004587", border: "none" }}
        >
          <Icon
            name="blankFacebook"
            color="#000000"
            size={33}
            className={footerStyle.socialIcon}
          />
        </Link>
        <Link href={"#"} className={footerStyle.socialMediaIconContainer}>
          <Icon
            name="twitter"
            color="#C8C8C8"
            size={40}
            className={footerStyle.socialIcon}
          />
        </Link>
        <Link href={"#"} className={footerStyle.socialMediaIconContainer}>
          <Icon
            name="instagram"
            color="#C8C8C8"
            size={35}
            className={footerStyle.socialIcon}
          />
        </Link>
      </section>
    </div>
  );
}

export default Footer;
