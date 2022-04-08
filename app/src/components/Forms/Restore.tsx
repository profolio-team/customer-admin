import Button from "@mui/material/Button";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function RestoreForm(): JSX.Element {
  const [email, setEmail] = useState("");

  return (
    <>
      <Box>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Restore password
        </Typography>
      </Box>

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
          Send restore email
        </Button>
      </Box>
    </>
  );
}
