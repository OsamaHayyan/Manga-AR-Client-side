import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as searchStyle from "../styles/search.module.css";
export default function Search() {
  return (
    <div>
      <div className={searchStyle.searchContainer}>
        <div className={searchStyle.searchInputContainer}>
          <AiOutlineSearch />
          <input type={"text"} className={searchStyle.searchInput} />
        </div>

        <p className={searchStyle.cancel}>cancel</p>
      </div>
      <ul className={searchStyle.searchList}>
        <li className={searchStyle.searchItem}>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwWMJbZoZ26ZyYB8M-1e7OLBVUWXRLNSO6A&usqp=CAU"
            }
          />

          <p>manga name</p>
        </li>
      </ul>
    </div>
  );
}
