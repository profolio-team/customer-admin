import { Components, ComponentsOverrides } from "@mui/material";
import { GetTypeOfProperty } from "../../utils/type.utils";

const style: ComponentsOverrides["MuiSwitch"] = {
  root: {
    width: 52,
    height: 32,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 4,
      margin: 0,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(20px)",
        "& + .MuiSwitch-track": {
          backgroundColor: "#1068EB",
          opacity: 1,
          border: 0,
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: "#fff",
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          backgroundColor: "#CED4DA",
          opacity: 1,
          border: 0,
        },
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        backgroundColor: "#ADB5BD",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        backgroundColor: "#CED4DA",
        opacity: 1,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 24,
      height: 24,
      backgroundColor: "#fff",
    },
    "& .MuiSwitch-track": {
      borderRadius: 45,
      backgroundColor: "#ADB5BD",
      opacity: 1,
    },
  },
};

export const customSwitch: GetTypeOfProperty<Components, "MuiSwitch"> = {
  styleOverrides: style,
};
