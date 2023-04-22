import React, { useState } from "react";
import { IcategoryAll } from "../../util/interfaces";
import sortStyle from "./sorte.module.css";

interface Props {
  catData: IcategoryAll;
  handleSubmet: ({
    catId,
    order,
    page,
  }: {
    catId?: string;
    order?: string;
    page: number;
  }) => Promise<void>;
  handleSort: React.Dispatch<
    React.SetStateAction<{
      catId: string;
      order: string;
      page: number;
      pageMount: number;
    }>
  >;
  sort: {
    catId: string;
    order: string;
    page: number;
    pageMount: number;
  };
}
export default function Sort({ catData, handleSubmet }: Props) {
  const [idSort, setIdSort] = useState("");
  const [idCat, setIdCat] = useState("all");
  const handleClickSort = (id: string) => {
    setIdSort(id);
    handleSubmet({ order: id, page: 1 });
  };
  const handleClickCat = (id: string) => {
    setIdCat(id);
    handleSubmet({ catId: id, page: 1 });
  };

  return (
    <div className={sortStyle.container}>
      <section className={sortStyle.sortSection}>
        <p>Orders</p>
        <div className={sortStyle.choices}>
          <span
            id="alphabet"
            className={`${sortStyle.btnContainer} ${
              idSort ? "" : sortStyle.active
            } ${idSort === "alphabet" ? sortStyle.active : ""}`}
            onClick={(e) => handleClickSort(e.currentTarget.id)}
          >
            <p>A-Z</p>
          </span>
          <span
            id="rate"
            className={`${sortStyle.btnContainer} ${
              idSort === "rate" ? sortStyle.active : ""
            }`}
            onClick={(e) => handleClickSort(e.currentTarget.id)}
          >
            <p>Rate</p>
          </span>
          <span
            id="new"
            className={`${sortStyle.btnContainer} ${
              idSort === "new" ? sortStyle.active : ""
            }`}
            onClick={(e) => handleClickSort(e.currentTarget.id)}
          >
            <p>New</p>
          </span>
          <span
            id="view"
            className={`${sortStyle.btnContainer} ${
              idSort === "view" ? sortStyle.active : ""
            }`}
            onClick={(e) => handleClickSort(e.currentTarget.id)}
          >
            <p>Views</p>
          </span>
        </div>
      </section>
      <section className={sortStyle.catSection}>
        <p>Categories</p>
        <div className={sortStyle.choices}>
          <span
            id="all"
            className={`${sortStyle.btnContainer} ${
              idCat === "all" ? sortStyle.active : ""
            }`}
            onClick={(e) => handleClickCat(e.currentTarget.id)}
          >
            <p>All</p>
          </span>
          {catData.map((c, i) => (
            <span
              key={c._id}
              id={c._id}
              className={`${sortStyle.btnContainer} ${
                idCat === c._id ? sortStyle.active : ""
              }`}
              onClick={(e) => handleClickCat(e.currentTarget.id)}
            >
              <p>{c.category}</p>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
