import React from "react";
import Button from "@mui/material/Button";
import { ErrorSharp, AlarmOnSharp } from "@mui/icons-material";

export default {
  title: "Components/Buttons",
};

interface ButtonProps {
  variant: "outlined" | "text" | "contained";
  size: "small" | "medium" | "large" | "iconSquareSmall" | "iconSquareLarge";
  startIcon: boolean;
  withText: boolean;
  innerIcon: boolean;
}

export const ButtonTemplate = ({ variant, size, startIcon, withText, innerIcon }: ButtonProps) => {
  return (
    <Button variant={variant} size={size} startIcon={startIcon && <AlarmOnSharp />}>
      {innerIcon && <ErrorSharp />}
      {withText && "Contained button"}
    </Button>
  );
};

ButtonTemplate.storyName = "Buttons";

ButtonTemplate.argTypes = {
  variant: {
    options: ["outlined", "text", "contained"],
    control: { type: "radio" },
    defaultValue: "outlined",
  },

  size: {
    options: ["small", "medium", "large", "iconSquareSmall", "iconSquareLarge"],
    control: { type: "radio" },
    defaultValue: "outlined",
  },

  withText: { control: { type: "boolean" }, defaultValue: true },

  startIcon: { control: { type: "boolean" }, defaultValue: false },
  innerIcon: { control: { type: "boolean" }, defaultValue: false },
};
