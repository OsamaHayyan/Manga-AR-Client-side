import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as sorte from "./sorte.module.css";
export default function Sorte({
  handleCatId,
  handleOrder,
  catData,
  handlePage,
  handleSort,
  sort,
}) {
  const [idSort, setIdSort] = useState("");
  const [idCat, setIdCat] = useState("");
  const router = useRouter();
  const handleClickSort = (id) => {
    router.replace("/library");
    setIdSort(id);
    handleSort({ ...sort, page: 1, order: id });
  };
  const handleClickCat = (id) => {
    router.replace("/library");
    setIdCat(id);
    handleSort({ ...sort, page: 1, catId: id });
  };

  return (
    <>
      <Container fluid className={sorte.container}>
        <div className={sorte.section}>
          <Row>
            <Col>
              <h2>SORT BY</h2>
            </Col>
          </Row>
          <Row xs="auto" className={sorte.row}>
            <Col>
              <h3
                id="alphabet"
                className={`${sorte.a} ${idSort ? "" : sorte.active} ${
                  idSort === "alphabet" ? sorte.active : ""
                }`}
                onClick={(e) => handleClickSort(e.target.id)}
              >
                A - Z
              </h3>
            </Col>
            <Col>
              <h3
                id="new"
                className={`${sorte.a} ${idSort === "new" ? sorte.active : ""}`}
                onClick={(e) => handleClickSort(e.target.id)}
              >
                New
              </h3>
            </Col>
            <Col>
              <h3
                id="rate"
                className={`${sorte.a} ${
                  idSort === "rate" ? sorte.active : ""
                }`}
                onClick={(e) => handleClickSort(e.target.id)}
              >
                Rate
              </h3>
            </Col>
            <Col>
              <h3
                id="view"
                className={`${sorte.a} ${
                  idSort === "view" ? sorte.active : ""
                }`}
                onClick={(e) => handleClickSort(e.target.id)}
              >
                Views
              </h3>
            </Col>
          </Row>
        </div>
        <div className={sorte.section}>
          <Row>
            <Col>
              <h2>GENRES</h2>
            </Col>
          </Row>
          <Row xs="auto" className={sorte.row}>
            <Col>
              <h3
                id="all"
                className={`${sorte.a} ${idCat ? "" : sorte.active} ${
                  idCat === "all" ? sorte.active : ""
                }`}
                onClick={(e) => handleClickCat(e.target.id)}
              >
                All
              </h3>
            </Col>
            {catData.map((c) => (
              <Col key={c._id}>
                <h3
                  id={c._id}
                  className={`${sorte.a} ${
                    idCat === c._id ? sorte.active : ""
                  }`}
                  onClick={(e) => handleClickCat(e.target.id)}
                >
                  {c.category}
                </h3>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
