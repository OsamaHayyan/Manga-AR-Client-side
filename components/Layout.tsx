import { ToastContainer } from "react-toastify";
import { Poppins } from "@next/font/google";
import { PropsWithChildren, SetStateAction } from "react";
import Footer from "./footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

type Props = PropsWithChildren<{}>;
export default function Layout({ children }: Props) {
  return (
    <>
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
      <Footer />
    </>
  );
}
