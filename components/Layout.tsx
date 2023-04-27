import { useRouter } from "next/dist/client/router";
import { ToastContainer } from "react-toastify";
import { Poppins } from "@next/font/google";
import Navbar from "./navbar/Navbar";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

type Props = PropsWithChildren<{}>;
export default function Layout({ children }: Props) {
  return (
    <main className={poppins.className}>
      {children}
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
    </main>
  );
}
