import React from "react";
import styles from "./last_release.module.css";
import { lastReleaseType, mangaType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";
import Rate from "../Rate";
import Icon from "../Icon";
import { useRouter } from "next/router";

type Props = {
  lastRelease: mangaType;
};

const LastRelease = ({ lastRelease }: Props) => {
  const router = useRouter();
  const handleNavigationToManga = () => {
    router.push(`/series/${lastRelease.title}/${lastRelease._id}`);
  };
  const handleNavigationToChapter = (id: string) => {
    router.push(
      `/series/${lastRelease.title}/chapter/${id}?id=${lastRelease._id}`
    );
  };
  return (
    <div className={styles.container}>
      <RemoteImage
        style={{ cursor: "pointer" }}
        src={lastRelease.image}
        height={285}
        width={160}
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
            rate={lastRelease.rate}
            size={20}
            style={{ marginTop: 5, marginBottom: 10 }}
          />
          {lastRelease.chapters.reverse().map((item, i) => {
            if (i > 2) return null;
            return (
              <h2
                key={i}
                className={styles.chapter}
                onClick={() => handleNavigationToChapter(item._id)}
              >
                <Icon name="file" size={25} color="#D100B2" /> Chapter{" "}
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
