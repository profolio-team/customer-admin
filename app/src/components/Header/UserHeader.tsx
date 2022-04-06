import { useAuth } from "../../hooks/useAuth";
import BaseHeader, { HeaderMenuElement } from "./BaseHeader";
import { designSystemLinks } from "./designSystemLinks";

export function UserHeader(): JSX.Element {
  const { user, logout } = useAuth();

  let settingsMenu: HeaderMenuElement[] = [];
  const pages: HeaderMenuElement[] = [
    { linkTo: "/", title: "Dashboard", type: "Tab" },
    { linkTo: "/settings/company-info", title: "Company Info", type: "Tab" },
    { linkTo: "/users", title: "Users", type: "Tab" },
    { linkTo: "/company-structure", title: "Company Structure", type: "Tab" },
    {
      title: "Payment",
      type: "Tab",
      childs: [
        { linkTo: "/payment-a", title: "Example PaymentA", type: "SubMenu" },
        { linkTo: "/payment-b", title: "Example PaymentB", type: "SubMenu" },
      ],
    },
    {
      title: "Customer Service",
      type: "Tab",
      childs: [
        { linkTo: "/customer-a", title: "Customer a", type: "SubMenu" },
        { linkTo: "/customer-b", title: "Customer b", type: "SubMenu" },
      ],
    },
    { linkTo: "/", title: "Design System", type: "Tab", childs: designSystemLinks },
  ];

  settingsMenu = [
    {
      title: "User Info",
      linkTo: "/user-info",
      type: "MenuRow",
    },
    {
      title: "Change Password",
      linkTo: "/change-password",
      type: "MenuRow",
    },
    {
      title: "Logout",
      handler: logout,
      type: "MenuRow",
    },
  ];

  return <BaseHeader leftHeaderMenuItems={pages} userSettingsMenu={settingsMenu} user={user} />;
}
