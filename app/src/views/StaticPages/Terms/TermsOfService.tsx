import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

export function TermsOfServicePage(): JSX.Element {
  return (
    <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
      <Box>
        <Typography variant="h2" component="h2">
          Terms of Use
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" component="p">
          1. TERMS
        </Typography>
        <ul>
          <li>
            1.1. The Terms of Use (from now on referred to as the "Rules") rule the use of the
            websites: www.profolio.com (from now on referred to as the System). During registration
            in the System, the User undertakes to familiarize himself with the current version of
            the Rules.
          </li>
          <li>
            1.2. The System Administrator (from now on - the Administrator) means [company name], a
            legal entity registered at [registration address].
          </li>
          <li>1.3. Company - a legal entity registered in the System per these Rules.</li>
          <li>1.4. User - an employee (manager) of the Company (if the User is a legal entity).</li>
          <li>
            1.5. Account - data about the Company and User stored in the System, necessary for his
            identification (authentication), and granting access to the System (login, password).
          </li>
          <li>
            1.6. Portfolio - information about work experience, skills, education required for
            employment, published in the System by the User.
          </li>
        </ul>
      </Box>
    </Container>
  );
}
