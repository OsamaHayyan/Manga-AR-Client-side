import React, { Dispatch, SetStateAction } from "react";
import RegisterLayout from "../../components/user/RegisterLayout";
import SignupComponent from "../../components/user/Signup";

type Props = {
  handleLoginState: Dispatch<SetStateAction<boolean>>;
};
function Login({ handleLoginState }) {
  return (
    <RegisterLayout>
      <SignupComponent />
    </RegisterLayout>
  );
}

export default Login;
