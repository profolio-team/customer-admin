import { Box, Checkbox, Link, Typography } from "@mui/material";
import { TermsInfo } from "./style";

export function TermsShortInfo({
  isEnabled,
  onChange,
}: {
  isEnabled: boolean;
  onChange: (isEnabled: boolean) => void;
}): JSX.Element {
  return (
    <TermsInfo>
      <Checkbox
        value={isEnabled}
        defaultChecked={isEnabled}
        onChange={(e) => onChange(e.target.checked)}
        name="terms"
        style={{ margin: "-7px 0 0 -10px" }}
      />
      <Box>
        <Typography variant="body2" component="p">
          By creating an account, you agree to our
          <Link href="/terms-of-service" target="_blank" variant="body2">
            Terms of Service
          </Link>
          and have read and understood the
          <Link href="/privacy-policy" target="_blank" variant="body2">
            Privacy Policy.
          </Link>
        </Typography>
      </Box>
    </TermsInfo>
  );
}
