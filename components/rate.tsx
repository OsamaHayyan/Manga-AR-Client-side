import React from "react";
import { FilledStar, HalfFilledStar, Star } from "./icons";
import rateStyle from "../styles/rate.module.css";
export default function Rate({
  className,
  style,
  rate,
  width,
  height,
}: {
  className?: string;
  style?: React.CSSProperties;
  rate: number;
  width: string;
  height: string;
}) {
  return (
    <div className={`${rateStyle.rateContainer} ${className}`} style={style}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (Math.floor(rate) >= i)
          return (
            <FilledStar
              key={i}
              width={width}
              height={height}
              color={"#D100B2"}
            />
          );
        if (Math.round(rate) === i)
          return (
            <HalfFilledStar
              key={i}
              width={width}
              height={height}
              color={"#D100B2"}
            />
          );
        return <Star key={i} width={width} height={height} color={"#D100B2"} />;
      })}
    </div>
  );
}
