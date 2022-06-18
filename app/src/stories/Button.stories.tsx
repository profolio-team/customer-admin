import React from "react";
import Button from "@mui/material/Button";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Stack } from "@mui/material";

export default {
  title: "Components/Buttons",
};

export const ButtonTemplate = () => {
  return (
    <Stack direction={"column"} gap="2rem">
      <Stack direction={"row"} gap="2rem">
        <Button variant="contained">Contained button</Button>

        <Button variant="contained" startIcon={<ErrorOutlinedIcon />}>
          Contained icon
        </Button>

        {/* Just Icon */}
        <Button variant="contained" size={"iconSquareSmall"}>
          <ErrorOutlinedIcon />
        </Button>
      </Stack>

      <Stack direction={"row"} gap="2rem">
        <Button variant="text">Text button</Button>

        <Button variant="text" startIcon={<ErrorOutlinedIcon />}>
          Text icon
        </Button>

        {/* Just Icon */}
        <Button variant="text" size={"iconSquareSmall"}>
          <ErrorOutlinedIcon />
        </Button>
      </Stack>

      <Stack direction={"row"} gap="2rem">
        <Button variant="outlined">Outlined button</Button>

        <Button variant="outlined" startIcon={<ErrorOutlinedIcon />}>
          Outlined icon
        </Button>

        {/* Just Icon */}
        <Button variant="outlined" size={"iconSquareSmall"}>
          <ErrorOutlinedIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

ButtonTemplate.storyName = "Buttons";
