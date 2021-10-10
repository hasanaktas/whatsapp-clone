import { CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { routes } from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./utils/firebase";
import { useEffect, useState } from "react";
import SplashPage from "./pages/splash";
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAndCreateUser(user);
      } else {
        setAccount(null);
        setInitializing(false);
      }
    });
  }, []);

  const checkAndCreateUser = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAccount(user);
      setInitializing(false);
    } else {
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      setAccount(user);
      setInitializing(false);
    }
  };

  const content = useRoutes(routes(account));
  return (
    <>
      <CssBaseline />
      {initializing ? <SplashPage /> : content}
    </>
  );
};

export default App;
