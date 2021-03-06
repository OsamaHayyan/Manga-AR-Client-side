import React, { useEffect, useRef, useState } from "react";
import * as favorite from "./favorite.module.css";
import { FaBookOpen, FaRegHeart } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { IoHeartCircle } from "react-icons/io5";

export default function Favorite() {
  return (
    <div className={favorite.container}>
      <div className={favorite.child}>
        <FaBookOpen size="20px" color="white" />
        <p>Read Ch.1</p>
      </div>

      <div className={favorite.child}>
        <IoHeartCircle size="45px" color="white" />
        <p>favorite</p>
      </div>
    </div>
  );
}
