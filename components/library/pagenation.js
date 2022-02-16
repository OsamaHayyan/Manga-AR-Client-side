import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import * as pagenation from "./pagenation.module.css";

export default function Pagenation({ handlePage, mangaPages }) {
  const router = useRouter();
  const page = useRef(1);
  if (!router.query.page) {
    page.current = 1;
  } else if (!router.query.page && page.current != 1) {
    page.current = 1;
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (page.current >= mangaPages) return;
    page.current++;
    handlePage(page.current);
    router.push(`/library?page=${page.current}`);
  };

  const handleLast = (e) => {
    e.preventDefault();
    if (page.current === 1) return false;
    // if (!router.query.page) return (page.current = 1);
    page.current--;
    handlePage(page.current);
    router.push(`/library?page=${page.current}`);
  };
  return (
    <>
      <div className={pagenation.container}>
        <span
          href={`/library?page=${page.current}`}
          className={`${pagenation.span} ${
            router.query.page <= 1 || page.current === 1
              ? pagenation.un_click_last
              : ""
          } ${pagenation.last}`}
          onClick={handleLast}
        >
          Last
        </span>
        <span
          href={`/library?page=${page.current}`}
          className={`${pagenation.span} ${
            router.query.page >= mangaPages || page.current >= mangaPages
              ? pagenation.un_click_next
              : ""
          }`}
          onClick={handleNext}
        >
          Next
        </span>
      </div>
    </>
  );
}
