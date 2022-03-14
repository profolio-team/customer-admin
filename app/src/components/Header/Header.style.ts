import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";

export const HeaderTab = styled(Link)({
  display: "flex",
  color: "var(--color-neutral-7)",
  lineHeight: "1.8rem",
  alignItems: "center",
  padding: "0 1rem",
  "&.active": {
    color: "var(--color-theme-primary)",
    boxShadow: "0 3px 0 var(--color-theme-primary)",
  },
});

export const HeaderTabWithArrow = styled(Box)({
  display: "flex",
  lineHeight: "1.8rem",
  height: "100%",
  alignItems: "center",
  padding: "0 1rem",
  gap: "5px",
  position: "relative",
  "&:hover .headerSubmenu": {
    display: "flex",
  },
});

export const HeaderTabWithArrowContainer = styled(Box)({
  position: "absolute",
  left: 0,
  top: "3.9rem",
  display: "none",
  flexDirection: "column",
  borderRadius: "3px",
  boxShadow: "0 0 6px rgba(0,0,0,0.5)",
  backgroundColor: "var(--color-neutral-1)",
  gap: "5px",
});

export const HeaderTabSubMenu = styled(Link)({
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  textDecoration: "none",
  color: "var(--color-neutral-9)",
  padding: "0.5rem 1rem",
  minWidth: "150px",
  gap: "5px",
});

export const HeaderLogo = styled.img({
  flexGrow: 1,
  display: "flex",
  marginRight: "4rem",
});

export const HeaderLogoLink = styled(Link)({
  margin: "1rem",
  color: "var(--color-neutral-7)",
  display: "block",
});

export const HeaderLeftPart = styled(Box)({
  flexGrow: 1,
  display: "flex",
  gap: 0,
});
