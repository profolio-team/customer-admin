import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import { Checkbox } from "@mui/material";
export function CheckboxesPage(): JSX.Element {
  const error = true;
  const switchLabel = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Checkboxes
        </Typography>
      </Box>
      <Box>
        <FormControl component="fieldset" variant="standard" error={error}>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="default" />} label="Default " />
            <FormControlLabel control={<Checkbox disabled name="disabled" />} label="Disabled" />
            <FormControlLabel
              control={<Checkbox defaultChecked name="selected" />}
              label="Selected"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked disabled name="disabled-selected" />}
              label="Disabled Selected"
            />
            <Box position="relative">
              <FormControlLabel control={<Checkbox name="default" />} label="Error " />
              {error && (
                <FormHelperText sx={{ position: "relative", bottom: 14 }}>
                  Error message
                </FormHelperText>
              )}
            </Box>
            <FormControlLabel
              control={<Checkbox name="focused" className="Mui-focusVisible" />}
              label="Focused "
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Box>
        <Typography variant="h2" component="h2">
          Toggle
        </Typography>

        <Box>
          <FormControlLabel control={<Switch {...switchLabel} />} label="Default" />
        </Box>
        <Box>
          <FormControlLabel
            control={<Switch {...switchLabel} defaultChecked />}
            label="Default Checked"
          />
        </Box>
        <Box>
          <FormControlLabel control={<Switch {...switchLabel} disabled />} label="Disabled" />
        </Box>
        <Box>
          <FormControlLabel
            control={<Switch {...switchLabel} disabled defaultChecked />}
            label="Disabled Checked"
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="h2" component="h2">
          Radio
        </Typography>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Container>
  );
}
