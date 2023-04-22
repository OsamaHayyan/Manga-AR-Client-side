import React, { useEffect, useState } from "react";
import { FilledStar, HalfFilledStar, Star } from "./icons";
import rateStyle from "../styles/rate.module.css";
export default function Rate({
  className,
  style,
  rate,
  width,
  height,
  handleRate,
}: {
  className?: string;
  style?: React.CSSProperties;
  rate: number;
  width: string;
  height: string;
  acceptRate?: boolean;
  handleRate?: (rate: number) => Promise<void>;
}) {
  const [userRate, setUserRate] = useState(0);

  return (
    <div className={`${rateStyle.rateContainer} ${className}`} style={style}>
      {!handleRate
        ? [1, 2, 3, 4, 5].map((i) => {
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
            return (
              <Star key={i} width={width} height={height} color={"#D100B2"} />
            );
          })
        : [1, 2, 3, 4, 5].map((i) => {
            if (userRate >= i)
              return (
                <FilledStar
                  key={i}
                  width={width}
                  height={height}
                  color={"#D100B2"}
                  onClick={() => {
                    setUserRate(i);
                    handleRate(i);
                  }}
                />
              );
            return (
              <Star
                key={i}
                width={width}
                height={height}
                color={"#D100B2"}
                onClick={() => {
                  setUserRate(i);
                  handleRate(i);
                }}
              />
            );
          })}
    </div>
  );
}
