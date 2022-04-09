import styled from "@emotion/styled";

export const DevButtonComponent = styled.div({
  display: "flex",
  height: "40px",
  width: "100px",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "fixed",
  right: "0px",
  bottom: "0px",
  backgroundColor: "white",
  gap: "20px",
  zIndex: 9999999,
  padding: "25px 35px 45px 35px",
  opacity: 0.5,
  boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",

  ".dev-controls": {
    display: "none",
  },
  "&:hover": {
    width: "auto",
    height: "auto",
    opacity: 1,

    padding: "55px 65px 65px 65px",
    ".dev-controls": {
      display: "flex",
      gap: "30px",
      flexDirection: "column",
    },
  },
});
