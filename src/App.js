// import "./App.scss";

import {
  Box,
  Container,
  VStack,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { SiGmail } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Message from "./components/Message";
import Signin from "./components/Signin";
import { Signup } from "./components/Signup";

import styles from "./styles.module.scss";
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, app } from "./firebase";
import { useEffect, useState, useRef } from "react";

const db = getFirestore(app); //for database

const signinGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logOutHandler = () => {
  signOut(auth).catch((error) => {
    console.log(error);
  });
};
const removeAcc = () => {
  deleteUser(auth.currentUser);
};

function App() {
  const [authUser, setAuthUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const forScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: authUser.uid,
        uri: authUser.photoURL,
        createdAt: serverTimestamp(),
        mail: authUser.email,
      });
      forScroll.current.scrollIntoView({ behavior: "smooth" }); //for auto scrolling w every text
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    const unsubscribeForMessages = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });
    return () => {
      unsubscribe();
      unsubscribeForMessages();
    };
  }, []);

  return (
    <Box className={styles.firstDiv}>
      {authUser ? (
        <Container h={"100vh"} bg={"white"} className={styles.secondDiv}>
          <VStack h="full" paddingY={"4"} className={styles.thirdDiv}>
            //its a div with flex direction column
            <Button
              colorScheme="red"
              w={"400px"}
              size="md"
              leftIcon={<RiLogoutBoxLine />}
              onClick={logOutHandler}
            >
              Logout
            </Button>
            <Button
              colorScheme="teal"
              w={"150px"}
              size="sm"
              leftIcon={<IoPersonRemoveSharp />}
              onClick={removeAcc}
            >
              Remove Account
            </Button>
            <VStack
              h={"full"}
              w={"full"}
              overflowY={"auto"}
              className="message_div"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {messages.map((item) => (
                <>
                  <Message
                    key={item.id}
                    authUser={item.uid === authUser.uid ? "me" : "other"}
                    text={item.text}
                    uri={item.uri}
                  />
                </>
              ))}
              <div ref={forScroll}></div>
            </VStack>
            <form onSubmit={submitHandler} style={{ width: "95%" }}>
              <HStack>
                ////its a div with flex direction row
                <Input
                  colorScheme="white"
                  color={"white"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  borderRadius={"20px"}
                  placeholder="Enter Your Text Here ... "
                />
                <Button colorScheme="purple" type="submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack h={"100vh"} justifyContent={"center"}>
          <Router>
            <Routes>
              <Route
                path="/signin"
                element={<Signin setAuthUser={setAuthUser} />}
              />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <HStack
              gap={5}
              justifyContent={"center"}
              alignSelf={"center"}
              wrap={"wrap"}
            >
              <Link to="/signin">
                <Button
                  leftIcon={<FaSignInAlt />}
                  colorScheme="whiteAlpha"
                  color={"black"}
                  variant={"solid"}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  leftIcon={<FaUserAlt />}
                  colorScheme="whiteAlpha"
                  color={"black"}
                >
                  Sign Up
                </Button>
              </Link>

              <Button
                leftIcon={<SiGmail />}
                colorScheme="whiteAlpha"
                color={"black"}
                onClick={signinGoogle}
              >
                Sign in with Google
              </Button>
            </HStack>
          </Router>
        </VStack>
      )}
    </Box>
  );
}

export default App;
