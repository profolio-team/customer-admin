import { Link, Stack, Typography } from "@mui/material";

interface VerifyEmailProps {
  email: string;
  receiveTheEmail?: () => void;
}

export function VerifyEmail({ email, receiveTheEmail }: VerifyEmailProps): JSX.Element {
  return (
    <>
      <Stack gap={3} sx={{ maxWidth: "400px", paddingBottom: "2rem" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Please verify your email
        </Typography>

        <Typography variant="body1" component="p">
          You're almost there! We sent an email to <b>{email}</b>. Just click on the link in that
          email to complete your sign up.
        </Typography>

        <Typography variant="body1" component="p">
          If you don't see the email, please check it under your junk, spam, social or other
          folders.
        </Typography>

        <Link onClick={() => receiveTheEmail && receiveTheEmail()} variant="body2">
          I didn't receive the email.
        </Link>
      </Stack>
    </>
  );
}
