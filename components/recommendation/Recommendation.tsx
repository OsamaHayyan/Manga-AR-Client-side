import React from "react";
import styles from "./recommendation.module.css";
import RemoteImage from "../Remote_image";
import { recommendationsType } from "../../util/interfaces";
import { useRouter } from "next/router";

type Props = {
  recommendation: recommendationsType;
  style?: React.CSSProperties;
  className?: string;
};

const Recommendation = ({ recommendation, style, className }: Props) => {
  const router = useRouter();
  const handleNavigationToManga = (id: string, title: string) => {
    router.push(`/series/${title}/${id}`);
  };
  return (
    <div
      style={style}
      className={`${styles.recommendation} ${className}`}
      onClick={() =>
        handleNavigationToManga(recommendation._id, recommendation.title)
      }
    >
      <RemoteImage
        src={recommendation.image}
        width={148}
        height={108}
        className={styles.remoteImage}
      />
      <div className={styles.data}>
        <p className={styles.title}>{recommendation.title}</p>
        <p className={styles.chapterNum}>
          Chapter +{recommendation.chapters.length}
        </p>
        <p className={styles.views}>{recommendation.views} views</p>
      </div>
    </div>
  );
};

export default Recommendation;
