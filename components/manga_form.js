import { Button } from "@mui/material";
import React from "react";
import * as mangaFromStyle from "../styles/mangaForms.module.css";

export default function MangaForm({ formName, onSubmit, children, disable }) {
  return (
    <form
      method="POST"
      encType="multipart/form-data"
      className={mangaFromStyle.formStyle}
      onSubmit={onSubmit}
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
            {formName}
          </Button>
        </div>
      </div>
    </form>
  );
}
