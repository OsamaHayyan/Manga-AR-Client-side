import React from "react";

export default function News() {
  return <div>News</div>;
}

export async function getServerSideProps(context) {
  try {
    let DataExist = true;
    const news = await fetch("http://localhost:8080/news/");
    const newsData = await news.json();

    if (newsData.length == 0) {
      DataExist = false;
    }
    return {
      props: { newsData }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      props: { FetchError: "Fetch Error" },
    };
  }
}
