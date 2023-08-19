import React, { useRef, useEffect, useState } from "react";
import navbarStyle from "./navbar.module.css";
import logo from "../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Icon from "../Icon";
import { searchMangaType, userType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";

type Props = {
  user: userType;
};
export default function Navbar({ user }: Props) {
  const router = useRouter();
  const textInputRef = useRef<HTMLInputElement>();

  const [results, setResults] = useState<searchMangaType[]>();
  const [userData, setUser] = useState<userType>(user);
  const [hideOptions, setHideOptions] = useState(true);
  const [hideSearchResults, setHideSearchResults] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [disable, setDisable] = useState(false);
  let timer: NodeJS.Timeout;
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    try {
      e.preventDefault();
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const input = e.target.value;
        if (input.length < 3) return setResults(null);

        const result: searchMangaType[] = await (
          await axios.post(
            `${process.env.NEXT_PUBLIC_HOSTURL}/mangas/search-manga/`,
            {
              query: input,
            }
          )
        ).data;
        setHideSearchResults(false);
        return setResults(result);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlurSearch: React.FocusEventHandler<HTMLInputElement> = async (
    e
  ) => {
    console.log("test");

    e.preventDefault();
    e.target.value = null;
    setResults(null);
    setHideSearchResults(true);
  };
  const handleNavigateToManga = (manga: searchMangaType) => {
    router.push(`/series/${manga.title}/${manga._id}`);
    setResults(null);
    setShowSearchBar(false);
  };
  const handleLogout = async () => {
    try {
      setDisable(true);
      await axios.get(`${process.env.NEXT_PUBLIC_HOSTURL}/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      setShowSideBar(false);
      if (
        router.pathname.includes("manga-upload") ||
        router.pathname.includes("chapter-upload")
      ) {
        router.replace("/");
      }
      setDisable(false);
    } catch (error) {
      console.log(error);
      setUser(user);
    }
  };
  const toggleSideBar = () => {
    setShowSideBar((prevState) => !prevState);
    if (!showSideBar && showSearchBar) setShowSearchBar(false);
  };
  const toggleSearchBar = () => {
    setShowSearchBar((prevState) => !prevState);
    if (!showSearchBar && showSideBar) setShowSideBar(false);
  };

  const dismissKeyboard = () => {
    textInputRef.current.blur();
  };

  useEffect(() => {
    if (showSideBar || showSearchBar) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSideBar, showSearchBar]);

  return (
    <div className={navbarStyle.container}>
      <section className={navbarStyle.section1}>
        <Link href={"/"} className={navbarStyle.logoContainer}>
          <Icon name="logo" className={navbarStyle.logo} />
        </Link>
        <Link
          href="/"
          className={`${navbarStyle.pages} ${
            router.pathname === "/" && navbarStyle.active
          }`}
        >
          Home
        </Link>
        <Link
          href="/library"
          className={`${navbarStyle.pages} ${
            router.pathname === "/library" && navbarStyle.active
          }`}
        >
          Library
        </Link>
        {/* <Link href='/' className={navbarStyle.pages}>News</Link> */}
      </section>
      <section className={navbarStyle.section2}>
        <div className={navbarStyle.searchBoxContainer}>
          <input
            type="text"
            className={navbarStyle.searchBox}
            placeholder="Search"
            onChange={handleSearch}
            onBlur={handleBlurSearch}
          />
          <div className={navbarStyle.searchIcon}>
            <Icon name="search" size={24} />
          </div>
        </div>
        <ul
          hidden={hideSearchResults}
          className={navbarStyle.searchResultsContainer}
        >
          {results?.map((item, i) => (
            <li
              key={i}
              className={navbarStyle.resultList}
              onMouseDown={() => handleNavigateToManga(item)}
            >
              <RemoteImage src={item.image} height={32} width={32} />
              <p className={navbarStyle.resultTitle}>{item.title}</p>
            </li>
          ))}
        </ul>
      </section>
      <section
        className={navbarStyle.section3}
        tabIndex={1}
        onBlur={() => setHideOptions(true)}
      >
        {userData ? (
          <>
            <Icon
              name="logout"
              size={28}
              style={{ marginRight: 11, cursor: "pointer" }}
              onClick={handleLogout}
            />
            <RemoteImage
              onClick={() => setHideOptions(false)}
              src={userData.image}
              height={60}
              width={60}
              style={{
                borderRadius: "60px",
                overflow: "hidden",
                border: "3px solid #D100B2",
                cursor: "pointer",
              }}
            />
            {user.admin && (
              <div
                className={navbarStyle.userOptionsContainer}
                style={hideOptions ? { display: "none" } : null}
              >
                <div
                  className={navbarStyle.userOption}
                  onClick={() => {
                    router.push("/manga-upload");
                    setHideOptions(true);
                  }}
                >
                  <Icon name="add" size={32} />
                  <p className={navbarStyle.userOptionText}>Add Manga</p>
                </div>
                <div
                  className={navbarStyle.userOption}
                  onClick={() => {
                    router.push("/chapter-upload");
                    setHideOptions(true);
                  }}
                >
                  <Icon name="add" size={32} />
                  <p className={navbarStyle.userOptionText}>Add Chapter</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <Link href="/user/login" className={navbarStyle.loginBtn}>
              Login
            </Link>
            <Link href="/user/signup" className={navbarStyle.signupBtn}>
              Sign up
            </Link>
          </>
        )}
      </section>
      <section className={navbarStyle.mobileLogoSection}>
        <Link href={"/"} className={navbarStyle.logoContainer}>
          <Icon name="logo" className={navbarStyle.logo} />
        </Link>
      </section>
      <section className={navbarStyle.mobileBtnSection}>
        {!showSearchBar ? (
          <div className={navbarStyle.btnContainer} onClick={toggleSearchBar}>
            <Icon name="search" size={12} />
          </div>
        ) : (
          <div className={navbarStyle.btnContainer} onClick={toggleSearchBar}>
            <Icon name="cross" size={12} />
          </div>
        )}
        {!showSideBar ? (
          <div className={navbarStyle.btnContainer} onClick={toggleSideBar}>
            <Icon name="list" size={12} />
          </div>
        ) : (
          <div className={navbarStyle.btnContainer} onClick={toggleSideBar}>
            <Icon name="cross" size={12} />
          </div>
        )}
      </section>
      <section
        onTouchStart={dismissKeyboard}
        className={`${navbarStyle.sideBar} ${
          showSearchBar ? navbarStyle.visible : null
        }`}
      >
        <div className={navbarStyle.searchBoxContainer}>
          <input
            type="text"
            className={navbarStyle.searchBox}
            placeholder="Search"
            onChange={handleSearch}
            onBlur={handleBlurSearch}
            ref={textInputRef}
          />
        </div>
        <ul className={navbarStyle.searchResultsContainer}>
          {results?.map((item, i) => (
            <li
              key={i}
              className={navbarStyle.resultList}
              onMouseDown={() => handleNavigateToManga(item)}
            >
              <RemoteImage src={item.image} height={32} width={32} />
              <p className={navbarStyle.resultTitle}>{item.title}</p>
            </li>
          ))}
        </ul>
      </section>
      <section
        className={`${navbarStyle.sideBar} ${
          showSideBar ? navbarStyle.visible : null
        }`}
      >
        <div className={navbarStyle.mbLinks}>
          <Link href="/" className={navbarStyle.pages}>
            <Icon name="home" size={20} />
            Home
          </Link>
          <Link href="/library" className={navbarStyle.pages}>
            <Icon name="book" size={20} />
            Library
          </Link>
          {userData?.admin && (
            <div className={navbarStyle.userOptionsContainer}>
              <div
                className={navbarStyle.userOption}
                onClick={() => {
                  router.push("/manga-upload");
                  setHideOptions(true);
                }}
              >
                <Icon name="add" size={20} />
                <p className={navbarStyle.userOptionText}>Add Manga</p>
              </div>
              <div
                className={navbarStyle.userOption}
                onClick={() => {
                  router.push("/chapter-upload");
                  setHideOptions(true);
                }}
              >
                <Icon name="add" size={20} />
                <p className={navbarStyle.userOptionText}>Add Chapter</p>
              </div>
            </div>
          )}
        </div>
        <hr className={navbarStyle.separator} />

        {!userData ? (
          <>
            <Link href="/user/login" className={navbarStyle.loginBtn}>
              Login
            </Link>
            <Link href="/user/signup" className={navbarStyle.blackBtn}>
              Sign up
            </Link>
          </>
        ) : (
          <button
            disabled={disable}
            className={navbarStyle.blackBtn}
            onClick={handleLogout}
          >
            <Icon name="logout" size={20} />
            Logout
          </button>
        )}
      </section>
    </div>
  );
}
