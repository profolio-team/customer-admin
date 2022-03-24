import { Box, Dialog, DialogTitle } from "@mui/material";
import { Context, createContext, ReactNode, useContext, useState } from "react";

interface showDialogProps {
  title: string;
  content: JSX.Element;
  closeHandler?: () => void;
}

interface DialogContext {
  showDialog: (options: showDialogProps) => void;
  closeDialog: () => void;
}

const dialogContext: Context<DialogContext> = createContext<DialogContext>({
  showDialog: () => void 0,
  closeDialog: () => void 0,
});

const defaultDialogTitle = "Dialog";

export function DialogProvider(props: { children: ReactNode }): JSX.Element {
  const [isOpen, setOpenState] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(defaultDialogTitle);
  const [closeHandler, setCloseHandler] = useState<() => void>();
  const [dialogContent, setDialogContent] = useState<JSX.Element>(<></>);
  const closeDialog = () => {
    setOpenState(false);
  };

  const showDialog = ({ content, title, closeHandler }: showDialogProps) => {
    setDialogTitle(title || defaultDialogTitle);
    setCloseHandler(() => closeHandler);
    setDialogContent(content);
    setOpenState(true);
  };

  const dialogComponent = (
    <Dialog
      onClose={() => {
        closeDialog();
        closeHandler && closeHandler();
      }}
      open={isOpen}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <Box sx={{ padding: "0rem 2rem 1rem 2rem" }}>{dialogContent}</Box>
    </Dialog>
  );

  const value = { showDialog, closeDialog };
  return (
    <dialogContext.Provider value={value}>
      {props.children}
      {dialogComponent}
    </dialogContext.Provider>
  );
}

export const useDialog = (): DialogContext => useContext(dialogContext);
