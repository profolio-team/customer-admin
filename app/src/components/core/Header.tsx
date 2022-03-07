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
import { Link } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const pages = [
  { linkTo: "/design-system-inputs", title: "Inputs" },
  { linkTo: "/design-system-buttons", title: "Buttons" },
  { linkTo: "/design-system-typography", title: "Typography" },
  { linkTo: "/design-system-header", title: "Header" },
  { linkTo: "/firestore", title: "Firestore" },
];

export const AppBarCustom = styled(AppBar)(() => ({
  backgroundColor: "var(--color-neutral-1)",
}));

export function Header(): JSX.Element {
  const { userInfo, isAuthorized, logout } = useAuth();
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
          <Box sx={{ flexGrow: 1, display: "flex", gap: "10px" }}>
            {pages.map((page) => (
              <Link
                href={page.linkTo}
                key={page.title}
                sx={{ my: 2, color: "var(--color-neutral-7)", display: "block" }}
                underline="none"
              >
                {page.title}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Typography
              variant="subtitle1"
              style={{ paddingRight: "10px" }}
              gutterBottom
              component="span"
            >
              {userInfo.email}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
              {settingsMenu.map((setting) => (
                <MenuItem key={setting.title} onClick={setting.handler}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBarCustom>
  );
}
