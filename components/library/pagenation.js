import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import * as pagenation from "./pagenation.module.css";

export default function Pagenation({ handlePage, mangaPages, sort, pageNum }) {
  const router = useRouter();
  const page = useRef(1);
  if (!router.query.page) {
    page.current = 1;
  } else if (!router.query.page && page.current != 1) {
    page.current = 1;
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (pageNum >= mangaPages) return;
    // page.current++;
    handlePage({ ...sort, page: pageNum + 1 });
    router.replace(`/library?page=${page.current}`);
  };

  const handleLast = (e) => {
    e.preventDefault();
    if (pageNum === 1) return false;
    // if (!router.query.page) return (page.current = 1);
    // page.current--;
    handlePage({ ...sort, page: pageNum - 1 });
    router.replace(`/library?page=${page.current}`);
  };
  // console.log(`query ${pageNum <= 1}`);
  // console.log(`page Count ${page.current === 1}`);
  // console.log(`page count ${page.current}`);
  // console.log(`page query ${router.query.page}`);
  // console.log(`next qeury ${pageNum >= mangaPages}`);
  // console.log(`next current ${page.current >= mangaPages}`);

  console.log(page.current);
  return (
    <>
      <div className={pagenation.container}>
        <span
          href={`/library?page=${page.current}`}
          className={`${pagenation.span} ${
            pageNum <= 1 ? pagenation.un_click_last : ""
          } ${pagenation.last}`}
          onClick={handleLast}
        >
          Last
        </span>
        <span
          href={`/library?page=${page.current}`}
          className={`${pagenation.span} ${
            pageNum >= mangaPages ? pagenation.un_click_next : ""
          }`}
          onClick={handleNext}
        >
          Next
        </span>
      </div>
    </>
  );
}
