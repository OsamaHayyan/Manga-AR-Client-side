import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/navbar";

export default function Layout({ children, checkLogin, setLogin }) {
  return (
    <>
      <Navbar checkLogin={checkLogin} handleLoginState={setLogin} />
      <main>{children}</main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
