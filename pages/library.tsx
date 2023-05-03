import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Error from "next/error";
import MangaCard from "../components/library/manga_card";
import Sort from "../components/library/sort";
import library from "../styles/library.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { GetServerSideProps, NextPage } from "next";
import {
  IcategoryAll,
  ImangaAll,
  mangaType,
  userType,
} from "../util/interfaces";
import Image from "next/image";
import libraryBanner from "../public/images/libraryBanner.jpg";
import Pagination from "../components/Pagination";
import Navbar from "../components/navbar/Navbar";
import cookieParser from "../util/cookieParser";
import userParser from "../util/userParser";
import Head from "next/head";

interface Props {
  mangaData: mangaType[];
  AllPages: number;
  catData: IcategoryAll;
  DataExist: boolean;
  statusCode: number;
  errorMessage: string;
  user: userType;
}
const Library: NextPage<Props> = ({
  mangaData,
  AllPages,
  catData,
  DataExist,
  statusCode,
  errorMessage,
  user,
}) => {
  const [sort, setSort] = useState({
    catId: "",
    order: "",
    page: 1,
    pageMount: AllPages,
  });
  const [manga, setManga] = useState(mangaData);
  const handleSubmet = async ({
    catId,
    order,
    page,
  }: {
    catId: string;
    order: string;
    page: number;
  }) => {
    try {
      const url = `http://localhost:8080/mangas/?catId=${
        catId ? catId : sort.catId
      }&orderBy=${order ? order : sort.order}&page=${page ? page : sort.page}`;
      const mangas = await fetch(url);
      let {
        mangaData,
        mangaPages,
        message,
      }: { mangaData: mangaType[]; mangaPages: number; message: string } =
        await mangas.json();
      if (message) throw message;
      setSort({
        catId: catId ? catId : sort.catId,
        order: order ? order : sort.order,
        page: page ? page : sort.page,
        pageMount: mangaPages,
      });
      setManga(mangaData);
    } catch (error) {
      toast.error("Sorry there was an error, try again later");
    }
  };
  return (
    <>
      <Navbar user={user} />
      <Head>
        <title>MangaAR | Library</title>
        <meta name="description" content="Manga Library Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!DataExist ? (
        <Error statusCode={statusCode} title={errorMessage} />
      ) : (
        <div className={library.container}>
          <section className={library.imageSection}>
            <Image
              priority
              src={libraryBanner}
              style={{ width: "100%", height: "auto" }}
              alt="image banner"
            />
          </section>
          <section className={library.sortSection}>
            <Sort
              catData={catData}
              handleSort={setSort}
              sort={sort}
              handleSubmet={handleSubmet}
            />
          </section>
          <section className={library.mangaSection}>
            {manga.map((m) => (
              <MangaCard key={m._id} manga={m} />
            ))}
          </section>
          <section className={library.paginationSection}>
            <Pagination
              renderON={sort.order}
              totalPages={sort.pageMount}
              onClick={handleSubmet}
            />
          </section>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookies = cookieParser(req);
    const user = userParser(cookies);
    const DataExist = true;
    const {
      data: { mangaData, mangaPages },
    }: { data: ImangaAll } = await axios("http://localhost:8080/mangas/");
    const { data: catData }: { data: IcategoryAll } = await axios(
      "http://localhost:8080/category/get-cat/"
    );

    return {
      props: {
        mangaData,
        AllPages: mangaPages,
        catData,
        DataExist,
        user,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    const DataExist = false;
    let errorMessage: string;
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

export default Library;
