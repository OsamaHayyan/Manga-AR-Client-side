import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import * as pagenation from "./pagenation.module.css";

export default function Pagenation({ handlePage, mangaPages, sort, page }) {
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    if (page >= mangaPages) return;
    handlePage({ ...sort, page: page + 1 });
    router.replace(`/library?page=${page}`);
  };

  const handleLast = (e) => {
    e.preventDefault();
    if (page === 1) return false;
    handlePage({ ...sort, page: page - 1 });
    router.replace(`/library?page=${page}`);
  };
  return (
    <>
      <div className={pagenation.container}>
        <span
          href={`/library?page=${page}`}
          className={`${pagenation.span} ${
            page <= 1 ? pagenation.un_click_last : ""
          } ${pagenation.last}`}
          onClick={handleLast}
        >
          Last
        </span>
        <span
          href={`/library?page=${page}`}
          className={`${pagenation.span} ${
            page >= mangaPages ? pagenation.un_click_next : ""
          }`}
          onClick={handleNext}
        >
          Next
        </span>
      </div>
    </>
  );
}
