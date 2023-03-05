import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import * as mangaFromStyle from "../styles/mangaForms.module.css";
import background from "../public/images/backgroundMangaForm.jpg";
export default function MangaForm({
  formName,
  onSubmit,
  children,
  disable,
  style,
  className,
}) {
  return (
    <form
      method="POST"
      encType="multipart/form-data"
      className={`${mangaFromStyle.formStyle} ${className}`}
      onSubmit={onSubmit}
      style={style}
    >
      <div className={mangaFromStyle.container}>
        <h1 className={mangaFromStyle.formHeader}>{formName}</h1>

        <div className={mangaFromStyle.inputsContainer}>{children}</div>
        <div className={mangaFromStyle.submit}>
          <Button
            disabled={disable ? true : false}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
      <Image
        src={background}
        alt="background"
        fill
        style={{ objectPosition: "top right", objectFit: "cover" }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "rgb(20 20 20 / 90%)",
        }}
      ></span>
    </form>
  );
}
