import React, { useEffect, useState } from "react";
import styles from "./news.module.css";
import { newsType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";

type Props = {
  news: newsType;
};

const News = ({ news }: Props) => {
  const [date, setDate] = useState(null);
  useEffect(() => {
    setDate(new Date(news.createdAt).toLocaleDateString());
  }, []);

  return (
    <div className={styles.container}>
      <RemoteImage
        className={styles.image}
        src={news.poster}
        height={200}
        width={246}
      />
      <div className={styles.newsBody}>
        <p>Posted on {date}</p>
        <h2>{news.title}</h2>
        <p>{news.topic}</p>
      </div>
    </div>
  );
};

export default News;
