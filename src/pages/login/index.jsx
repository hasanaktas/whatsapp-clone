import { Google as GoogleIcon } from "@mui/icons-material";
import { Button, Container, Typography, Box } from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";

const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h6">Whatsapp Clone Project</Typography>
        <Button
          startIcon={<GoogleIcon />}
          color="error"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={login}
        >
          GİRİŞ YAP
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
