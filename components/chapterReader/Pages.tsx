/* eslint-disable @next/next/no-img-element */
import React from "react";
import pagesStyle from "./styles/pages.module.css";
type Props = {
  page: string[];
};

function Pages({ page }: Props) {
  return (
    <div className={pagesStyle.imageContainer}>
      {page.map((image, i) => {
        return (
          <React.Fragment key={i}>
            {" "}
            <img
              src={`${process.env.NEXT_PUBLIC_HOSTURL}/${image}`}
              alt="image"
              className={pagesStyle.image}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Pages;
