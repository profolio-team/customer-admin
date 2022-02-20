import { styled } from "@mui/material/styles";
import { default as MaterialButton } from "@mui/material/Button";

export const Button = styled(MaterialButton)(() => ({
  color: "var(--color-neutral-1)",
  backgroundColor: "var(--color-theme-primary)",
  "&:hover": {
    backgroundColor: "var(--color-theme-primary)",
  },
}));
