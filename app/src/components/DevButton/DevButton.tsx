import { Button } from "@mui/material";
import { DevButtonComponent } from "./style";
import { useState } from "react";
import { isDevEnvironment, redirectToSignInPage } from "../../utils/url.utils";
import { functions } from "../../services/firebase";
import { httpsCallable } from "firebase/functions";
import { Loader } from "../index";
import {
  DeleteDatabaseResponce,
  GenerateDataBaseResponce,
} from "../../../../functions/src/callable/devTools";
import { useAuth } from "../../hooks/useAuth";

const resetDatabase = httpsCallable<unknown, DeleteDatabaseResponce>(
  functions,
  "devTool-deleteDatabase"
);

const generateDatabaseFunction = httpsCallable<unknown, GenerateDataBaseResponce>(
  functions,
  "devTool-generateDatabase"
);

export function DevButton() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isDevEnvironment) {
    return <></>;
  }

  const domain = "example";
  const password = "paSSword!!";

  const loadingComponent = (
    <div
      style={{
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
      <Loader />
    </div>
  );

  const deleteDatabase = async () => {
    setError("");
    setLoading(true);
    try {
      const resultOfRequest = await resetDatabase();
      logout();
      const { error } = resultOfRequest.data;
      if (error) {
        setError(error);
      }
    } catch (e) {
      setError(JSON.stringify(e));
    }
    setLoading(false);
  };

  const generateUsers = async () => {
    setError("");
    setLoading(true);
    try {
      const resultOfRequest = await generateDatabaseFunction({ domain, password });
      const { error } = resultOfRequest.data;

      if (error) {
        setError(error);
      }
    } catch (e) {
      setError(JSON.stringify(e));
    }
    setLoading(false);
  };

  const signAsUser = async () => {
    if (user) {
      logout();
    }
    redirectToSignInPage(
      { domain, password, email: `user@${domain}.com` },
      { forceRedirect: true }
    );
  };

  const signAsAdmin = async () => {
    if (user) {
      logout();
    }
    redirectToSignInPage(
      { domain, password, email: `admin@${domain}.com` },
      { forceRedirect: true }
    );
  };

  return (
    <DevButtonComponent>
      <span>DEV</span>
      <div className="dev-controls">
        {loading && loadingComponent}

        <Button onClick={() => signAsUser()} variant="contained">
          SingIn (user)
        </Button>

        <Button onClick={() => signAsAdmin()} variant="contained">
          SingIn (admin)
        </Button>

        <Button onClick={() => deleteDatabase()} variant="contained">
          Delete DB
        </Button>

        <Button onClick={() => generateUsers()} variant="contained">
          Generate test users
        </Button>

        <p>{error ? "Error: " + error : ""}</p>
      </div>
    </DevButtonComponent>
  );
}
