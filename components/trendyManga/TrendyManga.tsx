import React from "react";
import styles from "./trendy_manga.module.css";
import { mangaType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";
import { useRouter } from "next/router";
type Props = {
  manga: mangaType;
};

const TrendyManga = ({ manga }: Props) => {
  const router = useRouter();
  const handleNavigationToManga = () => {
    router.push(`/series/${manga.title}/${manga._id}`);
  };
  return (
    <div className={styles.container} onClick={handleNavigationToManga}>
      <RemoteImage src={manga.image} height={270} width={200} />
      <div className={styles.mangaBody}>
        <h2 className={styles.title}>{manga.title}</h2>
        <p className={styles.chapter}>Chapter +{manga.chapters.length}</p>
        <p className={styles.views}>{manga.views} views</p>
      </div>
    </div>
  );
};

export default TrendyManga;
