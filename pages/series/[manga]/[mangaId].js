import React, { useEffect, useState, useRef } from "react";
import { IconContext } from "react-icons";

import * as manga from "../../../styles/manga_page.module.css";
import Chapters from "../../../components/series/Chapters";
import Details from "../../../components/series/Details";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { animateScroll } from "react-scroll";
import Favorite from "../../../components/series/favorite";

export default function Manga({ mangaData, DataExist }) {
  const [hide, setHide] = useState(true);
  const bannar = "/images/banner.jpg";
  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100%", position: "relative" }}
    >
      <div
        className={manga.image}
        style={
          bannar
            ? { backgroundImage: `url(${bannar})` }
            : { backgroundImage: "url(/images/default_bannar.jpg)" }
        }
      ></div>
      <Details manga={{ ...mangaData, chapters: null }} />
      <Favorite />
      <Chapters
        handleHide={setHide}
        hide={hide}
        chapters={mangaData.chapters}
      />
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

export async function getServerSideProps(context) {
  try {
    let DataExist = true;
    const manga = await fetch(
      "http://localhost:8080/mangas/manga/620d758d0b812cc56875e403"
    );
    const mangaData = await manga.json();

    if (manga.message) {
      DataExist = false;
    }

    return {
      props: { mangaData: mangaData, DataExist }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      props: { FetchError: "Fetch Error" },
    };
  }
}