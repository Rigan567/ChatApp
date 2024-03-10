import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./signinsignup.scss";
import { Button, Input } from "@chakra-ui/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="signupcontainer">
      <h2>Hey Sign UP</h2>
      <form onSubmit={submitHandler}>
        <Input
          className="signup-Input"
          variant={"flashed"}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          variant={"flashed"}
          color={"white"}
          type="password"
          placeholder="Enter Pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>

        <Button
          type="submit"
          className="signUpBtn"
          w={"150px"}
          alignSelf={"center"}
          colorScheme="facebook"
        >
          Sign UP Buddy
        </Button>
        {error && <h2>{error.message}</h2>}
      </form>
      <Link to="/signin">
        <Button size={"xs"} marginLeft={3}>
          Already Have an Account? SignIn
        </Button>
      </Link>
    </div>
  );
};

export default Signup;
