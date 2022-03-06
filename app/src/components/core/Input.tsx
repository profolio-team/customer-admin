import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "var(--color-neutral-1)",
    boxShadow: "0 0 0 1px var(--color-neutral-5)",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["box-shadow"]),
    "&:hover": {
      boxShadow: "0 0 0 1px var(--color-neutral-7)",
    },
    "&:focus": {
      boxShadow: `0 0 0 2px var(--color-theme-primary)`,
    },
  },
}));
