import React, { useState } from "react";
import MangaCard from "../components/library/manga_card";
import { Pagination } from "@mui/material";
import CheckData from "../components/check_data";
import axios from "axios";
import Error from "next/error";

const CheckAvilability = ({ statusCode, errorMessage }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} title={errorMessage} />;
  }
  return <h1>No news yet</h1>;
};
export default function News({
  newsData,
  newsPages,
  DataExist,
  errorMessage,
  statusCode,
}) {
  return (
    <div>
      {!DataExist ? (
        <CheckAvilability statusCode={statusCode} errorMessage={errorMessage} />
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
    const { data } = await axios("http://localhost:8080/news/");
    const { news, newsPages } = await data;

    if (newsPages == 0) {
      DataExist = false;
    }
    return {
      props: { newsData: news, newsPages, DataExist }, // will be passed to the page component as props
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
