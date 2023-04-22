import * as chapterUploadStyle from "../styles/mangaupload.module.css";
import React, { useState } from "react";
import path from "path";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import LazyLoading from "../util/lazyloading";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import AutoComplete from "../components/auto_complete_input";
import Input from "../components/input";
import MangaForm from "../components/manga_form";
import Icon from "../components/Icon";
import InputUpload from "../components/upload_input";
export default function ChapterUpload() {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();
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

  const onSubmit = async (data) => {
    try {
      setDisable(true);
      let formData = new FormData();
      formData.append("mangaId", data.manga._id);
      formData.append("chapterNum", data.chapterNum);
      formData.append("name", data.chapter_title);

      [...data.image].map((image) => {
        let fileName = path.parse(image.name).name;
        if (parseInt(fileName) < 0 || isNaN(fileName)) {
          setDisable(false);
          return setError("image");
        }
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

  return (
    <>
      <MangaForm
        formName={"Here you can add chapters of your manga"}
        disable={disable}
        onSubmit={handleSubmit(onSubmit)}
        className={chapterUploadStyle.formStyle}
      >
        <Controller
          name="manga"
          control={control}
          rules={{
            required: true,
            validate: (v) => (v && v._id ? true : false),
          }}
          render={({ field }) => (
            <AutoComplete
              onChange={(value) => field.onChange(value)}
              onInput={handleSearch}
              id={"manga"}
              type={"text"}
              placeholder={"Manga Title..."}
              error={errors.manga ? true : false}
              validationText={"Please select manga"}
              lastIcon={{
                icon: <Icon name="downArrow" size={32} />,
                width: 32,
              }}
              options={results}
              accessedDataName={"title"}
              accessedValueName={"_id"}
            />
          )}
        />

        <Input
          {...register("chapter_title", {
            minLength: 5,
            maxLength: 100,
          })}
          type={"text"}
          placeholder={"Chapter title..."}
          validation={errors.chapter_title ? true : false}
          validationText={"Please type a valid name"}
          className={chapterUploadStyle.inputStyle}
        />
        <Input
          {...register("chapterNum", {
            required: true,
            validate: {
              postive: (v) => parseInt(v) >= 0,
              isInt: (v) => !isNaN(v),
            },
          })}
          type={"text"}
          placeholder={"Chapter number..."}
          validation={errors.chapterNum ? true : false}
          validationText={
            "Please type a valid  chapter number bigger  or equal zero"
          }
          className={chapterUploadStyle.inputStyle}
        />

        <InputUpload
          multiple={true}
          id={"image"}
          register={register}
          name={"image"}
          // validation={{ required: true }}
          fileName={"Upload chapter pages.."}
          errors={errors.image}
          validationText={"Please add a valid images"}
          accept="image/*"
          calssName={chapterUploadStyle.inputUploadStyle}
          lastIcon={<Icon name="downArrow" size={32} />}
        />
      </MangaForm>
    </>
  );
}
