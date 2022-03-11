import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Box, Container, InputBase, Typography } from "@mui/material";

export function InputsPage(): JSX.Element {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Inputs
        </Typography>
      </Box>
      <Box>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="simple-input">
            Label for input
          </InputLabel>
          <InputBase defaultValue="Default value" placeholder="Placeholder" id="simple-input" />
        </FormControl>
      </Box>
      <Box>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="simple-input">
            Label for input with error
          </InputLabel>
          <InputBase
            error
            defaultValue="Default value"
            placeholder="Placeholder"
            id="simple-input"
          />
        </FormControl>
      </Box>
    </Container>
  );
}
