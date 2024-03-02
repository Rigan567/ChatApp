// import "./App.scss";
import {
  Box,
  Container,
  VStack,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import Message from "./components/Message";
import styles from "./styles.module.scss";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
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
import { app } from "./firebase";
import { useEffect, useState, useRef } from "react";

const auth = getAuth(app); //for authentication
const db = getFirestore(app); //for database
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
const logOutHandler = () => {
  signOut(auth);
};

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const forScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      forScroll.current.scrollIntoView({ behavior: "smooth" }); //for auto scrolling w every text
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
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
      {user ? (
        <Container
          h={"100vh"}
          bg={"white"}
          border={"1px solid black"}
          className={styles.secondDiv}
        >
          <VStack h="full" paddingY={"4"} className={styles.thirdDiv}>
            //its a div with flex direction column
            <Button
              colorScheme="red"
              w={"full"}
              size="md"
              onClick={logOutHandler}
            >
              Logout
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
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.uri}
                />
              ))}
              <div ref={forScroll}></div>
            </VStack>
            <form
              onSubmit={submitHandler}
              style={{ width: "95%", zIndex: 999 }}
            >
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
        <VStack
          h={"100vh"}
          justifyContent={"center"}
          className={styles.signinbg}
        >
          <Button
            transition={"all 1s"}
            className={styles.customButton}
            borderRadius="18px"
            onClick={loginHandler}
          >
            Sign in with Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
