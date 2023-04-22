import React, { useState } from "react";
import Icon from "./Icon";
import rateStyle from "../styles/rate.module.css";
export default function Rate({
  className,
  style,
  rate,
  size,
  handleRate,
}: {
  className?: string;
  style?: React.CSSProperties;
  rate: number;
  size: number;
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
                <Icon name="filledStar" key={i} size={size} color={"#D100B2"} />
              );
            if (Math.round(rate) === i)
              return (
                <Icon
                  name="halfFilledStar"
                  key={i}
                  size={size}
                  color={"#D100B2"}
                />
              );
            return <Icon name="star" key={i} size={size} color={"#D100B2"} />;
          })
        : [1, 2, 3, 4, 5].map((i) => {
            if (userRate >= i)
              return (
                <Icon
                  key={i}
                  name="filledStar"
                  size={size}
                  color={"#D100B2"}
                  onClick={() => {
                    setUserRate(i);
                    handleRate(i);
                  }}
                />
              );
            return (
              <Icon
                key={i}
                name="star"
                size={size}
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
