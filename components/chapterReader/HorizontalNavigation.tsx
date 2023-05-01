import React from "react";
import Icon from "../Icon";
import horizontalNavigationStyle from "./styles/horizontalNavigation.module.css";

type Props = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  chaptersLength: number;
};

const HorizontalNavigation = ({
  pageNumber: pageNum,
  setPageNumber: setPageNum,
  chaptersLength,
}: Props) => {
  return (
    <>
      <div
        className={horizontalNavigationStyle.footerButton}
        onClick={() => pageNum > 0 && setPageNum(pageNum - 1)}
      >
        <Icon
          name="downArrow"
          size={16}
          style={{ transform: "rotate(90deg)" }}
        />
        <p>Previous</p>
      </div>
      <div
        className={horizontalNavigationStyle.footerButton}
        onClick={() => pageNum + 1 < chaptersLength && setPageNum(pageNum + 1)}
      >
        <p>Next</p>
        <Icon
          name="downArrow"
          size={16}
          style={{ transform: "rotate(-90deg)" }}
        />
      </div>
    </>
  );
};

export default HorizontalNavigation;
