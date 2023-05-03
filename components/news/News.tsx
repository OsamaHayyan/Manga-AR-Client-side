import React from "react";
import styles from "./news.module.css";
import { newsType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";

type Props = {
  news: newsType;
};

const News = ({ news }: Props) => {
  return (
    <div className={styles.container}>
      <RemoteImage src={news.poster} height={308} width={466} />
      <div className={styles.newsBody}>
        <p>{new Date(news.createdAt).toLocaleDateString()}</p>
        <h2>{news.title}</h2>
        <p>{news.topic}</p>
      </div>
    </div>
  );
};

export default News;
