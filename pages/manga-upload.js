import * as mangaUploadStyle from "../styles/mangaupload.module.css";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";

const MangaUplouds = () => {
  const {
    register,
    clearErrors,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [mangaData, setMangaData] = useState({
    authers: [],
    categories: ["test1"],
    date: ["2992"],
    status: ["on going", "finished", "stopped"],
  });

  const [imageValidate, setImageValidate] = useState(null);

  const [loading, setLoading] = useState(false);
  const handleAuthData = async () => {
    if (mangaData.authers.length != 0) return undefined;
    setLoading(true);
    let authers = await (await axios.get("http://localhost:8080/test/")).data;
    setMangaData({ ...mangaData, authers: authers });
    setLoading(false);
  };

  const handleImage = async (e) => {
    let file = e.target.files[0];
    if (
      file &&
      (!file.type.includes("image") || file.size * Math.pow(10, -6) > 10)
    ) {
      e.target.value = null;
      return setImageValidate(true);
    }
    setImageValidate(null);
    clearErrors("image");
  };

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className={mangaUploadStyle.container}>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            {...register("title", { required: true })}
            error={errors.title ? true : false}
            variant="standard"
            label="Title"
            placeholder=" "
            helperText={errors.title ? "Please add manga title" : null}
          />
          <Controller
            name="auther"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                multiple
                loading
                onChange={(_, value) => field.onChange(value)}
                id="tags-standard"
                options={mangaData.authers}
                onOpen={handleAuthData}
                onClose={() => setLoading(false)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e) => console.log(e)}
                    error={errors.auther ? true : false}
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
                    helperText={errors.auther ? "please choose auhters" : null}
                  />
                )}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                multiple
                loading
                onChange={(_, value) => field.onChange(value)}
                id="tags-standard"
                options={mangaData.categories}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errors.category ? true : false}
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
                    helperText={
                      errors.category ? "please choose manga categories" : null
                    }
                  />
                )}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                id="tags-standard"
                loading
                onChange={(_, value) => field.onChange(value)}
                options={mangaData.date}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errors.date ? true : false}
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
                    helperText={
                      errors.date ? "please choose manga publish date" : null
                    }
                  />
                )}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                id="tags-standard"
                loading
                onChange={(_, value) => field.onChange(value)}
                options={mangaData.status}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errors.status ? true : false}
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
                    helperText={
                      errors.status ? "please choose manga status" : null
                    }
                  />
                )}
              />
            )}
          />

          <div className="mb-3">
            <label
              className="form-label"
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              }}
            >
              Manga Image *
            </label>
            <input
              {...register("image", { required: true })}
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              }}
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              onChange={handleImage}
            />
            {errors.image != undefined || imageValidate != null ? (
              <div class="invalid-feedback" style={{ display: "block" }}>
                Please upload a valid image.
              </div>
            ) : null}
          </div>

          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default MangaUplouds;
