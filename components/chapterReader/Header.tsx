import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import headerStyle from "./styles/header.module.css";
import { useRouter } from "next/router";
import { chapter } from "../../util/interfaces";
import Link from "next/link";

type Props = {
  mangaTitle: string;
  mangaId: string;
  chapters: [
    {
      chapterNum: string;
      name: string;
      chapter?: string[][];
      views: number;
      date: string;
      _id: string;
    }
  ];
  nextChapter: string;
  prevChapter: string;
  allChapters: chapter[];
  settings: {
    webtoon: {
      webtoon: boolean;
      setWebtoon: (param: boolean) => void;
    };
    horizontalView: {
      horizontalView: boolean;
      setHorizontalView: (param: boolean) => void;
    };
  };
};

function Header({
  allChapters,
  nextChapter,
  prevChapter,
  chapters,
  mangaId,
  mangaTitle,
  settings: {
    webtoon: { webtoon, setWebtoon },
    horizontalView: { horizontalView, setHorizontalView },
  },
}: Props) {
  const router = useRouter();
  const [showChapterList, setShowChapterList] = useState(false);
  const [hideSettings, setHideSettings] = useState(true);
  const [screenWidth, setScreenWidth] = useState(null);

  const handleNavigateToChapter = (chapterId: string) => {
    router.push(`/series/${mangaId}/chapter/${chapterId}?id=${mangaId}`);
  };

  useEffect(() => {
    // Update the screen width on mount
    const updateScreenWidth = () => {
      setScreenWidth(window.outerWidth);
    };

    // Attach the event listener
    window.addEventListener("resize", updateScreenWidth);

    // Initialize the screen width
    updateScreenWidth();

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return (
    <>
      <Link href={"/"} className={headerStyle.logoContainer}>
        <Icon name="logo" className={headerStyle.logo} />
      </Link>
      <div
        tabIndex={-1}
        className={headerStyle.chapterNumContainer}
        onBlur={() => setShowChapterList(false)}
      >
        <div
          className={headerStyle.chapterNumInput}
          onClick={() => setShowChapterList(!showChapterList)}
        >
          <p>
            {screenWidth <= 450 ? null : "Chapter Number"}{" "}
            {chapters[0].chapterNum}
          </p>
          <div
            className={headerStyle.chapterNumIcon}
            style={{ transform: showChapterList ? "rotate(0.5turn)" : null }}
          >
            <Icon name="downArrow" size={10} />
          </div>
        </div>
        {showChapterList && (
          <ul className={headerStyle.chapterListContainer}>
            {allChapters?.map((item) => {
              return (
                <li
                  key={item._id}
                  onClick={() => {
                    handleNavigateToChapter(item._id);
                    setShowChapterList(false);
                  }}
                >
                  {screenWidth <= 450 ? null : "Chapter Number"}{" "}
                  {item.chapterNum}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className={headerStyle.chapterNavigationButtonContainer}>
        {prevChapter && (
          <div
            className={headerStyle.prevChapter}
            onClick={() =>
              router.push(
                `/series/${mangaTitle}/chapter/${prevChapter}?id=${mangaId}`
              )
            }
          >
            <Icon
              name="downArrow"
              className={headerStyle.chapterArrowIcon}
              size={12}
            />
          </div>
        )}

        {nextChapter && (
          <div
            className={headerStyle.nextChapter}
            onClick={() =>
              router.push(
                `/series/${mangaTitle}/chapter/${nextChapter}?id=${mangaId}`
              )
            }
          >
            <Icon
              name="downArrow"
              className={headerStyle.chapterArrowIcon}
              size={12}
            />
          </div>
        )}
      </div>
      <div className={headerStyle.leftHeaderSection}>
        <div
          className={headerStyle.settingsContainer}
          tabIndex={-1}
          onBlur={() => setHideSettings(true)}
        >
          <Icon
            name="settings"
            size={20}
            onClick={() => setHideSettings(!hideSettings)}
            style={{ cursor: "pointer" }}
          />
          <div
            className={headerStyle.chapterOptionsContainer}
            style={hideSettings ? { display: "none" } : null}
          >
            <div
              className={headerStyle.chapterOption}
              onClick={() => {
                setHideSettings(true);
                setHorizontalView(false);
              }}
            >
              <Icon
                name="add"
                className={headerStyle.settingsAddIcon}
                size={25}
              />
              <p className={headerStyle.chapterOptionText}>Vertical read</p>
            </div>
            <div
              className={headerStyle.chapterOption}
              onClick={() => {
                setHideSettings(true);
                setHorizontalView(true);
              }}
            >
              <Icon
                name="add"
                className={headerStyle.settingsAddIcon}
                size={25}
              />
              <p className={headerStyle.chapterOptionText}>Horizontal read</p>
            </div>
            <div
              className={headerStyle.chapterOption}
              onClick={() => {
                setHideSettings(true);
                setWebtoon(!webtoon);
              }}
            >
              <Icon
                name="add"
                className={headerStyle.settingsAddIcon}
                size={25}
              />
              <p className={headerStyle.chapterOptionText}>Webtoon mode</p>
            </div>
          </div>
        </div>
        <Icon
          name="exclamationMark"
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/series/${mangaTitle}/${mangaId}`)}
        />
      </div>
    </>
  );
}

export default Header;
