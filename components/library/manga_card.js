import React from "react";
import * as manga_card from "./manga_card.module.css";
import { Container } from "react-bootstrap";
import { TiEye } from "react-icons/ti";
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
            className={manga_card.child}
            onClick={() => handleNavigation(m._id, m.title)}
          >
            <img
              id={m._id}
              src={`http://localhost:8080/${m.image}`}
              className={manga_card.cardImage}
            />

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
        ));
        return data;
      }
    } else if (newsData) {
      let data = newsData.map((news) => (
        <div key={news._id} className={manga_card.child}>
          <img
            id={news._id}
            src={`http://localhost:8080/${news.poster}`}
            className={manga_card.cardImage}
          />
          <div key={news._id + "child"} className={manga_card.cardData}>
            <h3 className={manga_card.cardTitle}>{news.title}</h3>

            <p className={manga_card.newsTopic}>{news.topic}</p>
          </div>
        </div>
      ));

      return data;
    }
  };
  return (
    <Container fluid className={manga_card.container}>
      <MangaData />
    </Container>
  );
}
