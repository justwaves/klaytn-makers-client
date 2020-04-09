import React from "react";
import AuthTemplate from "components/auth/AuthTemplate";
import SignupForm from "components/auth/SignupFormContainer";

export default () => {
  return (
    <AuthTemplate>
      <SignupForm />
    </AuthTemplate>
  );
};
