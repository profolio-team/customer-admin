import { Stack, Typography } from "@mui/material";
import { AuthTitle } from "../style";

interface SuccessResultPageProps {
  email: string;
}

export function SuccessResultPage({ email }: SuccessResultPageProps): JSX.Element {
  return (
    <>
      <Stack gap={3} sx={{ maxWidth: "400px", paddingBottom: "2rem" }}>
        <AuthTitle>Please verify your email</AuthTitle>

        <Typography variant="body1" component="p">
          You're almost there! We sent an email to <b>{email}</b>. Just click on the link in that
          email to complete your sign up.
        </Typography>

        <Typography variant="body1" component="p">
          If you don't see the email, please check it under your junk, spam, social or other
          folders.
        </Typography>
      </Stack>
    </>
  );
}
