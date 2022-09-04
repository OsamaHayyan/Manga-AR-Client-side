import * as mangaUploadStyle from "../styles/mangaupload.module.css";
import {
  Autocomplete,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const MangaUplouds = () => {
  const [mangaData, setMangaData] = useState({
    authers: [],
    categories: [],
    date: [],
    status: ["on going", "finished", "stopped"],
  });

  const [loading, setLoading] = useState(false);
  const handleAuthData = async () => {
    if (mangaData.authers.length != 0) return undefined;
    setLoading(true);
    let authers = await (await axios.get("http://localhost:8080/test/")).data;
    setMangaData({ ...mangaData, authers: authers });
    setLoading(false);
  };

  return (
    <>
      <div className={mangaUploadStyle.container}>
        <form>
          <TextField variant="standard" label="Title" placeholder=" " />
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
              />
            )}
          />
        </form>
      </div>
    </>
  );
};

export default MangaUplouds;
