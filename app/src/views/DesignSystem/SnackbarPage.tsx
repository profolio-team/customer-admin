// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
// import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import { forwardRef, useState } from "react";
// import { AlertTitle } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ErrorIcon from "@mui/icons-material/Error";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
//   return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
// });
// export interface State extends SnackbarOrigin {
//   open: boolean;
// }
// export function SnackbarPage(): JSX.Element {
//   const [state, setState] = useState<State>({
//     open: false,
//     vertical: "top",
//     horizontal: "center",
//   });
//   const { vertical, horizontal, open } = state;

//   const handleClick = (newState: SnackbarOrigin) => () => {
//     setState({ open: true, ...newState });
//   };

//   const handleClose = () => {
//     setState({ ...state, open: false });
//   };
//   return (
//     <Stack spacing={2} sx={{ display: "flex", alignItems: "center", width: "100%" }}>
//       <Button
//         onClick={handleClick({
//           vertical: "bottom",
//           horizontal: "right",
//         })}
//       >
//         Click for test success snackbar
//       </Button>
//       <Button
//         onClick={handleClick({
//           vertical: "bottom",
//           horizontal: "right",
//         })}
//       >
//         Click for test warning snackbar
//       </Button>

//       <Snackbar
//         anchorOrigin={{ vertical, horizontal }}
//         autoHideDuration={5000}
//         open={open}
//         onClose={handleClose}
//         key={vertical + horizontal}
//       >
//         <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
//           <AlertTitle>Success</AlertTitle> This is a success message!
//         </Alert>

//       </Snackbar>

//     </Stack>

//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import {  AlertTitle } from '@mui/material';
// import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface SnackbarMessage {
  message: string;
  key: number;
}

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}
export interface State2 extends SnackbarOrigin {
  open: boolean;
}
// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
//    return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />})

export function SnackbarPage() {
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  // const handleClick = (message: string) => () => {
  //   setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  // };
  const handleClick = (message: string) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Button onClick={handleClick("Positive")}>Show positive</Button>
      <Button onClick={handleClick("Attention")}>Show attention</Button>
      {/* <Button onClick={handleClick('Message C')}>Show message C</Button> */}
      {/* <Button onClick={handleClick('Message D')}>Show message D</Button> */}

      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={500000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <>
            {/* <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Success</AlertTitle> This is a success message!
        </Alert> */}
            {/* <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button> */}
            <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
