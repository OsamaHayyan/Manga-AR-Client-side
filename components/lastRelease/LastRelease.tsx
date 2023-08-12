import React, { useEffect, useState } from "react";
import styles from "./last_release.module.css";
import { chapter, mangaType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";
import Rate from "../Rate";
import Icon from "../Icon";
import { useRouter } from "next/router";

type Props = {
  lastRelease: mangaType;
};

const LastRelease = ({ lastRelease }: Props) => {
  const router = useRouter();
  const [orderedChapters, setOrderedChapters] = useState<chapter[]>(null);

  const handleNavigationToManga = () => {
    router.push(`/series/${lastRelease.title}/${lastRelease._id}`);
  };
  const handleNavigationToChapter = (id: string) => {
    router.push(
      `/series/${lastRelease.title}/chapter/${id}?id=${lastRelease._id}`
    );
  };

  useEffect(() => {
    setOrderedChapters(lastRelease.chapters.reverse());
  }, [lastRelease]);
  return (
    <div className={styles.container}>
      <RemoteImage
        className={styles.image}
        style={{ cursor: "pointer" }}
        src={lastRelease.image}
        height={200}
        width={130}
        onClick={() => handleNavigationToManga()}
      />
      <div className={styles.lastReleaseInfo}>
        <h2 onClick={() => handleNavigationToManga()}>{lastRelease.title}</h2>
        <div className={styles.lastReleaseBody}>
          <div className={styles.categoryContainer}>
            {lastRelease.category.map((item, i) => {
              if (i > 1) return null;
              if (i > 0) return <p key={i}>{item.category}</p>;
              return <p key={i}>{item.category},</p>;
            })}
          </div>
          <Rate
            className={styles.rateContainer}
            rate={lastRelease.rate}
            size={16}
          />
          {orderedChapters?.map((item, i) => {
            if (i > 2) return null;
            return (
              <h2
                key={i}
                className={styles.chapter}
                onClick={() => handleNavigationToChapter(item._id)}
              >
                <Icon name="file" size={12} color="#D100B2" /> Chapter{" "}
                {item.chapterNum}{" "}
              </h2>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LastRelease;
