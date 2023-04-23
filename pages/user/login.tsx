import React, { Dispatch, SetStateAction } from "react";
import RegisterLayout from "../../components/user/RegisterLayout";
import LoginComponent from "../../components/user/Login";

type Props = {
  handleLoginState: Dispatch<SetStateAction<boolean>>;
};
function Login({ handleLoginState }) {
  return (
    <RegisterLayout>
      <LoginComponent handleLoginState={handleLoginState} />
    </RegisterLayout>
  );
}

export default Login;
