import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  HeaderLeftPart,
  HeaderLogo,
  HeaderLogoLink,
  HeaderRightPart,
  HeaderTab,
  HeaderTabSubMenu,
  HeaderTabWithArrow,
  HeaderTabWithArrowContainer,
  MainMenuToggler,
} from "./style";
import { FC, useState, MouseEvent } from "react";
import { User } from "firebase/auth";

type MenuType = "Button" | "Tab" | "SubMenu" | "Divider" | "MenuRow";

export interface HeaderMenuElement {
  linkTo?: string;
  title?: string;
  childs?: HeaderMenuElement[];
  handler?: () => void;
  type: MenuType;
}
interface HeaderProps {
  leftHeaderMenuItems?: HeaderMenuElement[];
  userSettingsMenu?: HeaderMenuElement[];
  rightHeaderMenuItems?: HeaderMenuElement[];
  user?: User | null;
}

export const AppBarCustom = styled(AppBar)(() => ({
  backgroundColor: "var(--color-neutral-1)",
  "--heder-height": "64px",
  height: "var(--heder-height)",
}));

const BaseHeader: FC<HeaderProps> = ({
  leftHeaderMenuItems = [],
  userSettingsMenu = [],
  rightHeaderMenuItems = [],
  user = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [anchorElMainMenu, setAnchorElMainMenu] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMainMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElMainMenu(event.currentTarget);
  };
  const handleCloseMainMenu = () => {
    setAnchorElMainMenu(null);
  };

  const renderMenuItems = (items: HeaderMenuElement[]) => {
    return items.map((page) => {
      if (!page.childs) {
        if (page.type === "Button") {
          return (
            <Button
              href={page.linkTo}
              key={page.title}
              sx={{ marginLeft: "1rem" }}
              className={`${page.linkTo === pathname ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                if (page.linkTo) {
                  navigate(page.linkTo);
                }
              }}
              variant="outlined"
            >
              {page.title}
            </Button>
          );
        }

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
            className={`${page.linkTo === pathname ? "active" : ""} headerTab`}
            underline="none"
          >
            {page.title}
          </HeaderTab>
        );
      }
      if (page.childs) {
        return (
          <Box
            key={page.title}
            className={"headerTab"}
            sx={{ color: "var(--color-neutral-7)", height: "100%", display: "block" }}
          >
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
    });
  };

  const renderMainMenuForMobil = (items: HeaderMenuElement[]) => {
    const itemsForRender: HeaderMenuElement[] = [];
    items.forEach((menuItem) => {
      const isChilds = menuItem.childs && menuItem.childs.length > 0;
      if (isChilds) {
        itemsForRender.push({ type: "Divider" });
        itemsForRender.push(menuItem);
        menuItem.childs?.forEach((item) => {
          itemsForRender.push(item);
        });
      } else {
        itemsForRender.push(menuItem);
      }
    });

    return itemsForRender.map((menuElement) => {
      if (menuElement.type === "Divider") {
        return <Divider key={Date.now() + Math.random()} />;
      }

      return (
        <MenuItem
          key={menuElement.title}
          onClick={(e) => {
            e.preventDefault();
            if (menuElement.handler) {
              menuElement.handler();
            } else if (menuElement.linkTo) {
              navigate(menuElement.linkTo);
            }
          }}
        >
          <Typography
            sx={{
              opacity: menuElement.childs ? 0.6 : 1,
            }}
          >
            {menuElement.title}
          </Typography>
        </MenuItem>
      );
    });
  };

  return (
    <AppBarCustom position="static" color="inherit">
      <Menu
        sx={{ mt: "45px" }}
        id="main-menu-appbar"
        anchorEl={anchorElMainMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElMainMenu)}
        onClose={handleCloseMainMenu}
      >
        {renderMainMenuForMobil([...leftHeaderMenuItems, ...rightHeaderMenuItems])}
      </Menu>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderLeftPart>
            <MainMenuToggler
              onClick={handleOpenMainMenu}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </MainMenuToggler>

            <HeaderLogoLink
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <HeaderLogo src="/logo.svg" />
            </HeaderLogoLink>

            {renderMenuItems(leftHeaderMenuItems)}
          </HeaderLeftPart>

          <HeaderRightPart>{renderMenuItems(rightHeaderMenuItems)}</HeaderRightPart>

          {user && (
            <MenuItem>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={3} color="info">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MenuItem>
          )}

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, margin: "0 1rem" }}>
                  <Avatar alt="User photo" src={user.photoURL || ""} />
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
                {renderMainMenuForMobil(userSettingsMenu)}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBarCustom>
  );
};

export default BaseHeader;
