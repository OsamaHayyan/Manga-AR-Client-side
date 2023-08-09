import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import defaultImage from "../public/images/default_image.jpg";

type Props = {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export default function RemoteImage({
  src,
  width = 318,
  height = 453,
  className,
  style,
  priority = false,
  onClick,
}: Props) {
  let newSrc: string;
  if (src) {
    newSrc = src.includes("public")
      ? `${process.env.NEXT_PUBLIC_HOSTURL}/${src}`
      : src;
  }
  const [imageSource, setImageSource] = useState<string | StaticImageData>(
    newSrc
  );
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        ...style,
      }}
    >
      <Image
        src={imageSource}
        onError={() => setImageSource(defaultImage)}
        alt=""
        width={width}
        height={height}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "5px",
          width: "100%",
          height: "100%",
        }}
        priority={priority}
      />
    </div>
  );
}
