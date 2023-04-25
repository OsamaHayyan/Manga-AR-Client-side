import React, { Dispatch, SetStateAction, useState } from "react";
import navbarStyle from "./navbar.module.css";
import logo from "../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Icon from "../Icon";
import { searchMangaType } from "../../util/interfaces";
import RemoteImage from "../Remote_image";

type Props = {
  checkLogin: boolean;
  handleLoginState: Dispatch<SetStateAction<boolean>>;
};
export default function Navbar({ checkLogin, handleLoginState }: Props) {
  const router = useRouter();
  const [results, setResults] = useState<searchMangaType[]>();

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
  };
  const handleNavigateToManga = (manga: searchMangaType) => {
    router.push(`/series/${manga.title}/${manga._id}`);
    setResults(null);
  };
  return (
    <div className={navbarStyle.container}>
      <section className={navbarStyle.section1}>
        <div className={navbarStyle.logoContainer}>
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
              onClick={() => handleNavigateToManga(item)}
            >
              <RemoteImage src={item.image} height={32} width={32} />
              <p className={navbarStyle.resultTitle}>{item.title}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={navbarStyle.section3}>
        <Link href="/user/login" className={navbarStyle.loginBtn}>
          Login
        </Link>
        <Link href="/user/signup" className={navbarStyle.signupBtn}>
          Sign up
        </Link>
      </section>
    </div>
  );
}
