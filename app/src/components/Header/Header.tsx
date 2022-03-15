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
import { Badge } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  HeaderLeftPart,
  HeaderLogo,
  HeaderLogoLink,
  HeaderTab,
  HeaderTabSubMenu,
  HeaderTabWithArrow,
  HeaderTabWithArrowContainer,
} from "./Header.style";

interface HeaderMenuElement {
  linkTo?: string;
  title: string;
  childs?: HeaderMenuElement[];
}

interface HeaderSettingElement {
  title?: string;
  isSeparator?: boolean;
  handler?: () => void;
  linkTo?: string;
}

export const AppBarCustom = styled(AppBar)(() => ({
  backgroundColor: "var(--color-neutral-1)",
}));

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { isAuthorized, userInfo, loading, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let settingsMenu: HeaderSettingElement[] = [];

  let pages: HeaderMenuElement[] = [];

  if (!loading && isAuthorized) {
    pages = [
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

    settingsMenu = [
      {
        linkTo: "/design-system-inputs",
        title: "Design: Inputs",
      },

      {
        linkTo: "/design-system-buttons",
        title: "Design: Buttons",
      },
      {
        linkTo: "/design-system-typography",
        title: "Design: Typography",
      },
      {
        linkTo: "/design-system-header",
        title: "Design: Header",
      },
      {
        linkTo: "/design-system-checkboxes",
        title: "Design: Checkboxes",
      },
      {
        title: "separator1",
        isSeparator: true,
      },
      {
        title: "Firestore",
        linkTo: "/firestore",
      },
      {
        title: "separator2",
        isSeparator: true,
      },
      {
        title: "User Info",
      },
      {
        title: "Change Password",
      },
      {
        title: "Logout",
        handler: logout,
      },
    ];
  }

  if (!loading && !isAuthorized) {
    pages = [
      { linkTo: "/contact-us", title: "Contact Us" },
      { linkTo: "/create-account", title: "Create Account" },
      { linkTo: "/examples", title: "Examples" },
    ];

    settingsMenu = [
      {
        title: "Login Page",
      },
    ];
  }

  return (
    <AppBarCustom position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderLeftPart>
            <HeaderLogoLink
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <HeaderLogo src="/logo.svg" />
            </HeaderLogoLink>
            {pages.map((page) => {
              if (!page.childs) {
                return (
                  <HeaderTab
                    href={page.linkTo}
                    onClick={(e) => {
                      e.preventDefault();
                      if (page.linkTo) {
                        navigate(page.linkTo);
                      }
                    }}
                    key={page.title}
                    className={`${page.linkTo === pathname ? "active" : ""}`}
                    underline="none"
                  >
                    {page.title}
                  </HeaderTab>
                );
              }
              if (page.childs) {
                return (
                  <Box key={page.title} sx={{ color: "var(--color-neutral-7)", display: "block" }}>
                    <HeaderTabWithArrow>
                      {page.title}
                      <KeyboardArrowDown sx={{ marginRight: "-8px" }} />
                      <HeaderTabWithArrowContainer className="headerSubmenu">
                        {page.childs.map((menuItem) => (
                          <HeaderTabSubMenu
                            key={menuItem.title}
                            href={menuItem.linkTo}
                            onClick={(e) => {
                              e.preventDefault();
                              if (menuItem.linkTo) {
                                navigate(menuItem.linkTo);
                              }
                            }}
                          >
                            {menuItem.title}
                          </HeaderTabSubMenu>
                        ))}
                      </HeaderTabWithArrowContainer>
                    </HeaderTabWithArrow>
                  </Box>
                );
              }
            })}
          </HeaderLeftPart>

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
                  <Avatar alt={userInfo.displayName} src={userInfo.photoURL} />
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
                    <MenuItem
                      key={setting.title}
                      onClick={(e) => {
                        e.preventDefault();
                        if (setting.handler) {
                          setting.handler();
                        } else if (setting.linkTo) {
                          navigate(setting.linkTo);
                        }
                      }}
                    >
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
