import React, { CSSProperties } from "react";
import styles from "./hotmanga.module.css";
import { mangaType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";
import Rate from "../Rate";
import { useRouter } from "next/router";

type Props = {
  manga: mangaType;
  style?: CSSProperties;
  className?: string;
};

const HotManga = ({ manga, className, style }: Props) => {
  const router = useRouter();
  const handleNavigationToManga = () => {
    router.push(`/series/${manga.title}/${manga._id}`);
  };
  return (
    <div
      style={style}
      className={`${styles.container} ${className}`}
      onClick={handleNavigationToManga}
    >
      <RemoteImage src={manga.image} width={190} height={250} />
      <section className={styles.titleSection}>
        <div className={styles.categoryContainer}>
          {manga.category.map((item, i) => {
            if (i > 1) return null;
            if (i > 0) return <p key={i}>{item.category}</p>;
            return <p key={i}>{item.category},</p>;
          })}
        </div>
        <h2>{manga.title}</h2>
      </section>
      <Rate rate={manga.rate} size={20} className={styles.rate} />
      <section className={styles.viewsSection}>
        <div>
          <p>{manga.views}</p>
          <p>views</p>
        </div>
        <div>
          <p>+{manga.chapters.length}</p>
          <p>chapter</p>
        </div>
      </section>
    </div>
  );
};

export default HotManga;
