import React, { useState } from "react";
import Image from "next/image";
import * as manga_card from "./manga_card.module.css";
import { Container } from "react-bootstrap";
import overLay from "../../public/images/img_overlay.png";
import load from "../../public/images/placeholder-avatar.jpg";
import { TiEye } from "react-icons/ti";

export default function MangaCard({ manga }) {
  const [hover, setHover] = useState(false);
  const [id, setId] = useState("");
  const checkHover = (id) => {
    setHover(true);
    setId(id);
    console.log(hover);
    console.log("osama");
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <Container fluid className={manga_card.container}>
      {!manga.message &&
        manga.map((m) => (
          <div
            key={m._id}
            className={manga_card.child}
            // onMouseEnter={() => checkHover(m._id)}
            // onMouseLeave={() => onLeave()}
          >
            <Image
              id={m._id}
              src={`http://localhost:8080/${m.image}`}
              layout="fill"
              className={manga_card.cardImage}
            />
            {/* <Image
              src={overLay}
              layout="fill"
              className={manga_card.cardOverlay}
            /> */}
            <div key={m._id + "child"} className={manga_card.cardData}>
              <h3 className={manga_card.cardTitle}>{m.title}</h3>
              <div className={manga_card.cardViews}>
                <div className="d-flex flex-row align-items-center">
                  <TiEye
                    size="20px"
                    color="#ff5b3b"
                    style={{ marginRight: "5px" }}
                  />
                  <p style={{ lineHeight: 0 }}>{m.views}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Container>
  );
}
