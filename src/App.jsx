import { CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { routes } from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useEffect, useState } from "react";
import SplashPage from "./pages/splash";
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccount(user);
        setInitializing(false);
        console.log("user var");
      } else {
        setAccount(null);
        setInitializing(false);
        console.log("user yok");
      }
    });
  }, []);

  const content = useRoutes(routes(account));
  return (
    <>
      <CssBaseline />
      {initializing ? <SplashPage /> : content}
    </>
  );
};

export default App;
