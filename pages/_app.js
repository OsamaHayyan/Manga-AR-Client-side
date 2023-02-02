import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import App from "next/app";
import "../styles/globals.css";
import Layout from "../components/layout";

function MyApp({ Component, pageProps, request }) {
  const [checkLogin, setLogin] = useState(request);

  return (
    <Layout checkLogin={checkLogin} setLogin={setLogin}>
      <Component handleLoginState={setLogin} {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  //getInitialProps runs on both server-side and client-side.
  //For that reason you need to add a check before accessing things in appContext.ctx.req, as req will not be defined on the client.
  const req = (await appContext.ctx.req?.cookies["access_token"])
    ? true
    : false;
  return { ...appProps, request: req };
};

export default MyApp;
