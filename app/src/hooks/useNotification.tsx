import { AlertTitle, Snackbar } from "@mui/material";
import { Context, createContext, forwardRef, ReactNode, useContext, useState } from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

interface NotificationParams {
  message: string;
  type: AlertColor;
}

interface NotificationContext {
  showNotification: (options: NotificationParams) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  notificationMessage: string;
  type: AlertColor;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationContext: Context<NotificationContext> = createContext<NotificationContext>({
  showNotification: () => void 0,
  open: false,
  setOpen: () => void 0,
  notificationMessage: "",
  type: "success",
})

function useProvideNotification(): NotificationContext {
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [type, setType] = useState<AlertColor>("success");

  const showNotification = (options: NotificationParams) => {
    setNotificationMessage(options.message);
    setType(options.type);
    setOpen(true);
  };

  return { showNotification, open, setOpen, notificationMessage, type };
}

const icons = {
  success: <CheckCircleIcon color={"success"} />,
  error: <ErrorIcon color={"error"} />,
  info: <InfoIcon color={"info"} />,
  warning: <WarningIcon color={"warning"} />,
};


export function NotificationProvider(props: { children: ReactNode }): JSX.Element {
  const provider = useProvideNotification();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    provider.setOpen(false);
  };

  const successNotification = (
    <Snackbar
      open={provider.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        icon={icons[provider.type]}
        severity={provider.type}
        sx={{ width: "100%" }}
      >
        <AlertTitle sx={{ textTransform: "capitalize" }}>{provider.type}</AlertTitle>
        {provider.notificationMessage}

      </Alert>
    </Snackbar>
  );

  return (

    <NotificationContext.Provider value={provider}>
      <>
        {props.children}
        {successNotification}
      </>
    </NotificationContext.Provider>
  );
}

export const useNotification = (): NotificationContext => useContext(NotificationContext);

