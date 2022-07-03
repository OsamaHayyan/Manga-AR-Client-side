import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import App from "next/app";
import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import Layout from "../components/layout";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps, request }) {
  console.log(request);
  const [checkLogin, setLogin] = useState(request);
  return (
    <>
      <Navbar checkLogin={checkLogin} handleLoginState={setLogin} />
      <Component handleLoginState={setLogin} {...pageProps} />
      <ToastContainer />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  //getInitialProps runs on both server-side and client-side.
  //For that reason you need to add a check before accessing things in appContext.ctx.req, as req will not be defined on the client.
  const req =
    (await appContext.ctx.req?.cookies["logged_in"]) === "true" ? true : false;
  return { ...appProps, request: req };
};

export default MyApp;
