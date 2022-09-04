import * as mangaUploadStyle from "../styles/mangaupload.module.css";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const MangaUplouds = () => {
  const [mangaData, setMangaData] = useState({
    authers: [],
    categories: [],
    date: [],
    status: ["on going", "finished", "stopped"],
  });

  const [image, setImage] = useState("Upload");

  const [loading, setLoading] = useState(false);
  const handleAuthData = async () => {
    if (mangaData.authers.length != 0) return undefined;
    setLoading(true);
    let authers = await (await axios.get("http://localhost:8080/test/")).data;
    setMangaData({ ...mangaData, authers: authers });
    setLoading(false);
  };

  const handleImage = async (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className={mangaUploadStyle.container}>
        <form encType="multipart/form-data">
          <TextField
            variant="standard"
            label="Title"
            placeholder=" "
            required
            helperText={"Please add manga title"}
          />
          <Autocomplete
            multiple
            loading
            id="tags-standard"
            options={mangaData.authers}
            onOpen={handleAuthData}
            onClose={() => setLoading(false)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Authers"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                required
                helperText={"please choose auhters"}
              />
            )}
          />
          <Autocomplete
            multiple
            loading
            id="tags-standard"
            options={mangaData.categories}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Categories"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                required
                helperText={"please choose manga categories"}
              />
            )}
          />

          <Autocomplete
            id="tags-standard"
            loading
            options={mangaData.date}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Date"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                required
                helperText={"please choose manga publish date"}
              />
            )}
          />

          <Autocomplete
            id="tags-standard"
            loading
            options={mangaData.status}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Status"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                error={false}
                required
                helperText={"please choose manga status"}
              />
            )}
          />
          <div className="mb-3">
            <label className="form-label">Manga Image</label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              required
              onChange={handleImage}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default MangaUplouds;
