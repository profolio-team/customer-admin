import styled from "@emotion/styled";

export const ErrorPageWrapper = styled.div({
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
  ".wrapper": { display: "flex", width: "100%", justifyContent: "center" },
  ".error_code": {
    width: 400,
    height: 400,
    marginRight: "60px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    justifyContent: "center",
    border: "4px solid rgb(255, 255, 255, 0.15)",
    boxShadow: "inset 0 5px 10px -5px black",
  },
  ".error_message": {
    width: 400,
    height: 400,
    boxSizing: "border-box",
    lineHeight: "100px",
  },
  ".support_mail": {
    display: "block",
    color: "var(--color-neutral-1)",
    textDecoration: "underline",
  },
});
