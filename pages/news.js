import React, { useState } from "react";
import MangaCard from "../components/library/manga_card";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import CheckData from "../components/check_data";
import axios from "axios";
import Error from "next/error";
import * as newsStyle from "../styles/news.module.css";
import { useRouter } from "next/dist/client/router";

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
  const [dataAvaliable, setCheckData] = useState(DataExist);
  const [news, setNews] = useState(newsData);
  const [error, setErrors] = useState({ errorMessage, statusCode });
  const [loading, setLoading] = useState(false);
  console.log("osama");
  const handlePagenation = async (event, page) => {
    try {
      setLoading(true);
      let DataExist = true;
      const { data } = await axios(`http://localhost:8080/news?page=${page}`);
      const { news, newsPages } = await data;
      setLoading(false);
      if (newsPages == 0 || news.length == 0) {
        DataExist = false;
      }
      console.log(news);
      setNews(news);
      setCheckData(DataExist);
    } catch (error) {
      const DataExist = false;
      let errorMessage;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        error.response.data.data.forEach((d) => (errorMessage = d.msg));
        setErrors({
          errorMessage: errorMessage,
          statusCode: error.response.status,
        });
        setCheckData(DataExist);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        setErrors({
          errorMessage: "Server deosn't responsed, Please try again later",
          statusCode: 500,
        });
        setCheckData(DataExist);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        setErrors({
          errorMessage: "Server deosn't responsed, Please try again later",
          statusCode: 500,
        });
        setCheckData(DataExist);
      }
    }
  };

  return (
    <div className={newsStyle.container}>
      {!dataAvaliable ? (
        <div className={newsStyle.newsData} style={{ margin: "auto" }}>
          <CheckAvilability
            statusCode={error.statusCode}
            errorMessage={error.errorMessage}
          />
        </div>
      ) : (
        <div className={newsStyle.newsData}>
          {!loading ? (
            <MangaCard newsData={news} newsPages={newsPages} />
          ) : (
            <CircularProgress
              style={{
                margin: "auto",
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
              }}
            />
          )}
        </div>
      )}
      <Pagination
        count={10}
        className={newsStyle.pagenation}
        onChange={handlePagenation}
        disabled={loading}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    let DataExist = true;
    const { data } = await axios("http://localhost:8080/news/");
    const { news, newsPages } = await data;

    if (newsPages == 0 || news.length == 0) {
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
