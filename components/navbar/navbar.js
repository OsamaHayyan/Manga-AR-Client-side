import React, { useEffect, useRef, useState } from "react";
import * as navbarStyle from "./navbar.module.css";
import * as logo from "../../public/images/logo.png";
import * as userImage from "../../public/images/placeholder-avatar.jpg";
import Image from "next/legacy/image";
import Link from "next/link";
import { ClickAwayListener } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

import { useRouter } from "next/dist/client/router";

export default function Navbar({ checkLogin, handleLoginState }) {
  const cookies = new Cookies();
  const { pathname, push } = useRouter();
  const [openResult, setResult] = useState(false);
  const [results, setResults] = useState("");
  const dropdown = useRef(null);
  const Logo = ({ logoImage }) => {
    if (logoImage) {
      return (
        <div className={navbarStyle.logoImageWarpper}>
          <Link href="/">
            <Image
              src={logoImage}
              layout="intrinsic"
              className={navbarStyle.logoImage}
            />
          </Link>
        </div>
      );
    }
    return (
      <h2 className={navbarStyle.logoName}>
        <Link href="/"> Logo </Link>
      </h2>
    );
  };

  const handleLogout = async () => {
    try {
      cookies.remove("logged_in");
      await handleLoginState(false);
      await axios.get("http://localhost:8080/user/logout", {
        withCredentials: true,
      });
    } catch (error) {
      cookies.set("logged_in", "true");
      await handleLoginState(true);
      toast.error("Can't logout try again, please!");

      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message ? error.message : error);
      }
    }
  };

  const Login = ({ login, username, profileImage }) => {
    let [loginClicked, setLogin] = useState(false);
    const logging = login ? (
      <>
        <ClickAwayListener onClickAway={() => setLogin(false)}>
          <div
            className={navbarStyle.rightSide}
            onClick={() => setLogin(!loginClicked)}
          >
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwWMJbZoZ26ZyYB8M-1e7OLBVUWXRLNSO6A&usqp=CAU"
              }
            />
            <p>{username}</p>
            <ul
              className={`${navbarStyle.userOption} ${
                loginClicked ? navbarStyle.userOptionClicked : null
              }`}
            >
              <li>
                <Link href="#">Profile</Link>
              </li>
              <li>
                <Link href="#">Dashboard</Link>
              </li>
              <li onClick={handleLogout}>
                <Link href="#">Logout</Link>
              </li>
            </ul>
          </div>
        </ClickAwayListener>
        <div className={navbarStyle.rightSideMobile}>
          <FaSearch
            className={navbarStyle.searchMobile}
            onClick={() => push("/search")}
          />
          <div className={navbarStyle.line}></div>
          <div className={navbarStyle.profileMobile}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwWMJbZoZ26ZyYB8M-1e7OLBVUWXRLNSO6A&usqp=CAU" />
          </div>
        </div>
      </>
    ) : (
      <div className={navbarStyle.rightSideMobileLogin}>
        <FaSearch
          className={navbarStyle.searchMobileLogin}
          onClick={() => push("/search")}
        />
        <div className={navbarStyle.lineLogin}></div>
        <Link href="/user/login" className={` ${navbarStyle.login}`}>
          Login
        </Link>
      </div>
    );
    return logging;
  };

  let timer;
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const input = e.target.value;
        if (input.length < 3) return setResult(false);

        const result = await (
          await axios.post("http://localhost:8080/mangas/search-manga/", {
            query: input,
          })
        ).data;

        console.log(result);
        setResults(result);
        return setResult(true);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickSearch = async (e, mangaId, title) => {
    try {
      setResult(false);
      dropdown.current.children[0].value = "";
      return push(`/series/${title}/${mangaId}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (openResult == false) return;

    const handleClick = (e) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        dropdown.current.children[0].value = "";
        setResult(false);
      }
    };
    console.log("osama");
    window.addEventListener("click", handleClick);
    //cleanup
    return () => window.removeEventListener("click", handleClick);
  }, [openResult]);

  return (
    <div
      style={{ backgroundColor: "white", position: "relative", zIndex: 1000 }}
    >
      <div className={navbarStyle.navbarContainer}>
        <div className={navbarStyle.leftSide}>
          <Logo logoImage={logo} />
          <ul className={navbarStyle.navItemsContainer}>
            <li
              className={`${navbarStyle.navItem} ${
                pathname == "/" ? navbarStyle.navItemActive : ""
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`${navbarStyle.navItem} ${
                pathname == "/library" ? navbarStyle.navItemActive : ""
              }`}
            >
              <Link href="/library">library</Link>
            </li>
            <li
              className={`${navbarStyle.navItem} ${
                pathname == "/news" ? navbarStyle.navItemActive : ""
              }`}
            >
              <Link href="/news">News</Link>
            </li>
          </ul>
        </div>
        <div
          className={navbarStyle.searchBar}
          onInput={handleSearch}
          ref={dropdown}
        >
          <input
            className={navbarStyle.searchInput}
            type={"text"}
            placeholder="please type your manga name"
          />
          <div className={navbarStyle.searchIcon}>
            <AiOutlineSearch />
          </div>
          <ul
            className={`${navbarStyle.resultsContainer} `}
            style={openResult ? { visibility: "visible", opacity: 1 } : {}}
          >
            {results &&
              results.map((manga) => (
                <li
                  key={manga.title}
                  className={navbarStyle.result}
                  onClick={(e) => handleClickSearch(e, manga._id, manga.title)}
                >
                  <img
                    className={navbarStyle.resultImg}
                    src={`http://localhost:8080/${manga.image}`}
                  />
                  <p>{manga.title}</p>
                </li>
              ))}
          </ul>
        </div>
        <Login
          login={checkLogin}
          username={"osama hayyan"}
          profileImage={userImage}
        />
      </div>

      {/* Mobile navbar design */}
      <div className={navbarStyle.navbarContainerMobile}>
        <ul className={navbarStyle.navItemsContainerMobile}>
          <li
            className={`${navbarStyle.navItem} ${
              pathname == "/" ? navbarStyle.navItemActive : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`${navbarStyle.navItem} ${
              pathname == "/library" ? navbarStyle.navItemActive : ""
            }`}
          >
            <Link href="/library">library</Link>
          </li>
          <li
            className={`${navbarStyle.navItem} ${
              pathname == "/news" ? navbarStyle.navItemActive : ""
            }`}
          >
            <Link href="/news">News</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
