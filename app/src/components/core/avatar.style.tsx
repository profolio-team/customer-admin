import { GetTypeOfProperty } from "../../utils/type.utils";
import { Components } from "@mui/material";

export const customAvatar: GetTypeOfProperty<Components, "MuiAvatar"> = {
  styleOverrides: {
    img: {
      WebkitUserDrag: "none",
    },
  },
};
