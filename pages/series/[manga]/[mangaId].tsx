import React, { useState } from "react";

import { toast } from "react-toastify";
import Error from "next/error";

import mangaStyle from "../../../styles/manga_page.module.css";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { manga, recommendations } from "../../../util/interfaces";
import RemoteImage from "../../../components/remote_image";
import Icon from "../../../components/Icon";
import moment from "moment";
import Rate from "../../../components/rate";
import { GetServerSideProps } from "next";

type Props = {
  userLoggedIn: boolean;
  mangaData: manga;
  DataExist: boolean;
  statusCode: number;
  errorMessage: string;
};

export default function Manga({
  userLoggedIn,
  mangaData,
  DataExist,
  statusCode,
  errorMessage,
}: Props) {
  const [showRate, setShowRate] = useState(false);
  const [showFavorit, setShowFavorit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const sendRate = async (rate: number) => {
    try {
      await axios.post(
        `http://localhost:8080/mangas/rate/${mangaData._id}`,
        {
          rate: rate,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("sorry error was happened");
    }
  };
  const addToFavorit = async () => {
    try {
      if (showFavorit) {
        if (!userLoggedIn) return toast.error("please login first");
        await axios.delete(
          `http://localhost:8080/user/favorite/${mangaData._id}`,
          { withCredentials: true }
        );
        setShowFavorit(false);
      } else if (!showFavorit) {
        if (!userLoggedIn) return toast.error("please login first please");
        await axios.post(
          `http://localhost:8080/user/favorite/${mangaData._id}`,
          null,
          {
            withCredentials: true,
          }
        );
        setShowFavorit(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("sorry error was happened");
    }
  };

  const navigateToChapter = async (id: string) => {
    router.push(`/series/${mangaData.title}/chapter/${id}`);
  };

  return (
    <>
      {DataExist ? (
        <div className={mangaStyle.container}>
          <section className={mangaStyle.mangaSection}>
            <div className={mangaStyle.info}>
              <RemoteImage src={mangaData.image} priority={true} />
              <div className={mangaStyle.infoSection2}>
                <h2>{mangaData.title}</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "32px",
                    maxWidth: "684px",
                  }}
                >
                  {mangaData.category.map((cat, i, arr) => (
                    <p key={i}>{cat.category}</p>
                  ))}
                </div>
                <p>
                  Author:{" "}
                  {mangaData.auther.map((auth) => auth.autherName).join(", ")}
                </p>
                <p>
                  Published at:{" "}
                  {mangaData.date ? mangaData.date : "Not Specified"}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <p className={mangaStyle.status}>{mangaData.status}</p>
                  <p
                    className={mangaStyle.firstChapterBtn}
                    onClick={() => navigateToChapter(mangaData.chapters[0]._id)}
                  >
                    Go to first chapter
                  </p>
                </div>
              </div>
            </div>
            <div className={mangaStyle.btns}>
              <div style={{ alignSelf: "flex-start" }}>
                <Icon name="filledStar" color="#FFC107" size={65} />
                <p>
                  {mangaData.rate}
                  <span>/5</span>
                </p>
              </div>
              <div
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => {
                  showRate == false && setShowRate(!showRate);
                  !userLoggedIn &&
                    toast.error("please login first to rate this manga");
                }}
              >
                <Icon name="star" size={65} />
                {userLoggedIn && showRate ? (
                  <span
                    style={{
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Rate handleRate={sendRate} rate={null} size={24} />
                  </span>
                ) : (
                  <p>Add rate</p>
                )}
              </div>
              <div>
                <Icon name="eye" size={65} />
                <p>{mangaData.views}</p>
              </div>
              <div style={{ alignSelf: "flex-start" }} onClick={addToFavorit}>
                {userLoggedIn && showFavorit ? (
                  <>
                    <Icon name="filledStar" color="#FFC107" size={65} />
                    <p>Added to favorite!</p>
                  </>
                ) : (
                  <>
                    <Icon name="heart" size={65} />
                    <p>Add to favorite</p>
                  </>
                )}
              </div>
            </div>
            <div
              className={mangaStyle.story}
              style={{ maxHeight: showMore && "fit-content" }}
            >
              <div className={mangaStyle.storyHeader}>
                <p
                  style={{ textDecorationLine: "underline", fontSize: "32px" }}
                >
                  Summary
                </p>
                {showMore ? (
                  <p
                    style={{
                      textDecorationLine: "underline",
                    }}
                    onClick={() => setShowMore(false)}
                  >
                    Show less
                  </p>
                ) : (
                  <p
                    style={{
                      textDecorationLine: "underline",
                    }}
                    onClick={() => setShowMore(true)}
                  >
                    Show more
                  </p>
                )}
              </div>

              <p className={!showMore && mangaStyle.storyShowLess}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                sequi quisquam sunt dicta numquam exercitationem quas illum
                sapiente fugit dignissimos! Ipsam consectetur quas illo beatae
                consequatur deleniti corrupti ratione porro?Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Autem sequi quisquam sunt
                dicta numquam exercitationem quas illum sapiente fugit
                dignissimos! Ipsam consectetur quas illo beatae consequatur
                deleniti corrupti ratione porro?
              </p>
            </div>
          </section>
          <section className={mangaStyle.chapterSection}>
            <div className={mangaStyle.toggleBtn}>
              <p className={mangaStyle.toggleBtnActive}>Chapters</p>
              <p>Comments</p>
            </div>
            <div className={mangaStyle.chaptersContainer}>
              {mangaData.chapters.map((chapter, i) => {
                let publisdTime = moment(chapter.date).fromNow();

                return (
                  <div
                    key={i}
                    className={mangaStyle.chapterBox}
                    onClick={() => navigateToChapter(chapter._id)}
                  >
                    <div className={mangaStyle.chapterHeader}>
                      <Icon name="file" size={25} />
                      <p>
                        {chapter.chapterNum} | Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Odio, ducimus? Excepturi
                        debitis dolor voluptates! Sunt numquam ex dolorem
                        assumenda voluptate a, ratione fuga nostrum, incidunt
                        quis sint, deserunt aliquam adipisci?
                      </p>
                    </div>
                    <div className={mangaStyle.chapterFooter}>
                      <span style={{ fontWeight: 300 }}>{publisdTime}</span>
                      <span style={{ fontWeight: 300 }}>
                        <Icon name="eyeBold" size={14} />
                        {chapter.views}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <Error statusCode={statusCode} title={errorMessage} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { manga, mangaId } = context.query;

    const userLoggedIn = context.req?.cookies["access_token"] ? true : false;
    const DataExist = true;
    const {
      data: { manga: mangaData, recommendationManga: recommendations },
    }: { data: { manga: manga; recommendationManga: recommendations } } =
      await axios.get(`http://localhost:8080/mangas/manga/${mangaId}`);

    if (mangaData.title != manga) {
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
        DataExist,
        userLoggedIn,
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
