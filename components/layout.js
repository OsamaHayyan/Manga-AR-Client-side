import { useRouter } from "next/dist/client/router";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/navbar";

export default function Layout({ children, checkLogin, setLogin }) {
  const { pathname } = useRouter();
  return (
    <>
      {pathname && pathname != "/search" ? (
        <Navbar checkLogin={checkLogin} handleLoginState={setLogin} />
      ) : null}
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
