import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const ErrorInfo = styled.p({
  color: "var(--color-functional-error)",
  ":not(:empty):before": {
    content: "'Error: '",
  },
});

export const AuthTitle2 = styled(Typography)({
  textAlign: "center",
});

export const AuthTitle: React.FC = ({ children }) => {
  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        textAlign: "center",
      }}
    >
      {children}
    </Typography>
  );
};
