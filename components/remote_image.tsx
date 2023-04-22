import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

export default function RemoteImage({
  src,
  width = "318px",
  height = "453px",
  className,
  style,
  priority = false,
}: Props) {
  return (
    <div
      className={className}
      style={{
        flexBasis: width,
        height: height,
        position: "relative",
        ...style,
      }}
    >
      <Image
        src={`http://localhost:8080/${src}`}
        alt=""
        fill
        sizes="318px"
        style={{ objectFit: "cover", borderRadius: "5px" }}
        priority={priority}
      />
    </div>
  );
}
