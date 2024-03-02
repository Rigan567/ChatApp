import React from "react";
import { HStack, Text, Avatar } from "@chakra-ui/react";
import styles from "../styles.module.scss";

const Message = ({ text, uri, user }) => {
  return (
    <HStack
      className={styles.perMsg}
      borderRadius={"16px"}
      paddingY={"2"}
      paddingX={user === "me" ? "5" : "3"}
      alignSelf={user === "me" ? "flex-end" : "flex-start"}
    >
      {user === "other" && <Avatar size={"sm"} src={uri} />}
      <Text>{text}</Text>

      {user === "me" && <Avatar size={"sm"} src={uri} />}
    </HStack>
  );
};

export default Message;
