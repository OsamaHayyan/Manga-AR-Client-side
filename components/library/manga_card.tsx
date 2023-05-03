import React from "react";
import card from "./manga_card.module.css";
import { useRouter } from "next/dist/client/router";
import { mangaType } from "../../util/interfaces";
import Rate from "../Rate";
import RemoteImage from "../Remote_image";

export default function MangaCard({ manga }: { manga: mangaType }) {
  const router = useRouter();

  const handleNavigation = () => {
    return router.push(
      `series/${manga.title.replaceAll("/", "")}/${manga._id}`
    );
  };

  return (
    <div className={card.container} onClick={handleNavigation}>
      <RemoteImage src={manga.image} />
      <section className={card.contentSection}>
        <p className={card.title}>{manga.title}</p>
        <div>
          <p className={card.category}>
            {manga.category.map((cat) => cat.category).join(", ")}
          </p>
          <Rate rate={manga.rate} size={24} />
          <div>
            <p className={card.story}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, inventore assumenda repellat vel, eum nam est beatae
              dolorem fuga consequatur facere sit. Quaerat adipisci itaque
              voluptate alias perspiciatis dolores dicta?
            </p>
            <p
              className={card.story}
              style={{ textDecorationLine: "underline" }}
            >
              Tap to continue
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
