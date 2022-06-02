import { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { query, where, getDocs } from "firebase/firestore";
import db from "../../services/firebase/firestore";

export function InputValidator(props?: TextFieldProps): JSX.Element {
  async function CheckDbMatch(area: string, inputValue: string) {
    const nameQuery = query(db.users, where(area, "==", inputValue));
    const querySnapshot = await getDocs(nameQuery);

    if (querySnapshot.docs.length > 0) {
      setErros(true);
    }

    return;
  }

  const [errors, setErros] = useState(false);
  const helper = errors ? "The department name already exist" : props?.helperText;

  return (
    <TextField
      error={!!errors}
      placeholder="Placeholder"
      onChange={() => setErros(false)}
      {...props}
      onBlur={(e) => {
        CheckDbMatch("lastName", e.target.value);
      }}
      helperText={helper}
    />
  );
}
