import React, { Dispatch, SetStateAction } from "react";
import RegisterLayout from "../../components/user/RegisterLayout";
import LoginComponent from "../../components/user/Login";
import Navbar from "../../components/navbar/Navbar";
import Head from "next/head";

type Props = {};
function Login({}: Props) {
  return (
    <>
      <Navbar user={null} />
      <Head>
        <title>MangaAR | Login</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegisterLayout>
        <LoginComponent />
      </RegisterLayout>
    </>
  );
}

export default Login;
