import styled from "@emotion/styled";
import { Link, Box } from "@mui/material";

export const ErrorPageComponent = styled.div({
  height: "100vh",
  position: "absolute",
  top: 0,
  zIndex: "-1",
  width: "100%",
  background: "linear-gradient(145deg, rgba(73, 102, 204, 1) 25%, rgba(18, 182, 182, 1) 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  color: "var(--color-neutral-1)",
});

export const ErrorWrapper = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "center",
});
export const ErrorCode = styled(Box)({
  width: 400,
  height: 400,
  fontSize: "78px",
  marginRight: "60px",
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  justifyContent: "center",
  border: "4px solid rgb(255, 255, 255, 0.15)",
  boxShadow: "inset 0 5px 10px -5px black",
});

export const ErrorMessage = styled(Box)({
  width: 400,
  height: 400,
  boxSizing: "border-box",
  lineHeight: "100px",
});

export const SupportMail = styled(Link)({
  display: "block",
  color: "var(--color-neutral-1)",
  textDecoration: "underline",
});
