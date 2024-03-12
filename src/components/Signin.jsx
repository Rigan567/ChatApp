import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmail(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="signincontainer">
      <h2>Hey welcome </h2>
      <form onSubmit={submitHandler} className="signinForm">
        <Input
          variant={"flashed"}
          // color={"white"}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          variant={"flashed"}
          // color={"white"}
          type="password"
          placeholder="Enter Pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button
          type="submit"
          className="signInBtn"
          alignSelf={"center"}
          colorScheme="telegram"
        >
          Login
        </Button>
        {error && <h2>{error.message}</h2>}
      </form>
      <Button colorScheme="green" size={"xs"} onClick={handleForgotPassword}>
        Forgot Password
      </Button>
      {resetEmail && (
        <p style={{ color: "white" }}>
          Password reset email Sent to {`${email}`}{" "}
        </p>
      )}
      <Link to={"/signup"}>
        <h3 style={{ color: "white" }}>Don't Have an Account? Sign Up</h3>
      </Link>
    </div>
  );
};

export default Signin;
