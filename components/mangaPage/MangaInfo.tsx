import React, { useState } from "react";
import mangainfoStyle from "./style/mangainfo.module.css";
import RemoteImage from "../Remote_image";
import { mangaType, userType } from "../../util/interfaces";
import { useRouter } from "next/router";
import Icon from "../Icon";
import { toast } from "react-toastify";
import axios from "axios";
import Rate from "../Rate";
type Props = {
  mangaData: mangaType;
  user: userType;
};

function MangaInfo({ mangaData, user }: Props) {
  const mangaInFavorite = user?.favorite?.includes(mangaData._id as string)
    ? true
    : false;
  const router = useRouter();
  const [showRate, setShowRate] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showFavorit, setShowFavorit] = useState(mangaInFavorite);

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
        if (!user) return toast.error("please login first");
        await axios.delete(
          `http://localhost:8080/user/favorite/${mangaData._id}`,
          { withCredentials: true }
        );
        setShowFavorit(false);
      } else if (!showFavorit) {
        if (!user) return toast.error("please login first please");
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
    router.push(`/series/${mangaData.title}/chapter/${id}?id=${mangaData._id}`);
  };

  return (
    <>
      <div className={mangainfoStyle.info}>
        <RemoteImage src={mangaData.image} priority={true} />
        <div className={mangainfoStyle.infoSection2}>
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
            Author: {mangaData.auther.map((auth) => auth.autherName).join(", ")}
          </p>
          <p>
            Published at: {mangaData.date ? mangaData.date : "Not Specified"}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <p className={mangainfoStyle.status}>{mangaData.status}</p>
            <p
              className={mangainfoStyle.firstChapterBtn}
              onClick={() =>
                mangaData.chapters[0] &&
                navigateToChapter(mangaData.chapters[0]._id)
              }
            >
              Go to first chapter
            </p>
          </div>
        </div>
      </div>
      <div className={mangainfoStyle.btns}>
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
            !user && toast.error("please login first to rate this manga");
          }}
        >
          <Icon name="star" size={65} />
          {user && showRate ? (
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
          {user && showFavorit ? (
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
        className={mangainfoStyle.story}
        style={showMore ? { maxHeight: "fit-content" } : null}
      >
        <div className={mangainfoStyle.storyHeader}>
          <p style={{ textDecorationLine: "underline", fontSize: "32px" }}>
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

        <p className={!showMore ? mangainfoStyle.storyShowLess : null}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sequi
          quisquam sunt dicta numquam exercitationem quas illum sapiente fugit
          dignissimos! Ipsam consectetur quas illo beatae consequatur deleniti
          corrupti ratione porro?Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Autem sequi quisquam sunt dicta numquam
          exercitationem quas illum sapiente fugit dignissimos! Ipsam
          consectetur quas illo beatae consequatur deleniti corrupti ratione
          porro?
        </p>
      </div>
    </>
  );
}

export default MangaInfo;
