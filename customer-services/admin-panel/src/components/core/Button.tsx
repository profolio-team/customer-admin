import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { default as MaterialButton } from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const Button = styled(MaterialButton)(({ theme }) => ({
  color: "var(--color-neutral-1)",
  backgroundColor: "var(--color-theme-primary)",
  "&:hover": {
    backgroundColor: "var(--color-theme-primary)",
  },
}));
