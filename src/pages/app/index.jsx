import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Box } from "@mui/material";
import UserList from "./components/UserList";
import Chat from "./components/Chat";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";

const AppPage = (props) => {
  const { userId } = useParams();

  const { account } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    setUsers(users);
  };
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <UserList users={users} account={account} />
      {userId && users.length > 0 && (
        <Chat account={account} userId={userId} users={users} />
      )}
    </Box>
  );
};

export default AppPage;
