import React, { useState } from "react";
import SignUp from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SignIn";

const AuthPage = () => {
  const [signUp, setSignUp] = useState(true);
  return (
    <div>
      {signUp ? (
        <SignUp setSignUp={setSignUp} />
      ) : (
        <SignIn setSignUp={setSignUp} />
      )}
    </div>
  );
};

export default AuthPage;
