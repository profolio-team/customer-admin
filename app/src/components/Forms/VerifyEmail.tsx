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

        <Link onClick={() => receiveTheEmail && receiveTheEmail()} variant="body2">
          I didn't receive the email.
        </Link>

        <Typography variant="body1" component="p" sx={{ opacity: 0.7 }}>
          Domain: <br />
          <b>{domain}</b>
          <br />
          Email: <br />
          <b>{email}</b>
          <br />
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
