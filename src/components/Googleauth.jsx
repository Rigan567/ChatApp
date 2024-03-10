import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "@chakra-ui/react";

const Googleauth = () => {
  const signinGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <Button onClick={signinGoogle}>Sign in with Google</Button>
    </div>
  );
};

export default Googleauth;
