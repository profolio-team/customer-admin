import { Box } from "@mui/material";
import background from "../../assets/images/background.png";
import { ReactNode } from "react";

export function AuthPage({ formComponent }: { formComponent: ReactNode }): JSX.Element {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        overflow: "hidden",
      }}
    >
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
