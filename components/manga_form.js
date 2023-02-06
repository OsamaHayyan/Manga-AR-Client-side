import { Button } from "@mui/material";
import React from "react";
import * as mangaFromStyle from "../styles/mangaForms.module.css";

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
    </form>
  );
}
