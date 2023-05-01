import React, { useState } from "react";
import chaptersStyle from "./style/chapters.module.css";
import Icon from "../Icon";
import { useRouter } from "next/router";
import { chapter } from "../../util/interfaces";
import moment from "moment";
type Props = {
  mangaId: string;
  mangaTitle: string;
  chapters: chapter[];
};

const Chapters = ({ chapters, mangaId, mangaTitle }: Props) => {
  const router = useRouter();
  const [showAllChapters, setShowAllChapters] = useState(false);
  const navigateToChapter = async (id: string) => {
    router.push(`/series/${mangaTitle}/chapter/${id}?id=${mangaId}`);
  };
  return (
    <>
      <div className={chaptersStyle.toggleBtn}>
        <p className={chaptersStyle.toggleBtnActive}>Chapters</p>
        <p>Comments</p>
      </div>
      <div className={chaptersStyle.chaptersContainer}>
        {chapters.map((chapter, i) => {
          if (!showAllChapters && i > 11) return null;
          let publisdTime = moment(chapter.date).fromNow();

          return (
            <div
              key={i}
              className={chaptersStyle.chapterBox}
              onClick={() => navigateToChapter(chapter._id)}
            >
              <div className={chaptersStyle.chapterHeader}>
                <Icon name="file" size={25} />
                <p>
                  {chapter.chapterNum} | Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Odio, ducimus? Excepturi debitis dolor
                  voluptates! Sunt numquam ex dolorem assumenda voluptate a,
                  ratione fuga nostrum, incidunt quis sint, deserunt aliquam
                  adipisci?
                </p>
              </div>
              <div className={chaptersStyle.chapterFooter}>
                <span style={{ fontWeight: 300 }}>{publisdTime}</span>
                <span style={{ fontWeight: 300 }}>
                  <Icon name="eyeBold" size={14} />
                  {chapter.views}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {!showAllChapters && chapters.length > 0 && (
        <div
          className={chaptersStyle.showAllChapters}
          onClick={() => setShowAllChapters(true)}
        >
          <p>View more</p>
          <Icon name="rightArrow" size={85} />
        </div>
      )}
    </>
  );
};

export default Chapters;
