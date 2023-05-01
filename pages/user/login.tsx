import React, { Dispatch, SetStateAction } from "react";
import RegisterLayout from "../../components/user/RegisterLayout";
import LoginComponent from "../../components/user/Login";
import Navbar from "../../components/navbar/Navbar";

type Props = {};
function Login({}: Props) {
  return (
    <>
      <Navbar user={null} />
      <RegisterLayout>
        <LoginComponent />
      </RegisterLayout>
    </>
  );
}

export default Login;
