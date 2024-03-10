import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Input } from "@chakra-ui/react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      </form>
      {error && <h2>{error.message}</h2>}
    </div>
  );
};

export default Signin;
