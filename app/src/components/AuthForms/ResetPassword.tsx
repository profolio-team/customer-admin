import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

import { AuthTitle } from "./style";
import { getEmailParamFromUrl } from "../../utils/url.utils";

export function ResetPassword(): JSX.Element {
  const emailFromUrl = getEmailParamFromUrl();
  const [email, setEmail] = useState(emailFromUrl);

  return (
    <>
      <AuthTitle>Reset password</AuthTitle>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          id="email"
          type="email"
          placeholder="Enter corporate email"
          label={"Email adress"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="contained" sx={{ margin: "1rem 0" }}>
          Send reset password email
        </Button>
      </Box>
    </>
  );
}
