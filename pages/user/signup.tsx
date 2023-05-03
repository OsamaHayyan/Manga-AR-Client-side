import React, { Dispatch, SetStateAction } from "react";
import RegisterLayout from "../../components/user/RegisterLayout";
import SignupComponent from "../../components/user/Signup";
import Navbar from "../../components/navbar/Navbar";
import Head from "next/head";

type Props = {
  handleLoginState: Dispatch<SetStateAction<boolean>>;
};
function Login({ handleLoginState }) {
  return (
    <>
      <Navbar user={null} />
      <Head>
        <title>MangaAR | Signup</title>
        <meta name="description" content="Signup Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegisterLayout>
        <SignupComponent />
      </RegisterLayout>
    </>
  );
}

export default Login;
