import React from "react";
import Error from "next/error";
import mangaStyle from "../../../styles/manga_page.module.css";
import axios from "axios";
import {
  mangaType,
  recommendationsType,
  userType,
} from "../../../util/interfaces";
import { GetServerSideProps } from "next";
import Navbar from "../../../components/navbar/Navbar";
import cookieParser from "../../../util/cookieParser";
import userParser from "../../../util/userParser";
import Recommender from "../../../components/recommendation/Recommender";
import MangaInfo from "../../../components/mangaPage/MangaInfo";
import Chapters from "../../../components/mangaPage/Chapters";
import Head from "next/head";

type Props = {
  user: userType;
  mangaData: mangaType;
  DataExist: boolean;
  statusCode: number;
  errorMessage: string;
  recommendations: recommendationsType[];
};

export default function Manga({
  user,
  mangaData,
  DataExist,
  statusCode,
  errorMessage,
  recommendations,
}: Props) {
  return (
    <>
      <Navbar user={user} />
      {DataExist ? (
        <>
          <Head>
            <title>MangaAR | {mangaData.title}</title>
            <meta name="description" content="Manga Page" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={mangaStyle.container}>
            <section className={mangaStyle.mangaSection}>
              <MangaInfo mangaData={mangaData} user={user} />
            </section>
            <section className={mangaStyle.chapterSection}>
              <Chapters
                chapters={mangaData.chapters}
                mangaId={mangaData._id}
                mangaTitle={mangaData.title}
              />
            </section>
            <section className={mangaStyle.recommendationSection}>
              <Recommender recommendations={recommendations} />
            </section>
          </div>
        </>
      ) : (
        <Error statusCode={statusCode} title={errorMessage} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { manga, mangaId } = context.query;
    const cookies = cookieParser(context.req);
    const user = userParser(cookies);
    const DataExist = true;
    const {
      data: { manga: mangaData, recommendationManga: recommendations },
    }: {
      data: { manga: mangaType; recommendationManga: recommendationsType[] };
    } = await axios.get(`http://localhost:8080/mangas/manga/${mangaId}`);

    if (mangaData.title.replaceAll("/", "") != manga) {
      return {
        props: {
          statusCode: 404,
          errorMessage: "Manga Not Found",
          DataExist: false,
        },
      };
    }
    return {
      props: {
        mangaData: mangaData,
        recommendations,
        DataExist,
        user,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    const DataExist = false;
    let errorMessage;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      error.response.data.data.forEach((d) => (errorMessage = d.msg));
      return {
        props: { statusCode: error.response.status, errorMessage, DataExist },
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return {
        props: {
          statusCode: 500,
          errorMessage: "Server deosn't responsed, Please try again later",
          DataExist,
        },
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      return {
        props: {
          statusCode: 500,
          errorMessage: "Please try again later",
          DataExist,
        },
      };
    }
  }
};
