import React from "react";
import recommenderStyle from "./recommender.module.css";
import RemoteImage from "../Remote_image";
import { recommendationsType } from "../../util/interfaces";
import { useRouter } from "next/router";
import { title } from "process";
type Props = {
  recommendations: recommendationsType[];
};

function Recommender({ recommendations }: Props) {
  const router = useRouter();
  const handleNavigationToManga = (id: string, title: string) => {
    console.log(title);

    router.push(`/series/${title}/${id}`);
  };
  return (
    <div className={recommenderStyle.container}>
      <p className={recommenderStyle.header}>RECOMMENDED FOR YOU</p>
      <div className={recommenderStyle.recommendationsContainer}>
        {recommendations?.map(
          (item, i) =>
            i <= 5 && (
              <div
                key={item._id}
                className={recommenderStyle.recommendation}
                onClick={() => handleNavigationToManga(item._id, item.title)}
              >
                <RemoteImage
                  src={item.image}
                  width={148}
                  height={108}
                  className={recommenderStyle.remoteImage}
                />
                <div className={recommenderStyle.data}>
                  <p className={recommenderStyle.title}>{item.title}</p>
                  <p className={recommenderStyle.chapterNum}>Chapter 140</p>
                  <p className={recommenderStyle.views}>1,015 views</p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Recommender;
