import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CheckData from "../components/check_data";
import MangaCard from "../components/library/manga_card";
import Pagenation from "../components/library/pagenation";
import Sorte from "../components/library/sorte";
import * as library from "../styles/library.module.css";

export default function Library({
  mangaData,
  AllPages,
  catData,
  DataExist,
  FetchError,
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
      {FetchError ? (
        <h1>{FetchError}</h1>
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
            pageNum={sort.page}
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
    let DataExist = true;
    const manga = await fetch("http://localhost:8080/mangas/");
    const category = await fetch("http://localhost:8080/category/get-cat/");
    const { mangaData, mangaPages } = await manga.json();
    const catData = await category.json();

    if (mangaData.length == 0) {
      DataExist = false;
    }
    return {
      props: { mangaData, AllPages: mangaPages, catData, DataExist }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      props: { FetchError: "Fetch Error" },
    };
  }
}
