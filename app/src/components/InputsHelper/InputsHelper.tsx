import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Autocomplete {
  label?: string;
  placeholder?: string;
  options?: {
    [id: string]: string;
  }[];
}

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiOutlinedInput-root": {
      height: "43px",
      padding: 0,
      paddingLeft: "8px",
    },
  },
}));

export function InputsHelper({
  label,
  placeholder,
  options = [{ title: "Not selected" }],
}: Autocomplete): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={(prop) => prop.title}
        selectOnFocus
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} className={classes.root} />
        )}
      />
    </div>
  );
}
