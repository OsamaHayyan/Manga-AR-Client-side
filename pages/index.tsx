import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar/Navbar";
import userParser from "../util/userParser";
import { GetServerSidePropsContext } from "next";
import {
  mangaType,
  newsType,
  recommendationsType,
  userType,
} from "../util/interfaces";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import Recommendation from "../components/recommendation/Recommendation";
import HotManga from "../components/hotManga/HotManga";
import LastRelease from "../components/lastRelease/LastRelease";
import TrendyManga from "../components/trendyManga/TrendyManga";
import { useEffect, useState } from "react";
import News from "../components/news/News";
import Link from "next/link";

type Props = {
  user: userType;
  recommendations: recommendationsType[];
  mostViewdManga: mangaType[];
  lastRelease: mangaType[];
};
export default function Home({
  user,
  recommendations,
  mostViewdManga,
  lastRelease,
}: Props) {
  const router = useRouter();
  const [news, setNews] = useState<newsType[]>([]);
  const [trendyManga, setTrendyManga] = useState<
    {
      category: string;
      manga: mangaType[];
    }[]
  >();

  useEffect(() => {
    let ignore = false;
    axios
      .get<any, AxiosResponse<{ manga: mangaType[]; category: string }[], any>>(
        `${process.env.NEXT_PUBLIC_HOSTURL}/mangas/trendy`
      )
      .then(({ data }) => {
        if (!ignore) {
          setTrendyManga(data);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.NEXT_PUBLIC_HOSTURL}/news/`)
      .then(({ data }: { data: { news: newsType[] } }) => {
        if (!ignore) {
          setNews(data.news);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <Navbar user={user} />
      <Head>
        <title>EgyManga | Home</title>
        <meta name="description" content="Manga Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <div className={styles.headerInfo}>
              <p>FEATURE MANGA</p>
              <h2>NARUTO</h2>
              <p>
                One of the top-selling Japanese mangas is now available on
                MangaKingdom.com. Check out the complete series for free!
              </p>
            </div>
            <p
              className={styles.headerButton}
              onClick={() =>
                router.push("/series/Naruto/63f6b43742387ee27a22093a")
              }
            >
              Read now
            </p>
          </div>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.popularSection}>
            <div className={styles.hotContainer}>
              <h2>HOTTEST MANGA</h2>
              <div className={styles.hotMangas}>
                {mostViewdManga.map((item, i) => (
                  <HotManga key={i} manga={item} />
                ))}
              </div>
            </div>
            <div className={styles.recommendedContainer}>
              <h2>RECOMMENDED</h2>
              {recommendations.map((item, i) => {
                return <Recommendation key={i} recommendation={item} />;
              })}
            </div>
          </div>
          <div className={styles.latestAddedContainer}>
            <div className={styles.latestAddedHeader}>
              <h2>RECENTLY ADDED</h2>
            </div>
            <div className={styles.latestAddedBody}>
              {lastRelease.map((item, i) => (
                <LastRelease key={i} lastRelease={item} />
              ))}
            </div>
          </div>
          {trendyManga?.map((trendy, i) => {
            return (
              <div key={i} className={styles.trendyContainer}>
                <div className={styles.trendyHeader}>
                  <h2>TRENDY IN {trendy.category?.toUpperCase()}</h2>
                  <p>Show More</p>
                </div>
                <div className={styles.trendyBody}>
                  {trendy.manga.map((item, i) => (
                    <TrendyManga key={i} manga={item} />
                  ))}
                </div>
              </div>
            );
          })}
          <div className={styles.newsContainer}>
            <div className={styles.newsHeader}>
              <h2>Recent News</h2>
            </div>
            <div className={styles.newsBody}>
              {news.map((item, i) => (
                <Link key={i} href={"#"}>
                  <News news={item} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { data: lastRelease } = await axios.get<
    any,
    AxiosResponse<mangaType[], any>
  >(`${process.env.NEXT_PUBLIC_HOSTURL}/last-release`);

  const filterdLastRelease = lastRelease.map((item) => {
    return {
      ...item,
      chapters: item.chapters.map((chapter) => {
        return { chapterNum: chapter.chapterNum, _id: chapter._id };
      }),
    };
  });

  const { data: recommendationResponse } = await axios.get<
    any,
    AxiosResponse<recommendationsType[], any>
  >(`${process.env.NEXT_PUBLIC_HOSTURL}/mangas/recommendation`);
  const { data: mostViewdManga } = await axios.get<
    any,
    AxiosResponse<mangaType[], any>
  >(`${process.env.NEXT_PUBLIC_HOSTURL}/mangas/most-viewed`);

  const user = userParser(req.cookies);
  const recommendations = recommendationResponse.filter(
    (item, i) => i < 6 && item
  );

  return {
    props: {
      user,
      recommendations,
      mostViewdManga,
      lastRelease: filterdLastRelease,
    }, // will be passed to the page component as props
  };
}
