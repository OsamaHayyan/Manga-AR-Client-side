import React from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { Link } from "react-scroll";

export default function Expand({
  expand,
  handleExpand,
  target,
  container,
  style,
  size,
  color,
}) {
  return (
    <>
      {expand ? (
        target && container ? (
          <Link
            to={target}
            containerId={container}
            smooth={true}
            duration={200}
            isDynamic={true}
            style={{ lineHeight: "0" }}
          >
            <FaArrowCircleUp
              size={size || "16px"}
              onClick={handleExpand}
              style={style}
              color={color}
            />
          </Link>
        ) : (
          <FaArrowCircleUp
            size={size || "16px"}
            onClick={handleExpand}
            style={style}
            color={color}
          />
        )
      ) : (
        <FaArrowCircleDown
          size={size || "16px"}
          onClick={handleExpand}
          style={style}
          color={color}
        />
      )}
    </>
  );
}
