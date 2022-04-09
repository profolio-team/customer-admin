import CircularProgress from "@mui/material/CircularProgress";
import { Button, Container } from "@mui/material";
import { DevButtonComponent } from "./style";
import { useState } from "react";
import { isDevEnvironment } from "../../utils/url.utils";

export function DevButton() {
  const [loading, setLoading] = useState(false);

  if (!isDevEnvironment) {
    return <></>;
  }

  const loadingComponent = (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      <CircularProgress />
    </Container>
  );

  return (
    <DevButtonComponent>
      <span>DEV</span>
      <div className="dev-controls">
        {loading && loadingComponent}
        <Button onClick={() => setLoading(true)} variant="contained">
          SingIn (user)
        </Button>
        <Button variant="contained">SingIn (admin)</Button>

        <Button variant="contained">Reset</Button>
        <Button variant="contained">Generate test users</Button>
      </div>
    </DevButtonComponent>
  );
}
