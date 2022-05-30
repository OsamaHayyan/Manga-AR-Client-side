import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Error from "next/error";

import CheckData from "../components/check_data";
import MangaCard from "../components/library/manga_card";
import Pagenation from "../components/library/pagenation";
import Sorte from "../components/library/sorte";
import * as library from "../styles/library.module.css";
import axios from "axios";

export default function Library({
  mangaData,
  AllPages,
  catData,
  DataExist,
  statusCode,
  errorMessage,
}) {
  const router = useRouter();
  const [sort, setSort] = useState({
    catId: "",
    order: "",
    page: 1,
    pageMount: AllPages,
  });
  const [manga, setManga] = useState(mangaData);
  const handleSubmet = async () => {
    try {
      const url = `http://localhost:8080/mangas/?catId=${sort.catId}&orderBy=${sort.order}&page=${sort.page}`;
      const mangas = await fetch(url);
      let { mangaData, mangaPages, message } = await mangas.json();
      if (message) return;
      setSort({ ...sort, pageMount: mangaPages });
      console.log(mangaData);
      setManga(mangaData);
      console.log(manga);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sort.catId || sort.order || sort.page) handleSubmet();
    window.onload = (e) => {
      return router.replace("/library");
    };
    return () => (window.onload = null);
  }, [sort.catId, sort.order, sort.page, sort.pageMount]);

  return (
    <>
      {!DataExist ? (
        <Error statusCode={statusCode} title={errorMessage} />
      ) : (
        <div className={library.library}>
          <Sorte
            catData={catData}
            handleSort={setSort}
            sort={sort}
            handleSubmet={handleSubmet}
          />
          {manga.length == 0 ? (
            <CheckData DataExist={DataExist} />
          ) : (
            <MangaCard manga={manga} />
          )}
          <Pagenation
            page={sort.page}
            mangaPages={sort.pageMount}
            handlePage={setSort}
            sort={sort}
          />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const DataExist = true;
    const manga = await axios("http://localhost:8080/mangas/");
    const category = await axios("http://localhost:8080/category/get-cat/");
    const { mangaData, mangaPages } = await manga.data;
    const catData = await category.data;

    return {
      props: { mangaData, AllPages: mangaPages, catData, DataExist }, // will be passed to the page component as props
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
}
