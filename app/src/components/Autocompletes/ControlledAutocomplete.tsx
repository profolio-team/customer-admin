import { Control, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { UserInfo } from "../../../../typescript-types/db.types";

export function ControlledAutocomplete({
  control,
  options,
  name,
  label,
}: {
  control: Control<UserInfo>;
  options: readonly string[] | readonly { label: string; value: boolean }[];
  name: keyof UserInfo;
  label: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disablePortal
          onChange={(event, value) =>
            onChange(value ? (typeof value === "string" ? value : value.value) : undefined)
          }
          options={Array.isArray(options) ? options : options}
          id={name}
          value={
            typeof value === "boolean" ? (value ? options[0] : options[1]) : value ? value : null
          }
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  );
}
