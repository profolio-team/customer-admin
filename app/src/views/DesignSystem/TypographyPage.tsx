import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export function TypographyPage(): JSX.Element {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "3rem",
        fontWeight: 500,
      },
      h2: {
        fontSize: "2rem",
      },
      h3: {
        fontSize: "1.5rem",
      },
      body1: {
        fontSize: "1.125rem",
      },
      body2: {
        fontSize: "1rem",
      },
      caption: {
        fontSize: "0.875rem",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1" component="h1">
        Make your portfolio like a piece of cake
      </Typography>
      <Typography variant="h2" component="h2">
        Make your portfolio like a piece of cake
      </Typography>
      <Typography variant="h3" component="h3">
        Make your portfolio like a piece of cake
      </Typography>
      <Typography variant="body1" component="h3">
        Make your portfolio like a piece of cake
      </Typography>
      <Typography variant="body2" component="h3">
        Make your portfolio like a piece of cake
      </Typography>
      <Typography variant="caption" component="h3">
        Make your portfolio like a piece of cake
      </Typography>
      <Link href="#" variant="body2">
        Make your portfolio like a piece of cake
      </Link>
      <br />
      <Link href="#" variant="caption">
        Make your portfolio like a piece of cake
      </Link>
    </ThemeProvider>
  );
}
