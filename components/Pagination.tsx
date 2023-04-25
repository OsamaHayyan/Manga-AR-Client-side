import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import paginationStyle from "../styles/pagination.module.css";
import Icon from "./Icon";

type Props = {
  totalPages: number;
  shownPages?: number;
  renderON?: string | number | boolean;
  onClick: ({ page }: { page: number }) => void;
};

export default function Pagination({
  renderON,
  totalPages,
  shownPages = 2,
  onClick,
}: Props) {
  const [currentPage, setcurrentPage] = useState(1);
  const [nextPage, setnextPage] = useState(
    Array(shownPages)
      .fill(0, 0)
      .map((_, i) => currentPage + i + 1)
  );
  const [previousPage, setpreviousPage] = useState(
    Array(shownPages)
      .fill(0, 0)
      .map((_, i) => currentPage - (i + 1))
  );
  const [hasNextPage, sethasNextPage] = useState(currentPage < totalPages);
  const [hasPreviousPage, sethasPreviousPage] = useState(currentPage > 1);

  const router = useRouter();
  const handleNavigation = (newPage: number) => {
    setcurrentPage(newPage);
    setnextPage(
      Array(shownPages)
        .fill(0, 0)
        .map((_, i) => newPage + i + 1)
    );
    setpreviousPage(
      Array(shownPages)
        .fill(0, 0)
        .map((_, i) => newPage - (i + 1))
    );
    sethasNextPage(newPage < totalPages);
    sethasPreviousPage(newPage > 1);
    onClick({ page: newPage });
  };

  useEffect(() => {
    setcurrentPage(1);
    setnextPage(
      Array(shownPages)
        .fill(0, 0)
        .map((_, i) => 1 + i + 1)
    );
    setpreviousPage(
      Array(shownPages)
        .fill(0, 0)
        .map((_, i) => 1 - (i + 1))
    );
    sethasNextPage(1 < totalPages);
    sethasPreviousPage(false);
  }, [totalPages, renderON]);

  return (
    <div className={paginationStyle.container}>
      {currentPage !== 1 && !previousPage.includes(1) && (
        <button
          style={{ transform: "rotate(180deg)" }}
          className={paginationStyle.button}
          onClick={() => handleNavigation(1)}
        >
          <Icon name="caretRight" size={11} />
          <Icon name="caretRight" size={11} />
        </button>
      )}

      {hasPreviousPage &&
        previousPage.map((_, i, arr) => {
          let page = arr[arr.length - (i + 1)];
          if (page <= 0) return;
          return (
            <button
              key={i}
              className={paginationStyle.button}
              onClick={() => handleNavigation(page)}
            >
              {page}
            </button>
          );
        })}
      <button className={`${paginationStyle.button} ${paginationStyle.active}`}>
        {currentPage}
      </button>

      {hasNextPage &&
        nextPage.map((page, i) => {
          if (page > totalPages) return;
          return (
            <button
              key={i}
              className={paginationStyle.button}
              onClick={() => handleNavigation(page)}
            >
              {page}
            </button>
          );
        })}

      {totalPages !== currentPage && !nextPage.includes(totalPages) && (
        <button
          className={paginationStyle.button}
          onClick={() => handleNavigation(totalPages)}
        >
          <Icon name="caretRight" size={11} />
          <Icon name="caretRight" size={11} />
        </button>
      )}
    </div>
  );
}
