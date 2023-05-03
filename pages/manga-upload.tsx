import mangaUploadStyle from "../styles/mangaupload.module.css";
import React, { useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import MangaForm from "../components/Manga_form";
import Input from "../components/Input";
import AutoComplete from "../components/Auto_complete_input";
import Icon from "../components/Icon";
import InputUpload from "../components/Upload_input";
import Navbar from "../components/navbar/Navbar";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { autherType, categoryType, userType } from "../util/interfaces";
import { GetServerSidePropsContext, NextPage } from "next";
import userParser from "../util/userParser";
import Head from "next/head";

type Props = {
  user: userType;
};
const MangaUplouds: NextPage<Props> = ({ user }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [mangaData, setMangaData] = useState<{
    auther: autherType[];
    categories: categoryType[];
    date: string[];
    status: ["on going", "finished", "stopped"];
  }>({
    auther: [],
    categories: [],
    date: [],
    status: ["on going", "finished", "stopped"],
  });
  const [disable, setDisable] = useState(false);

  const [fileName, setFileName] = useState({
    image: "Choose a manga image..",
    banner: "Choose a banar image..",
  });

  const compare = (a: number, b: number) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const onSubmit = async (data) => {
    try {
      setDisable(true);
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("status", data.state);
      formData.append("date", data.date);
      data.auther.map((d) => {
        formData.append("auther", d._id);
      });
      data.category.map((d) => {
        formData.append("category", d._id);
      });
      formData.append("story", data.story);
      formData.append("image", data.image[0]);
      if (data.banner) formData.append("banner", data.banner[0]);
      await axios.post("http://localhost:8080/mangas/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setDisable(false);
    } catch (error) {
      setDisable(false);
      if (error.response.status == 401) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error("Unauthorized");
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        toast.error("sorry, unexpected error happened");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("sorry, unexpected error happened");
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      let authers = await (
        await axios.get("http://localhost:8080/authers/get-authers")
      ).data.sort((a, b) => compare(a.autherName, b.autherName));
      let categories = await (
        await axios.get("http://localhost:8080/category/get-cat/")
      ).data.sort((a, b) => compare(a.category, b.category));
      let date = [];
      for (let i = 1950; i <= new Date().getFullYear(); i++) {
        date.unshift(i.toString());
      }
      setMangaData({
        ...mangaData,
        date: date,
        categories: categories,
        auther: authers,
      });
    };
    getData().catch(console.error);
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Head>
        <title>MangaAR | Create Manga</title>
        <meta name="description" content="Manga Creation Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MangaForm
        formName={
          "Now you can add your favourite manga to make a new collection"
        }
        disable={disable}
        onSubmit={handleSubmit(onSubmit)}
        className={mangaUploadStyle.formStyle}
      >
        <Input
          {...register("title", {
            required: true,
            minLength: 5,
            maxLength: 100,
          })}
          type={"text"}
          placeholder={"Manga Title..."}
          validation={errors.title ? true : false}
          validationText={"Please type a valid title"}
          className={mangaUploadStyle.inputStyle}
        />
        <Controller
          name={"auther"}
          control={control}
          rules={{ validate: (value) => value?.length > 0 }}
          render={({ field }) => (
            <AutoComplete
              multiple={true}
              onChange={(value) => field.onChange(value)}
              id={"auther"}
              type={"text"}
              placeholder={"Manga Autors..."}
              error={errors.auther ? true : false}
              validationText={"Please select author"}
              options={mangaData.auther}
              filterOptions={setMangaData}
              accessedDataName={"autherName"}
              accessedValueName={"_id"}
            />
          )}
        />
        <Controller
          name={"category"}
          control={control}
          rules={{ validate: (value) => value?.length > 0 }}
          render={({ field }) => (
            <AutoComplete
              multiple={true}
              onChange={(value) => field.onChange(value)}
              type={"text"}
              id={"categories"}
              placeholder={"Category..."}
              error={errors.category ? true : false}
              validationText={"Please select category"}
              lastIcon={{
                icon: <Icon name="downArrow" size={32} />,
                width: 32,
              }}
              options={mangaData.categories}
              filterOptions={setMangaData}
              accessedDataName={"category"}
              accessedValueName={"_id"}
            />
          )}
        />

        <Controller
          name={"date"}
          control={control}
          rules={{ validate: (value) => value?.length > 0 }}
          render={({ field }) => (
            <AutoComplete
              onChange={(value) => field.onChange(value)}
              type={"text"}
              id={"date"}
              placeholder={"Date..."}
              error={errors.date ? true : false}
              validationText={"Please select date"}
              lastIcon={{
                icon: <Icon name="downArrow" size={32} />,
                width: 32,
              }}
              options={mangaData.date}
            />
          )}
        />

        <Controller
          name={"state"}
          control={control}
          rules={{ validate: (value) => value?.length > 0 }}
          render={({ field }) => (
            <AutoComplete
              onChange={(value) => field.onChange(value)}
              type={"text"}
              id={"status"}
              placeholder={"State..."}
              error={errors.state ? true : false}
              validationText={"Please select state"}
              lastIcon={{
                icon: <Icon name="downArrow" size={32} />,
                width: 32,
              }}
              options={mangaData.status}
            />
          )}
        />

        <InputUpload
          id={"image"}
          register={register}
          name={"image"}
          validation={{ required: true }}
          fileName={fileName.image}
          errors={{ required: !!errors.image }}
          validationText={"Please add a valid Image"}
          accept="image/*"
          calssName={mangaUploadStyle.inputUploadStyle}
          lastIcon={<Icon name="downArrow" size={32} />}
        />

        <InputUpload
          id={"banner"}
          register={register}
          name={"banner"}
          fileName={fileName.banner}
          errors={{ required: !!errors.banner }}
          validationText={"Please add a valid Image"}
          accept="image/*"
          calssName={mangaUploadStyle.inputUploadStyle}
          lastIcon={<Icon name="downArrow" size={32} />}
        />
        <Input
          {...register("story", {
            required: true,
            minLength: 10,
            maxLength: 1000,
          })}
          type={"text"}
          placeholder={"Story..."}
          validation={errors.story ? true : false}
          validationText={"Please type a valid story"}
          className={mangaUploadStyle.inputStyle}
          style={{ height: "105px !important" }}
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

export default MangaUplouds;
