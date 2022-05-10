import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Autocomplete {
  options: {
    title: string;
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

export function InputsHelper({ options }: Autocomplete): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={(prop) => prop.title}
        selectOnFocus
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Input Helper"}
            placeholder="Placeholder"
            helperText={"Helper text"}
            className={classes.root}
          />
        )}
      />
    </div>
  );
}
