import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
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
  const [catId, setCatId] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [pageMount, setPageMount] = useState(AllPages);
  const [manga, setManga] = useState(mangaData);
  const handleSubmet = async () => {
    const url = `http://localhost:8080/mangas/?catId=${catId}&orderBy=${order}&page=${page}`;
    const mangas = await fetch(url);
    const { mangaData, mangaPages, message } = await mangas.json();
    if (message) return;
    setPageMount(mangaPages);
    setManga(mangaData);
  };

  const CheckData = () => {
    if (DataExist) {
      return (
        <Spinner animation="border" role="status" style={{ margin: "30px" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    return <h1>Data Not Found</h1>;
  };

  useEffect(() => {
    if ((catId || order || page) && page <= pageMount) handleSubmet();
  }, [catId, order, page, pageMount]);

  {
  }
  return (
    <>
      {FetchError ? (
        <h1>{FetchError}</h1>
      ) : (
        <div className={library.library}>
          <Sorte
            catData={catData}
            handleCatId={setCatId}
            handleOrder={setOrder}
            handlePage={setPage}
          />
          {manga.length === 0 ? <CheckData /> : <MangaCard manga={manga} />}
          <Pagenation page={page} mangaPages={pageMount} handlePage={setPage} />
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
