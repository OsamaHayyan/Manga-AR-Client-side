import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as searchStyle from "../styles/search.module.css";
export default function Search() {
  const { back } = useRouter();
  const [results, setResults] = useState([]);
  let timer;
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const input = e.target.value;
        if (input.length < 3) return;

        const result = await (
          await axios.post("http://localhost:8080/mangas/search-manga/", {
            query: input,
          })
        ).data;

        setResults(result);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={searchStyle.searchContainer}>
        <div className={searchStyle.searchInputContainer}>
          <AiOutlineSearch />
          <input
            type={"text"}
            className={searchStyle.searchInput}
            onInput={handleSearch}
          />
        </div>

        <p className={searchStyle.cancel} onClick={() => back()}>
          Cancel
        </p>
      </div>
      <ul className={searchStyle.searchList}>
        {results.map((manga) => (
          <li key={manga._id} className={searchStyle.searchItem}>
            <img src={`http://localhost:8080/${manga.image}`} />

            <p>{manga.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
