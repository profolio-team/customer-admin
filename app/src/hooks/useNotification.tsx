import { Alert, Snackbar } from "@mui/material";
import { signOut } from "firebase/auth";
import { Context, createContext, ReactNode, useContext, useState } from "react";

interface NotificationParams {
  message: string;
  type: string;
}

interface NotificationContext {
  showNotification: (options: NotificationParams) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  errorMessage: string;
}

const notificationContext: Context<NotificationContext> = createContext<NotificationContext>({
  showNotification: (options) => void 0,
  open: false,
  setOpen: (open: boolean) => void 0,
  errorMessage: "",
});

function useProvideNotification(): NotificationContext {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [WarningMessage, setErrorMessage] = useState("");

  const showNotification = (options: NotificationParams) => {
    setErrorMessage(options.message);
    setOpen(true);
  };

  return { showNotification, open, setOpen, errorMessage };
}

export function NotificationProvider(props: { children: ReactNode }): JSX.Element {
  const provider = useProvideNotification();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    provider.setOpen(false);
  };

  const exampleOfNotification = (
    <Snackbar open={provider.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {provider.errorMessage}
      </Alert>
    </Snackbar>
  );

  const warningOfNotification = (
    <Snackbar open={provider.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {provider.errorMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <notificationContext.Provider value={provider}>
      <>
        {props.children}
        {exampleOfNotification}
        {warningOfNotification}
      </>
    </notificationContext.Provider>
  );
}

export const useNotification = (): NotificationContext => useContext(notificationContext);
