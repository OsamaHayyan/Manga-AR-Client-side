/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import chapterStyle from "../../../../styles/chapter_reader.module.css";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";
import Icon from "../../../../components/Icon";
import { GetServerSidePropsContext } from "next";
import axios, { AxiosResponse } from "axios";
import {
  chapterType,
  chapterModifiedPagesType,
  mangaType,
} from "../../../../util/interfaces";
import { recommendationsType } from "../../../../util/interfaces";
import { useRouter } from "next/router";
import { chapter } from "../../../../util/interfaces";
import Recommender from "../../../../components/recommendation/Recommender";
type Props = chapterModifiedPagesType & {
  nextChapter: string;
  prevChapter: string;
  allChapters: chapter[];
  recommendations: recommendationsType[];
};

export default function Chapter({
  _id,
  title,
  chapters,
  nextChapter,
  prevChapter,
  allChapters,
  recommendations,
}: Props) {
  const router = useRouter();
  const [showChapterList, setShowChapterList] = useState(false);
  const [hideSettings, setHideSettings] = useState(true);
  const [hideNav, setHideNav] = useState(false);
  const [webtoon, setWebtoon] = useState(false);
  const [horizontalView, setHorizontalView] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const handleNavigateToChapter = (chapterId: string) => {
    router.push(`/series/${title}/chapter/${chapterId}?id=${_id}`);
  };

  return (
    <div className={chapterStyle.container}>
      <section
        className={chapterStyle.header}
        style={hideNav ? { opacity: 0, pointerEvents: "none" } : null}
      >
        <div
          className={chapterStyle.logoContainer}
          onClick={() => router.push("/")}
        >
          <Image src={logo} alt="logo" className={chapterStyle.logo} fill />
        </div>
        <div
          tabIndex={-1}
          className={chapterStyle.chapterNumContainer}
          onBlur={() => setShowChapterList(false)}
        >
          <div
            className={chapterStyle.chapterNumInput}
            onClick={() => setShowChapterList(!showChapterList)}
          >
            <p>Chapter Number {chapters[0].chapterNum}</p>
            <div
              style={{
                width: 15,
                height: 15,
                transform: showChapterList ? "rotate(0.5turn)" : null,
              }}
            >
              <Icon name="downArrow" size={15} />
            </div>
          </div>
          {showChapterList && (
            <ul className={chapterStyle.chapterListContainer}>
              {allChapters?.map((item) => {
                return (
                  <li
                    key={item._id}
                    onClick={() => {
                      handleNavigateToChapter(item._id);
                      setShowChapterList(false);
                    }}
                  >
                    Chapter Number {item.chapterNum}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={chapterStyle.chapterNavigationButtonContainer}>
          <div
            className={chapterStyle.prevChapter}
            onClick={() =>
              router.push(`/series/${title}/chapter/${prevChapter}?id=${_id}`)
            }
          >
            <Icon name="downArrow" size={16} />
          </div>
          <div
            className={chapterStyle.nextChapter}
            onClick={() =>
              router.push(`/series/${title}/chapter/${nextChapter}?id=${_id}`)
            }
          >
            <Icon name="downArrow" size={16} />
          </div>
        </div>
        <div className={chapterStyle.leftHeaderSection}>
          <div
            className={chapterStyle.settingsContainer}
            tabIndex={-1}
            onBlur={() => setHideSettings(true)}
          >
            <Icon
              name="settings"
              size={32}
              onClick={() => setHideSettings(!hideSettings)}
              style={{ cursor: "pointer" }}
            />
            <div
              className={chapterStyle.chapterOptionsContainer}
              style={hideSettings ? { display: "none" } : null}
            >
              <div
                className={chapterStyle.chapterOption}
                onClick={() => {
                  setHideSettings(true);
                  setHorizontalView(false);
                }}
              >
                <Icon name="add" size={25} />
                <p className={chapterStyle.chapterOptionText}>Vertical read</p>
              </div>
              <div
                className={chapterStyle.chapterOption}
                onClick={() => {
                  setHideSettings(true);
                  setHorizontalView(true);
                }}
              >
                <Icon name="add" size={25} />
                <p className={chapterStyle.chapterOptionText}>
                  Horizontal read
                </p>
              </div>
              <div
                className={chapterStyle.chapterOption}
                onClick={() => {
                  setHideSettings(true);
                  setWebtoon(!webtoon);
                }}
              >
                <Icon name="add" size={25} />
                <p className={chapterStyle.chapterOptionText}>Webtoon mode</p>
              </div>
            </div>
          </div>
          <Icon
            name="exclamationMark"
            size={32}
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/series/${title}/${_id}`)}
          />
        </div>
      </section>
      <section
        className={chapterStyle.pages}
        onClick={() => setHideNav(!hideNav)}
        style={webtoon ? { gap: 0 } : null}
      >
        {chapters[0].chapter.map((page, i) => {
          if (horizontalView && i !== pageNum) return null;
          return (
            <div key={i} className={chapterStyle.imageContainer}>
              {page.map((image, i) => {
                return (
                  <React.Fragment key={i}>
                    {" "}
                    <img
                      src={`http://localhost:8080/${image}`}
                      alt="image"
                      className={chapterStyle.image}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </section>
      <section className={chapterStyle.recommendationContainer}>
        <Recommender recommendations={recommendations} />
      </section>
      {horizontalView && (
        <section
          className={chapterStyle.footer}
          style={hideNav ? { opacity: 0, pointerEvents: "none" } : null}
        >
          <div
            className={chapterStyle.footerButton}
            onClick={() => pageNum > 0 && setPageNum(pageNum - 1)}
          >
            <Icon
              name="downArrow"
              size={16}
              style={{ transform: "rotate(90deg)" }}
            />
            <p>Previous</p>
          </div>
          <div
            className={chapterStyle.footerButton}
            onClick={() =>
              pageNum + 1 < chapters[0].chapter.length &&
              setPageNum(pageNum + 1)
            }
          >
            <p>Next</p>
            <Icon
              name="downArrow"
              size={16}
              style={{ transform: "rotate(-90deg)" }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const { data } = await axios.get<any, AxiosResponse<chapterType>>(
      `http://localhost:8080/chapters/get-chapter/${query.chapterId}`,
      { data: { mangaId: query.id } }
    );
    const { data: mangaData } = await axios.get<
      any,
      AxiosResponse<{
        manga: mangaType;
        recommendationManga: recommendationsType[];
      }>
    >(`http://localhost:8080/mangas/manga/${query.id}`);
    const allChapters = mangaData.manga.chapters.map((item) => item._id);
    const chapterPages = data.chapters[0].chapter;
    let newPagesOrder = [];
    let page = [];
    for (let index = 0; index < chapterPages.length; index++) {
      if ((index + 1) % 9 === 0) {
        page.push(chapterPages[index]);
        newPagesOrder.push(page);
        page = [];
      } else {
        page.push(chapterPages[index]);
      }
    }

    data.chapters[0].chapter = newPagesOrder;

    const chapterIndex = allChapters.indexOf(query.chapterId as string);
    const nextChapter =
      chapterIndex < allChapters.length - 1 && allChapters[chapterIndex + 1];
    const prevChapter = chapterIndex > 0 && allChapters[chapterIndex - 1];

    return {
      props: {
        ...data,
        nextChapter,
        prevChapter,
        allChapters: mangaData.manga.chapters,
        recommendations: mangaData.recommendationManga,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);

    return {
      props: {}, // will be passed to the page component as props
    };
  }
}
