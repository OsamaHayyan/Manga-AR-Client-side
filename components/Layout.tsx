import { useRouter } from "next/dist/client/router";
import { ToastContainer } from "react-toastify";
import { Poppins } from "@next/font/google";
import Navbar from "./navbar/navbar";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

type Props = PropsWithChildren<{
  checkLogin: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
}>;
export default function Layout({ children, checkLogin, setLogin }: Props) {
  const { pathname } = useRouter();
  return (
    <>
      {pathname && pathname != "/search" ? (
        <Navbar checkLogin={checkLogin} handleLoginState={setLogin} />
      ) : null}
      <main className={poppins.className}>{children}</main>
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
