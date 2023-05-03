/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import chapterStyle from "../../../../styles/chapter_reader.module.css";
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
import Header from "../../../../components/chapterReader/Header";
import Pages from "../../../../components/chapterReader/Pages";
import HorizontalNavigation from "../../../../components/chapterReader/HorizontalNavigation";
import Head from "next/head";
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
  const [hideNav, setHideNav] = useState(false);
  const [webtoon, setWebtoon] = useState(false);
  const [horizontalView, setHorizontalView] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  console.log(chapters);

  return (
    <>
      <Head>
        <title>MangaAR | {title}</title>
        <meta name="description" content="Chapter Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={chapterStyle.container}>
        <section
          className={chapterStyle.header}
          style={hideNav ? { opacity: 0, pointerEvents: "none" } : null}
        >
          <Header
            allChapters={allChapters}
            chapters={chapters}
            prevChapter={prevChapter}
            nextChapter={nextChapter}
            mangaTitle={title}
            mangaId={_id}
            settings={{
              webtoon: {
                webtoon,
                setWebtoon,
              },
              horizontalView: {
                horizontalView,
                setHorizontalView,
              },
            }}
          />
        </section>
        <section
          className={chapterStyle.pages}
          onClick={() => setHideNav(!hideNav)}
          style={webtoon ? { gap: 0 } : null}
        >
          {chapters[0].chapter.map((page, i) => {
            if (horizontalView && i !== pageNum) return null;
            return <Pages key={i} page={page} />;
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
            <HorizontalNavigation
              pageNumber={pageNum}
              setPageNumber={setPageNum}
              chaptersLength={chapters[0].chapter.length}
            />
          </section>
        )}
      </div>
    </>
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
