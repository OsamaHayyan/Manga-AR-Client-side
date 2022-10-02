import * as chapterUploadStyle from "../styles/mangaupload.module.css";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import LazyLoading from "../util/lazyloading";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";

export default function ChapterUpload() {
  const { replace } = useRouter();
  const {
    register,
    clearErrors,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [imageValidate, setImageValidate] = useState({
    image: null,
    banner: null,
  });
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [results, setResults] = useState([]);
  const [progress, setPorgress] = useState(0);
  let { lazyLoader: lazySearch } = new LazyLoading();
  const handleSearch = async (e) => {
    //new sorting way
    let collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });

    await lazySearch(async () => {
      try {
        e.preventDefault();
        const input = e.target.value;
        if (input.length < 3) return;
        console.log(input);

        const result = await (
          await axios.post("http://localhost:8080/mangas/search-manga/", {
            query: input,
          })
        ).data.sort((a, b) => collator.compare(a.title, b.title));
        setLoading(false);
        setResults(result);
      } catch (error) {
        toast.error("Unexpected Error happened, Please Try Again Later");
      }
    }, 300);
  };

  const handleImage = async (e) => {
    let file = e.target.files[0];
    if (
      file &&
      (!file.type.includes("image") || file.size * Math.pow(10, -6) > 10)
    ) {
      e.target.value = null;
      return setImageValidate({ ...imageValidate, image: true });
    }
    setImageValidate({ ...imageValidate, image: null });
    clearErrors("image");
  };

  const onSubmit = async (data) => {
    try {
      setDisable(true);
      console.log(data);
      let formData = new FormData();
      formData.append("mangaId", data.manga._id);
      formData.append("chapterNum", data.chapterNum);
      formData.append("name", data.chapterName);

      [...data.image].map((image) => {
        formData.append("photos", image);
      });

      await axios.post("http://localhost:8080/chapters/add-chapter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        onUploadProgress: function (progressEvent) {
          let accualProgress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setPorgress(accualProgress);
        },
      });

      toast.success("chapter was uploaded");
      await replace(`/series/${data.manga.title}/${data.manga._id}`);
    } catch (error) {
      setPorgress(0);
      setDisable(false);
      toast.error("Unexpected Error happened, Please Try Again Later");
    }
  };

  let { lazyLoader: lazySpinner } = new LazyLoading();
  const handleLoading = async (e) => {
    if (e.target.value.length < 3) return setLoading(false);
    await lazySpinner(() => setLoading(true), 300);
  };
  return (
    <>
      <div className={chapterUploadStyle.container}>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Controller
            name="manga"
            control={control}
            rules={{
              required: true,
              validate: (v) => (v && v._id ? true : false),
            }}
            render={({ field }) => (
              <Autocomplete
                disabled={disable}
                id="title"
                loading={loading}
                onChange={(_, value) => field.onChange(value)}
                options={results}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={handleLoading}
                    error={errors.manga ? true : false}
                    variant="standard"
                    label="Manga Title"
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
                    helperText={errors.manga ? "please choose the manga" : null}
                    onInput={handleSearch}
                  />
                )}
              />
            )}
          />

          <TextField
            {...register("chapterName")}
            variant="standard"
            label="Chapter Title"
            placeholder=" "
            disabled={disable}
          />

          <TextField
            {...register("chapterNum", {
              required: true,
              validate: {
                postive: (v) => parseInt(v) >= 0,
                isInt: (v) => !isNaN(v),
              },
            })}
            error={errors.chapterNum ? true : false}
            variant="standard"
            label="Chapter Number"
            placeholder=" "
            helperText={errors.chapterNum ? "Please add chapter number" : null}
            disabled={disable}
          />

          <div className="mb-3">
            <label
              className="form-label"
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              }}
            >
              Chapter Pages
            </label>
            <input
              {...register("image", { required: true })}
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontFamily: "Roboto,Helvetica,Arial,sans-serif",
              }}
              className="form-control"
              type="file"
              multiple
              id="formFile"
              accept="image/*"
              onChange={handleImage}
              disabled={disable}
            />
            {errors.image != undefined || imageValidate.image != null ? (
              <div
                className="invalid-feedback"
                style={{ display: "block", fontSize: "0.75rem" }}
              >
                Please upload a valid image.
              </div>
            ) : null}
          </div>

          {disable ? (
            <LinearProgress variant="determinate" value={progress} />
          ) : null}
          <Button variant="outlined" type="submit" disabled={disable}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
