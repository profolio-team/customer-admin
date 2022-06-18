import { TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { InputsHelper } from "../components/InputsHelper/InputsHelper";

export default {
  title: "Components/Inputs",
};

export const InputWithIcon = () => (
  <TextField
    label={"Label"}
    helperText={"Helper text"}
    placeholder={"Placeholder"}
    InputProps={{
      startAdornment: <AccountCircle />,
    }}
  />
);

export const Input = () => (
  <TextField label={"Label"} helperText={"Helper text"} placeholder={"Placeholder"} />
);

export const InputError = () => (
  <TextField label={"Label"} error helperText={"Helper text"} placeholder={"Placeholder"} />
);

export const InputsHelperComponent = () => <InputsHelper />;
