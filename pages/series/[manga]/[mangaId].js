import React, { useEffect, useState, useRef } from "react";
import Error from "next/error";
import { IconContext } from "react-icons";

import * as manga from "../../../styles/manga_page.module.css";
import Chapters from "../../../components/series/Chapters";
import Details from "../../../components/series/Details";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { animateScroll } from "react-scroll";
import Favorite from "../../../components/series/favorite";
import axios from "axios";

export default function Manga({
  mangaData,
  DataExist,
  statusCode,
  errorMessage,
}) {
  const [hide, setHide] = useState(true);
  const bannar = "/images/banner.jpg";
  return (
    <>
      {DataExist ? (
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
      ) : (
        <Error statusCode={statusCode} title={errorMessage} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const DataExist = true;
    const { data } = await axios.get(
      "http://localhost:8080/mangas/manga/620d758d0b812cc56875e403"
    );
    const mangaData = await data;
    return {
      props: {
        mangaData: mangaData,
        DataExist,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    const DataExist = false;
    let errorMessage;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      error.response.data.data.forEach((d) => (errorMessage = d.msg));
      return {
        props: { statusCode: error.response.status, errorMessage, DataExist },
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        props: {
          statusCode: 500,
          errorMessage: "Server deosn't responsed, Please try again later",
          DataExist,
        },
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      return {
        props: {
          statusCode: 500,
          errorMessage: "Please try again later",
          DataExist,
        },
      };
    }
  }
}
