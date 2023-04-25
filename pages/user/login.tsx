import React, { Dispatch, SetStateAction } from "react";
import RegisterLayout from "../../components/user/RegisterLayout";
import LoginComponent from "../../components/user/Login";
import Navbar from "../../components/navbar/Navbar";

type Props = {
  handleLoginState: Dispatch<SetStateAction<boolean>>;
};
function Login({ handleLoginState }) {
  return (
    <>
      <Navbar />
      <RegisterLayout>
        <LoginComponent handleLoginState={handleLoginState} />
      </RegisterLayout>
    </>
  );
}

export default Login;
