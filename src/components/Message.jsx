import React from "react";
import { HStack, Text, Avatar } from "@chakra-ui/react";
import styles from "../styles.module.scss";

const Message = ({ text, uri, authUser }) => {
  return (
    <HStack
      className={styles.perMsg}
      borderRadius={"16px"}
      paddingY={"2"}
      paddingX={authUser === "me" ? "5" : "3"}
      alignSelf={authUser === "me" ? "flex-end" : "flex-start"}
    >
      {authUser === "other" && <Avatar size={"sm"} src={uri} />}

      <Text>{text}</Text>

      {authUser === "me" && <Avatar size={"sm"} src={uri} />}
    </HStack>
  );
};

export default Message;
