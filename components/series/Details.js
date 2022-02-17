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

export default function Details() {
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
          <Image src="/images/manga.jpg" rounded className={details.image} />
        </Col>
        <Col
          className={`d-flex flex-column justify-content-start ${details.col2}`}
        >
          {/* Head */}
          <div className={details.head}>
            <div className={details.title}>Manga Title</div>
            <p className={details.status}>On Going</p>
          </div>

          {/* Category */}
          <div className="d-flex flex-row align-items-center flex-wrap mb-1">
            {category.map((c) => (
              <p key={Math.random().toString()} className={details.category}>
                {c}
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
                <Abbreviate_Numbers number={1234} />
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
                value={2.6}
                classNames={details.starRate}
              />
              <p>3.3</p>
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
                Auther: Auther Name
              </p>

              <p className={details.date}>
                <TiCalendar color="#ff5b3b" style={{ marginRight: "5px" }} />
                Published date: 2018
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                quis dolor earum similique ipsam! Quibusdam illum quo, ipsa,
                necessitatibus ratione voluptas ullam est, in fugit deleniti
                nemo magnam odio? Iure. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Libero quis dolor earum similique ipsam!
                Quibusdam illum quo, ipsa, necessitatibus ratione voluptas ullam
                est, in fugit deleniti nemo magnam odio? Iure. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Libero quis dolor earum
                similique ipsam! Quibusdam illum quo, ipsa, necessitatibus
                ratione voluptas ullam est, in fugit deleniti nemo magnam odio?
                Iure.
              </p>
            </Element>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
