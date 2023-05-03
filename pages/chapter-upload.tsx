import React, { useState } from "react";
import chapterUploadStyle from "../styles/mangaupload.module.css";
import path from "path";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import LazyLoading from "../util/lazyloading";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import AutoComplete from "../components/Auto_complete_input";
import Input from "../components/Input";
import MangaForm from "../components/Manga_form";
import Icon from "../components/Icon";
import InputUpload from "../components/Upload_input";
import { searchMangaType, userType } from "../util/interfaces";
import Navbar from "../components/navbar/Navbar";
import { GetServerSidePropsContext, NextPage } from "next";
import userParser from "../util/userParser";
import Head from "next/head";

type Props = {
  user: userType;
};
const ChapterUpload: NextPage<Props> = ({ user }) => {
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
  const handleSearch: React.FormEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();
    //new sorting way
    let collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });

    const input = e.currentTarget.value;
    if (input.length < 3) return;

    await lazySearch(async () => {
      try {
        const { data: result }: { data: searchMangaType[] } = await axios.post(
          "http://localhost:8080/mangas/search-manga/",
          {
            query: input,
          }
        );
        result.sort((a, b) => collator.compare(a.title, b.title));
        setLoading(false);
        setResults(result);
      } catch (error) {
        console.log(error);

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
        if (parseInt(fileName) < 0 || isNaN(Number(fileName))) {
          setDisable(false);
          return setError("image", { message: "Please add a valid images" });
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
      <Navbar user={user} />
      <Head>
        <title>MangaAR | Chapter Creation</title>
        <meta name="description" content="Chapter creation Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          errors={{ other: !!errors.image }}
          validationText={"Please add a valid images"}
          accept="image/*"
          calssName={chapterUploadStyle.inputUploadStyle}
          lastIcon={<Icon name="downArrow" size={32} />}
        />
      </MangaForm>
    </>
  );
};

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const user = userParser(req.cookies);
  return {
    props: { user }, // will be passed to the page component as props
  };
}

export default ChapterUpload;
