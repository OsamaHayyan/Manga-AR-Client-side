import React, { useState } from "react";
import MangaCard from "../components/library/manga_card";
import { Pagination } from "@mui/material";
import CheckData from "../components/check_data";

export default function News({ newsData, newsPages, DataExist }) {
  return (
    <div>
      {newsData?.length == 0 ? (
        <CheckData DataExist={DataExist} />
      ) : (
        <MangaCard newsData={newsData} newsPages={newsPages} />
      )}
      <Pagination count={newsPages} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    let DataExist = true;
    const newsData = await fetch("http://localhost:8080/news/");
    const { news, newsPages } = await newsData.json();

    if (news.length == 0) {
      DataExist = false;
    }
    return {
      props: { newsData: news, newsPages, DataExist }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      props: { FetchError: "Fetch Error" },
    };
  }
}
