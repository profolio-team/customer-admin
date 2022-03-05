import { Input } from "../../components/core";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export function InputsPage(): JSX.Element {
  return (
    <div className="page-content page-content__design-system">
      <h2>Inputs</h2>
      <div>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="simple-input">
            Label for input
          </InputLabel>
          <Input defaultValue="Default value" placeholder="Placeholder" id="simple-input" />
        </FormControl>
      </div>
    </div>
  );
}
