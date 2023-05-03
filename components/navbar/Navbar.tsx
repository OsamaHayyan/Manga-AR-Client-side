import React, { useState } from "react";
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
  const [results, setResults] = useState<searchMangaType[]>();
  const [userData, setUser] = useState<userType>(user);
  const [hideOptions, setHideOptions] = useState(true);
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
          await axios.post("http://localhost:8080/mangas/search-manga/", {
            query: input,
          })
        ).data;
        return setResults(result);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlurSearch: React.FocusEventHandler<HTMLInputElement> = async (
    e
  ) => {
    e.preventDefault();
    e.target.value = null;
    setResults(null);
  };
  const handleNavigateToManga = (manga: searchMangaType) => {
    router.push(`/series/${manga.title}/${manga._id}`);
    setResults(null);
  };
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/user/logout", {
        withCredentials: true,
      });
      setUser(null);
      if (
        router.pathname.includes("manga-upload") ||
        router.pathname.includes("chapter-upload")
      )
        router.replace("/");
    } catch (error) {
      console.log(error);
      setUser(user);
    }
  };

  return (
    <div className={navbarStyle.container}>
      <section className={navbarStyle.section1}>
        <div
          className={navbarStyle.logoContainer}
          style={{ background: "white" }}
        >
          <Image src={logo} alt="logo" className={navbarStyle.logo} fill />
        </div>
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
            <Icon name="search" size={25} />
          </div>
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
            {" "}
            <Link href="/user/login" className={navbarStyle.loginBtn}>
              Login
            </Link>
            <Link href="/user/signup" className={navbarStyle.signupBtn}>
              Sign up
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
