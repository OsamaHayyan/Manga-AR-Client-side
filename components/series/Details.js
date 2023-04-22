import React, { useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Col, Container, Image, Row } from "react-bootstrap";
import axios from "axios";

import * as details from "./details.module.css";
import {
  TiEye,
  TiStarOutline,
  TiStarFullOutline,
  TiPen,
  TiCalendar,
} from "react-icons/ti";
import { FaBookOpen } from "react-icons/fa";
import { animateScroll, Element, Link } from "react-scroll";
import Abbreviate_Numbers from "../abbreviate_numbers";
import Expand from "../expand";
import { useRouter } from "next/dist/client/router";
import Favorite from "./favorite";

export default function Details({ manga }) {
  const router = useRouter();
  const [mangaData, setManga] = useState(manga);
  const [expand, setExpand] = useState(false);
  const handleRate = async (rate) => {
    const mangaId = router.query.mangaId;
    const { data } = await axios.post(
      `http://localhost:8080/mangas/rate/${mangaId}`,
      { rate: rate }
    );
    console.log(data);
    setManga({ ...mangaData, rate: data });
  };

  const handleStory = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    setManga(manga);
  }, [manga]);

  return (
    <Container fluid className={details.container}>
      <Row xs="auto" className={details.row}>
        <Col className={details.col1}>
          <Image
            src={`http://localhost:8080/${mangaData.image}`}
            rounded
            className={details.image}
          />
        </Col>
        <Col
          className={`d-flex flex-column justify-content-start ${details.col2}`}
        >
          {/* Head */}
          <div className={details.head}>
            <div className={details.title}>{mangaData.title}</div>
            <p className={details.status}>{mangaData.status}</p>
          </div>

          {/* Category */}
          <div className="d-flex flex-row align-items-center flex-wrap mb-1">
            {mangaData.category.map((c) => (
              <p key={c._id} className={details.category}>
                {c.category}
              </p>
            ))}
          </div>

          {/* Views && Rate */}
          <div
            className="d-flex flex-row align-items-center"
            style={{ marginBottom: "20px" }}
          >
            <div
              className={`d-flex flex-row align-items-center ${details.views}`}
            >
              <TiEye size="20px" color="#ff5b3b" />
              <p>
                <Abbreviate_Numbers number={mangaData.views} />
              </p>
            </div>
            <div
              className={`d-flex flex-row align-items-center ${details.rate}`}
            >
              <ReactStars
                filledIcon={
                  <TiStarFullOutline
                    className={details.starRateChild}
                    size="20px"
                    color="#FFBD4F"
                  />
                }
                emptyIcon={
                  <TiStarOutline
                    className={details.starRateChild}
                    size="20px"
                    color="#FFBD4F"
                  />
                }
                onChange={(rate) => handleRate(rate)}
                value={mangaData.rate}
                classNames={details.starRate}
              />
              <p>{mangaData.rate}</p>
            </div>
          </div>

          {/* Auther && Story */}
          <div
            className={`d-flex flex-column align-items-left ${details.authContainer}`}
            style={expand ? { maxHeight: "15rem" } : null}
          >
            <div
              className={`d-flex flex-row justify-start ${details.auth_date_container}`}
            >
              <p className={details.auther}>
                <TiPen color="#ff5b3b" style={{ marginRight: "5px" }} />
                Auther:{" "}
                {mangaData.auther
                  ? mangaData.auther
                      .map((auther) => auther.autherName)
                      .toString()
                  : "unavailable"}
              </p>

              <Expand
                expand={expand}
                handleExpand={handleStory}
                container="storyContainer"
                target="story"
                style={{ position: "absolute", right: "10px", top: 0 }}
              />
            </div>
            <p className={details.date}>
              <TiCalendar color="#ff5b3b" style={{ marginRight: "5px" }} />
              Published date: {mangaData.date}
            </p>

            <Element
              id="storyContainer"
              name="story"
              style={expand ? { overflowX: "hidden" } : { overflow: "hidden" }}
            >
              <p className={details.story}>
                <FaBookOpen color="#ff5b3b" style={{ marginRight: "5px" }} />
                {mangaData.story}
              </p>
            </Element>
          </div>
        </Col>
      </Row>
      <Favorite />
    </Container>
  );
}
