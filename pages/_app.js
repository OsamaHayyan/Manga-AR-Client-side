import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const cookies = new Cookies();
  const [checkLogin, setLogin] = useState(
    cookies.get("logged_in") === "true" ? true : false
  );
  return (
    <>
      <Navbar checkLogin={checkLogin} handleLoginState={setLogin} />
      <Component handleLoginState={setLogin} {...pageProps} />
    </>
  );
}

export default MyApp;
