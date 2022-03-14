import Button from "@mui/material/Button";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputBase,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import { auth, signInByGoogle } from "../../services/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState } from "react";
import { Header } from "../../components";
import background from "../../assets/images/background.png";
import { useLocation } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

export function AuthPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Sign In Process");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, , loadingLogin, errorLogin] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, , loadingCreate, errorCreate] =
    useCreateUserWithEmailAndPassword(auth);

  const loading = loadingLogin || loadingCreate;

  if (loading) {
    return <p>Loading...</p>;
  }
  const googleSignIn = async () => {
    signInByGoogle();
  };

  const signIn = () => {
    signInWithEmailAndPassword(email, password);
    setType("Sign In Process");
  };

  const signUp = () => {
    createUserWithEmailAndPassword(email, password);
    setType("Sign Up Process");
  };
  let errorMessage = "";
  if (type === "Sign In Process") {
    errorMessage = errorLogin?.message || "";
  } else {
    errorMessage = errorCreate?.message || "";
  }

  errorMessage = errorMessage.replace("Firebase: Error (auth/", "");
  errorMessage = errorMessage.replace(").", "");
  errorMessage = errorMessage.replace("Firebase: ", "");
  errorMessage = errorMessage.split("-").join(" ");

  const location = useLocation();
  const pathname = location.pathname;
  const signUpUrl = "/create-account";
  const signInUrl = "/signin";
  const isSignUpPage = pathname === signUpUrl;
  const isSignInPage = pathname !== signUpUrl;

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />

      <Box
        sx={{
          background: "linear-gradient(145deg, rgba(38,122,211,1) 0%, rgba(57,164,192,1) 100%)",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          maxWidth="sm"
          sx={{
            borderRadius: "7px",
            minWidth: "300px",
            padding: "2.9rem 5rem 1rem 5rem",
            display: "flex",
            boxShadow: "var(--shadow-xl)",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "var(--color-neutral-1)",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: "center",
              }}
            >
              {`${isSignInPage ? "Sign In" : "Sign Up"}`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="simple-input">
                Email adress
              </InputLabel>
              <InputBase
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email"
                id="email"
              />
            </FormControl>

            <FormControl variant="standard">
              <InputLabel shrink htmlFor="simple-input">
                Password
              </InputLabel>
              <InputBase
                value={password}
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
            </FormControl>

            {isSignInPage && (
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            )}

            <FormControlLabel
              checked
              control={<Checkbox name="rememberMe" />}
              label="Remember me "
            />

            {isSignInPage && (
              <Button variant="contained" onClick={signIn} sx={{ marginTop: "1rem" }}>
                Sign In
              </Button>
            )}
            {isSignInPage && (
              <p>
                New user?{" "}
                <Link href={signUpUrl} variant="body2">
                  Create test account
                </Link>
              </p>
            )}

            {isSignUpPage && (
              <Button variant="contained" onClick={signUp} sx={{ marginTop: "1rem" }}>
                Sign Up
              </Button>
            )}
            {isSignUpPage && (
              <p>
                Already have account?{" "}
                <Link href={signInUrl} variant="body2">
                  Sign In
                </Link>
              </p>
            )}

            <p
              onClick={googleSignIn}
              style={{
                gap: "0.5rem",
                display: "flex",

                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <GoogleIcon />
              <span>Sign in using Google</span>
            </p>
          </Box>

          <div>
            {errorMessage && (
              <p>
                Error in {type}: {errorMessage}
              </p>
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
