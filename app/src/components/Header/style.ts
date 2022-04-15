import styled from "@emotion/styled";
import { Box, IconButton, Link } from "@mui/material";

export const HeaderTab = styled(Link)({
  display: "flex",
  color: "var(--color-neutral-7)",
  lineHeight: "1.8rem",
  alignItems: "center",
  height: "var(--heder-height)",
  padding: "0 1rem",
  whiteSpace: "nowrap",
  "&.active": {
    color: "var(--color-theme-primary)",
    boxShadow: "inset 0 -3px 0 var(--color-theme-primary)",
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
  whiteSpace: "nowrap",
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
  margin: "1rem 1rem 1rem 0",
  color: "var(--color-neutral-7)",
  display: "block",
});

export const HeaderLeftPart = styled(Box)({
  height: "var(--heder-height)",
  flexGrow: 1,
  display: "flex",
  gap: 0,
  paddingRight: "3px",
  overflowX: "clip",
  "@media (max-width: 1180px)": {
    ".headerTab": {},
  },
});

export const HeaderRightPart = styled(HeaderLeftPart)({
  justifyContent: "end",
  alignItems: "center",
});

export const MainMenuToggler = styled(IconButton)({
  height: "var(--heder-height)",
  width: "var(--heder-height)",
  margin: "0 1rem 0 0rem",
  display: "none",
  "@media (max-width: 1180px)": {
    display: "block",
  },
});
