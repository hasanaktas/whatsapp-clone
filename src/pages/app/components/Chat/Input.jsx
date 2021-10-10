import React, { useState } from "react";
import { Box, InputBase, Divider, IconButton } from "@mui/material";

import { Send as SendIcon } from "@mui/icons-material";

const Input = (props) => {
  const { onClick } = props;
  const [message, setMessage] = useState("");
  return (
    <Box
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <InputBase
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Bir mesaj yaz"
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={() => onClick(message, setMessage)}
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default Input;
