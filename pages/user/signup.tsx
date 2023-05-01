import React, { Dispatch, SetStateAction } from "react";
import RegisterLayout from "../../components/user/RegisterLayout";
import SignupComponent from "../../components/user/Signup";
import Navbar from "../../components/navbar/Navbar";

type Props = {
  handleLoginState: Dispatch<SetStateAction<boolean>>;
};
function Login({ handleLoginState }) {
  return (
    <>
      <Navbar user={null} />
      <RegisterLayout>
        <SignupComponent />
      </RegisterLayout>
    </>
  );
}

export default Login;
