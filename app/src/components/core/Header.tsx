import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import { Badge, Link } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const pages = [
  { linkTo: "/", title: "Dashboard" },
  { linkTo: "/settings/company-info", title: "Company Info" },
  { linkTo: "/users", title: "Users" },
  { linkTo: "/company-structure", title: "Company Structure" },
  {
    title: "Payment",
    childs: [
      { linkTo: "/payment-a", title: "Example a" },
      { linkTo: "/payment-b", title: "Example b" },
    ],
  },
  {
    title: "Customer Service",
    childs: [
      { linkTo: "/customer-a", title: "Example a" },
      { linkTo: "/customer-b", title: "Example b" },
    ],
  },
];

export const AppBarCustom = styled(AppBar)(() => ({
  backgroundColor: "var(--color-neutral-1)",
}));

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { isAuthorized, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settingsMenu = [];
  if (isAuthorized) {
    settingsMenu.push({
      handler: () => {
        navigate("/design-system-inputs");
      },
      title: "Design: Inputs",
    });

    settingsMenu.push({
      handler: () => {
        navigate("/design-system-buttons");
      },
      title: "Design: Buttons",
    });
    settingsMenu.push({
      handler: () => {
        navigate("/design-system-typography");
      },
      title: "Design: Typography",
    });
    settingsMenu.push({
      handler: () => {
        navigate("/design-system-header");
      },
      title: "Design: Header",
    });
    settingsMenu.push({
      handler: () => {
        navigate("/design-system-checkboxes");
      },
      title: "Design: Checkboxes",
    });

    settingsMenu.push({
      title: "separator1",
      isSeparator: true,
    });

    settingsMenu.push({
      title: "Firestore",
      linkTo: "/firestore",
    });

    settingsMenu.push({
      title: "separator2",
      isSeparator: true,
    });

    settingsMenu.push({
      title: "User Info",
      handler: () => void 0,
    });
    settingsMenu.push({
      title: "Change Password",
      handler: () => void 0,
    });
    settingsMenu.push({
      title: "Logout",
      handler: logout,
    });
  } else {
    settingsMenu.push({
      title: "Login Page",
      handler: () => void 0,
    });
  }

  return (
    <AppBarCustom position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", gap: "0" }}>
            <Link
              href="/"
              sx={{ my: 2, color: "var(--color-neutral-7)", display: "block" }}
              underline="none"
            >
              <Box sx={{ flexGrow: 1, display: "flex", marginRight: "4rem" }}>
                <img src="/logo.svg" />
              </Box>
            </Link>
            {pages.map((page) => {
              if (!page.childs) {
                return (
                  <Link
                    href={page.linkTo}
                    key={page.title}
                    className={`${page.linkTo === pathname ? "active" : ""}`}
                    sx={{
                      display: "flex",
                      color: "var(--color-neutral-7)",
                      lineHeight: "1.8rem",
                      alignItems: "center",
                      padding: "0 1rem",
                      "&.active": {
                        color: "var(--color-theme-primary)",
                        boxShadow: "0 3px 0 var(--color-theme-primary)",
                      },
                    }}
                    underline="none"
                  >
                    {page.title}
                  </Link>
                );
              }
              if (page.childs) {
                return (
                  <Box key={page.title} sx={{ color: "var(--color-neutral-7)", display: "block" }}>
                    <Box
                      sx={{
                        display: "flex",
                        lineHeight: "1.8rem",
                        height: "100%",
                        alignItems: "center",
                        padding: "0 1rem",
                        gap: "5px",
                      }}
                    >
                      {page.title}
                      <KeyboardArrowDown sx={{ marginRight: "-8px" }} />
                    </Box>
                  </Box>
                );
              }
            })}
          </Box>

          {isAuthorized && (
            <MenuItem>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={3} color="info">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MenuItem>
          )}

          {isAuthorized && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, margin: "0 1rem" }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settingsMenu.map((setting) => {
                  if (setting.isSeparator) {
                    return <hr key={setting.title} />;
                  }

                  return (
                    <MenuItem key={setting.title} onClick={setting.handler}>
                      <Typography>{setting.title}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBarCustom>
  );
}
