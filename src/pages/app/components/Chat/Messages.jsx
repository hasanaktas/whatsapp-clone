import { Box, Typography, Avatar, ButtonBase } from "@mui/material";
import { formatRelative } from "date-fns";
import RemoveMessageDialog from "./RemoveMessageDialog";
import { tr } from "date-fns/locale";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
const Messages = (props) => {
  const { messages, account, otherUser, chatId } = props;
  const [selectedMessage, setSelectedMessage] = useState({
    id: null,
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {messages.map((message) => {
        const isMyMessage = account.uid === message.senderId;
        return (
          <ButtonBase
            key={message.id}
            sx={{
              bgcolor: isMyMessage ? "primary.main" : "secondary.main",
              alignSelf: isMyMessage ? "flex-end" : "flex-start",
              color: "#fff",
              p: 2,
              borderRadius: 1,
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              m: 2,
              minWidth: 250,
            }}
            onClick={() => {
              if (message.senderId === account.uid) {
                setSelectedMessage({
                  id: message.id,
                  ...message,
                });
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={isMyMessage ? account.photoURL : otherUser.photoURL}
                sx={{ mr: 1 }}
              />
              <Typography variant="caption">
                {isMyMessage ? account.displayName : otherUser.displayName}
              </Typography>
            </Box>
            <Typography>{message.content}</Typography>
            {message.time && (
              <Typography variant="caption" sx={{ alignSelf: "flex-end" }}>
                {formatRelative(message.time.toDate(), new Date(), {
                  locale: tr,
                })}
              </Typography>
            )}
          </ButtonBase>
        );
      })}

      <RemoveMessageDialog
        message={selectedMessage}
        open={Boolean(selectedMessage.id)}
        handleClose={() => {
          setSelectedMessage({
            id: null,
          });
        }}
        remove={async () => {
          setSelectedMessage({
            id: null,
          });
          await deleteDoc(
            doc(db, `chats/${chatId}/messages/${selectedMessage.id}`)
          );
        }}
      />
    </Box>
  );
};

export default Messages;
