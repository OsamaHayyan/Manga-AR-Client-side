import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const cookies = new Cookies();
  const [checkLogin, setLogin] = useState(
    cookies.get("logged_in") === "true" ? true : false
  );
  return (
    <>
      <Navbar checkLogin={checkLogin} handleLoginState={setLogin} />
      <Component handleLoginState={setLogin} {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
