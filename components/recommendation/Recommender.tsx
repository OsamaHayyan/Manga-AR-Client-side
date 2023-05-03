import React from "react";
import recommenderStyle from "./recommender.module.css";
import RemoteImage from "../Remote_image";
import { recommendationsType } from "../../util/interfaces";
import { useRouter } from "next/router";
import { title } from "process";
import Recommendation from "./Recommendation";
type Props = {
  recommendations: recommendationsType[];
  style?: React.CSSProperties;
  className?: string;
};

function Recommender({ recommendations, style, className }: Props) {
  const router = useRouter();

  return (
    <div className={`${recommenderStyle.container} ${className}`} style={style}>
      <p className={recommenderStyle.header}>RECOMMENDED FOR YOU</p>
      <div className={recommenderStyle.recommendationsContainer}>
        {recommendations?.map(
          (item, i) =>
            i <= 5 && <Recommendation key={i} recommendation={item} />
        )}
      </div>
    </div>
  );
}

export default Recommender;
