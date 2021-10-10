import { Box, Typography, Avatar } from "@mui/material";

const Messages = (props) => {
  const { messages, account, otherUser } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {messages.map((message) => {
        const isMyMessage = account.uid === message.senderId;
        return (
          <Box
            key={message.id}
            sx={{
              bgcolor: isMyMessage ? "primary.main" : "secondary.main",
              alignSelf: isMyMessage ? "flex-start" : "flex-end",
              color: "#fff",
              p: 2,
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              m: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={isMyMessage ? account.photoURL : otherUser.photoUrl}
                sx={{ mr: 1 }}
              />
              <Typography variant="caption">
                {isMyMessage ? account.displayName : otherUser.displayName}
              </Typography>
            </Box>
            <Typography>{message.content}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
