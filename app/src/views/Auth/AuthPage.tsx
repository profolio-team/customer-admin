import { Box } from "@mui/material";
import background from "../../assets/images/background.png";
import { useLocation } from "react-router-dom";
import { SignInForm } from "./Forms/SignIn";
import { SignUpForm } from "./Forms/SignUp";
import { RestoreForm } from "./Forms/Restore";
import { Header } from "../../components";

export function AuthPage(): JSX.Element {
  const viewForms: Record<string, JSX.Element> = {
    "/sign-in": <SignInForm />,
    "/sign-up": <SignUpForm />,
    "/restore-password": <RestoreForm />,
  };

  const location = useLocation();
  const pathname = location.pathname;
  const formComponent = viewForms[pathname] || viewForms["/sign-in"];

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
            padding: "2.9rem 5rem",
            display: "flex",
            boxShadow: "var(--shadow-xl)",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "var(--color-neutral-1)",
          }}
        >
          {formComponent}
        </Box>
      </Box>
    </Box>
  );
}
