import { Switch } from "@mui/material";

export default {
  title: "Components/Checkboxes",
};

export const Checkboxes = ({ disabled, checked }: { disabled: boolean; checked: boolean }) => (
  <Switch disabled={disabled} defaultChecked={checked} />
);

Checkboxes.argTypes = {
  disabled: { control: { type: "boolean" }, defaultValue: false },
  checked: { control: { type: "boolean" }, defaultValue: false },
};
