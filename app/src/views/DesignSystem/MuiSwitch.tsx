import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

export const MuiSwitch = styled(
  (props: SwitchProps): JSX.Element => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  )
)(({ theme }) => ({
  width: 50,
  height: 32,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 4,
    margin: 0,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#CED4DA" : "#1068EB",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 24,
    height: 24,
  },
  "& .MuiSwitch-track": {
    borderRadius: 45,
    backgroundColor: theme.palette.mode === "light" ? "#CED4DA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
