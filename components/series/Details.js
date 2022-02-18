import React, { useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Col, Container, Image, Row } from "react-bootstrap";
import * as details from "./details.module.css";
import {
  TiEye,
  TiStarOutline,
  TiStarFullOutline,
  TiPen,
  TiCalendar,
} from "react-icons/ti";
import { FaArrowCircleDown, FaArrowCircleUp, FaBookOpen } from "react-icons/fa";
import { animateScroll, Element, Link } from "react-scroll";
import Abbreviate_Numbers from "../abbreviate_numbers";
import Expand from "../expand";

export default function Details({ chapter }) {
  let category = ["Action", "Comedy", "Echi", "Action", "Comedy", "Echi"];

  const [expand, setExpand] = useState(false);
  const handleRate = (rate) => {
    console.log(rate);
  };

  const handleStory = () => {
    setExpand(!expand);
  };

  return (
    <Container fluid className={details.container}>
      <Row xs="auto" className={details.row}>
        <Col className={details.col1}>
          <Image
            src={`http://localhost:8080/${chapter.image}`}
            rounded
            className={details.image}
          />
        </Col>
        <Col
          className={`d-flex flex-column justify-content-start ${details.col2}`}
        >
          {/* Head */}
          <div className={details.head}>
            <div className={details.title}>{chapter.title}</div>
            <p className={details.status}>{chapter.status}</p>
          </div>

          {/* Category */}
          <div className="d-flex flex-row align-items-center flex-wrap mb-1">
            {chapter.category.map((c) => (
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
                <Abbreviate_Numbers number={chapter.views} />
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
                value={chapter.rate}
                classNames={details.starRate}
              />
              <p>{chapter.rate}</p>
            </div>
          </div>

          {/* Auther && Story */}
          <div
            className={`d-flex flex-column align-items-left ${details.authContainer}`}
            style={expand ? { maxHeight: "15rem" } : null}
          >
            <div
              className={`d-flex flex-row justify-start mb-1 ${details.auth_date_container}`}
            >
              <p className={details.auther}>
                <TiPen color="#ff5b3b" style={{ marginRight: "5px" }} />
                Auther: {chapter.auther ? chapter.auther : "unavailable"}
              </p>

              <p className={details.date}>
                <TiCalendar color="#ff5b3b" style={{ marginRight: "5px" }} />
                Published date: {chapter.date}
              </p>

              <Expand
                expand={expand}
                handleExpand={handleStory}
                container="storyContainer"
                target="story"
                style={{ position: "absolute", right: "10px", top: 0 }}
              />
            </div>
            <Element
              id="storyContainer"
              name="story"
              style={expand ? { overflowX: "hidden" } : { overflow: "hidden" }}
            >
              <p className={details.story}>
                <FaBookOpen color="#ff5b3b" style={{ marginRight: "5px" }} />
                {chapter.story}
              </p>
            </Element>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
