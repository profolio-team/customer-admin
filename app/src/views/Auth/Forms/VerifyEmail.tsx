import { Link, Stack, Typography } from "@mui/material";

interface VerifyEmailProps {
  verifyLink: string;
  domain: string;
  email: string;
  receiveTheEmail?: () => void;
}

export function VerifyEmail({
  verifyLink,
  domain,
  email,
  receiveTheEmail,
}: VerifyEmailProps): JSX.Element {
  return (
    <>
      <Stack gap={3} sx={{ maxWidth: "400px", paddingBottom: "3rem" }}>
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

        <Typography variant="body1" component="p">
          Information below for dev/test environment
        </Typography>

        <Link onClick={() => receiveTheEmail && receiveTheEmail()} variant="body2">
          I didn't receive the email.
        </Link>

        <hr />

        <Typography variant="body1" component="p">
          Information below for dev/test environment
        </Typography>

        <Typography variant="body1" component="p">
          Domain: <br />
          <b>{domain}</b>
        </Typography>

        <Typography variant="body1" component="p">
          Email: <br />
          <b>{email}</b>
        </Typography>
        <Typography variant="body1" component="p">
          Test password: <br />
          <b>123123</b>
        </Typography>
        <Link href={verifyLink} variant="body2">
          Emulator: Confirm creation of company
        </Link>
      </Stack>
    </>
  );
}
