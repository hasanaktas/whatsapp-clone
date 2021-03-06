import { Box } from "@mui/material";
import { useEffect, useMemo, useState, useRef } from "react";
import Input from "./Input";
import Messages from "./Messages";
import {
  collection,
  query,
  addDoc,
  setDoc,
  onSnapshot,
  getDoc,
  serverTimestamp,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";
const Chat = (props) => {
  const scrollRef = useRef();
  const { account, userId, users } = props;
  const [messages, setMessages] = useState([]);
  const chatId = useMemo(() => {
    const order = userId.localeCompare(account.uid);

    return order === 1
      ? `${account.uid}-${userId}`
      : `${userId}-${account.uid}`;
  }, [account, userId]);

  const otherUser = useMemo(() => {
    return users.find((user) => user.id === userId);
  }, [users, userId]);

  useEffect(() => {
    createDoc(chatId);
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("time", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const createDoc = async (chatId) => {
    const docRef = doc(db, "chats", chatId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    } else {
      await setDoc(doc(db, `chats`, chatId), {
        users: [account.uid, userId],
      });
    }
  };
  const sendMessage = async (message, setMessage) => {
    await addDoc(collection(db, `chats/${chatId}/messages`), {
      content: message,
      senderId: account.uid,
      time: serverTimestamp(),
    });
    setMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Messages
          chatId={chatId}
          messages={messages}
          account={account}
          otherUser={otherUser}
        />
        <div ref={scrollRef} />
      </Box>
      <Input onClick={sendMessage} />
    </Box>
  );
};

export default Chat;
