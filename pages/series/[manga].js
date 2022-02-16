import React, { useEffect, useState, useRef } from "react";
import { IconContext } from "react-icons";

import * as manga from "../../styles/manga_page.module.css";
import Chapters from "../../components/series/Chapters";
import Details from "../../components/series/Details";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { animateScroll } from "react-scroll";
import { Image } from "react-bootstrap";
import Favorite from "../../components/series/favorite";

export default function Manga() {
  const [hide, setHide] = useState(true);
  const bannar = "/images/banner.jpg";

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100%", position: "relative" }}
    >
      {/* <span className={manga.overlay}></span> */}
      {/* <Image
        src={bannar ? bannar : "/images/default_bannar.jpg"}
        className={manga.image}
      /> */}

      <div
        className={manga.image}
        style={
          bannar
            ? { backgroundImage: `url(${bannar})` }
            : { backgroundImage: "url(/images/default_bannar.jpg)" }
        }
      ></div>
      <Details />
      <Favorite />
      <Chapters handleHide={setHide} hide={hide} />
      <FaArrowAltCircleUp
        size="50px"
        color="#ff5b3b"
        onClick={() => animateScroll.scrollToTop({ duration: 100 })}
        className={manga.scroll}
        style={hide ? { transform: "scale(0)" } : null}
      />
    </div>
  );
}
