import { ThemeContextProvider } from "../components/core/theme";
import { Box, Typography, Switch, Stack } from "@mui/material";

export default {
  title: "Components/Checkboxes",
};

export function CheckboxesTemplate(): JSX.Element {
  return (
    <ThemeContextProvider>
      <Box>
        <Typography variant="h2" component="h2">
          Toggle
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ m: 2 }}>
          <Switch defaultChecked />
          <Typography pl={2}>On/Enabled</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ m: 2 }}>
          <Switch />
          <Typography pl={2}>Off/Enabled</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ m: 2 }}>
          <Switch disabled defaultChecked />
          <Typography pl={2}>On/Inactive</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ m: 2 }}>
          <Switch disabled />
          <Typography pl={2}>Off/Inactive</Typography>
        </Stack>
      </Box>
    </ThemeContextProvider>
  );
}

CheckboxesTemplate.storyName = "Checkboxes";
