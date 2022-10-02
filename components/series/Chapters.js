import React, { useEffect, useRef, useState } from "react";
import { Button, Container, SSRProvider, Tab, Tabs } from "react-bootstrap";
import { TiCalendar, TiEye } from "react-icons/ti";
import { animateScroll } from "react-scroll";
import Abbreviate_Numbers from "../abbreviate_numbers";
import Expand from "../expand";
import * as chapter from "./chapter.module.css";

export default function Chapters({ handleHide, hide, chapters }) {
  let arr = [];
  let i = 0;
  while (arr.length < 100) {
    arr.push(i);
    i++;
  }

  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
    handleHide(!hide);
  };

  useEffect(() => {}, [expand]);
  return (
    <Container fluid className={chapter.container}>
      <SSRProvider>
        <Tabs
          defaultActiveKey="chapter"
          id="taps"
          className="mb-3 taps-container"
        >
          <Tab eventKey="chapter" title="Chapters" tabClassName={chapter.tap}>
            <div
              className={chapter.chapters}
              style={
                expand && global.innerWidth > 800
                  ? { maxHeight: (100 / 4) * 100 }
                  : expand && global.innerWidth < 800
                  ? { maxHeight: 100 * 100 }
                  : null
              }
            >
              {chapters && chapters.length == 0 ? (
                <h1>No Chapters yet</h1>
              ) : (
                chapters.map((chr) => (
                  <div
                    key={chr._id}
                    className={chapter.chapters_child}
                    style={expand ? { transform: "scaleY(1)" } : null}
                  >
                    <div className={chapter.chapters_child_top}>
                      <h3>Ch.{chr.chapterNum}</h3>
                      <h3>{chr.name}</h3>
                    </div>
                    <div className={chapter.chapters_child_bottom}>
                      <div className="d-flex flex-row align-items-center">
                        <TiCalendar
                          color="#999"
                          size="16px"
                          style={{ marginRight: "5px" }}
                        />
                        <p>{chr.date}</p>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <TiEye
                          color="#999"
                          size="16px"
                          style={{ marginRight: "5px" }}
                        />
                        <p>
                          <Abbreviate_Numbers number={chr.views} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Tab>
          <Tab eventKey="comment" title="Comments" tabClassName={chapter.tap}>
            <h1>Comments</h1>
          </Tab>
          <Tab
            title={
              <>
                <span onClick={handleExpand}>
                  <span className={chapter.expandLable}>
                    {expand ? "Hide" : "Show"}
                  </span>
                  <Expand expand={expand} size={"20px"} />
                </span>
              </>
            }
            tabClassName={chapter.expand}
          ></Tab>
        </Tabs>
      </SSRProvider>
    </Container>
  );
}
