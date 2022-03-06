import React from "react";
import * as card from "./manga_card.module.css";
import { Container } from "react-bootstrap";
import { TiEye, TiCalendar } from "react-icons/ti";
import { useRouter } from "next/dist/client/router";

export default function MangaCard({ manga, newsData }) {
  const router = useRouter();

  const handleNavigation = (_id, title) => {
    return router.push(`series/${title}/${_id}`);
  };

  const MangaData = () => {
    if (manga) {
      if (!manga.message) {
        let data = manga.map((m) => (
          <div
            key={m._id}
            className={card.child}
            onClick={() => handleNavigation(m._id, m.title)}
          >
            <img
              id={m._id}
              src={`http://localhost:8080/${m.image}`}
              className={card.cardImage}
            />

            <div key={m._id + "child"} className={card.cardData}>
              <h3 className={card.cardTitle}>{m.title}</h3>
              <div className={card.cardBottom}>
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
        ));
        return data;
      }
    } else if (newsData) {
      let data = newsData.map((news) => (
        <div key={news._id} className={card.child}>
          <img
            id={news._id}
            src={`http://localhost:8080/${news.poster}`}
            className={card.cardImage}
          />
          <div key={news._id + "child"} className={card.cardData}>
            <h3 className={card.cardTitle}>{news.title}</h3>
            <p className={card.newsTopic}>{news.topic}</p>
            <div className={card.cardBottom}>
              <div className="d-flex flex-row align-items-center">
                <TiCalendar
                  size="20px"
                  color="#ff5b3b"
                  style={{ marginRight: "5px" }}
                />
                <p style={{ lineHeight: 0 }}>{news.createdAt.split("T")[0]}</p>
              </div>
            </div>
          </div>
        </div>
      ));

      return data;
    }
  };
  return (
    <Container fluid className={card.container}>
      <MangaData />
    </Container>
  );
}
