import React, { useMemo } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserList = (props) => {
  const { users, account, userId } = props;
  const navigate = useNavigate();

  const filteredUser = useMemo(() => {
    return users.filter((user) => user.id !== account.uid);
  }, [users, account]);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 300,
        bgcolor: "background.paper",
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {filteredUser.map((user) => {
        return (
          <ListItem key={user.id}>
            <ListItemButton
              onClick={() => navigate(`/app/${user.id}`)}
              selected={user.id === userId}
            >
              <ListItemAvatar>
                <Avatar alt={user.displayName} src={user.photoURL} />
              </ListItemAvatar>
              <ListItemText primary={user.displayName} secondary={user.email} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default UserList;
