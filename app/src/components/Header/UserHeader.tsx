import { useAuth } from "../../hooks/useAuth";
import BaseHeader, { HeaderMenuElement } from "./BaseHeader";

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
  ];

  settingsMenu = [
    {
      linkTo: "/design-system-inputs",
      title: "Design: Inputs",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-buttons",
      title: "Design: Buttons",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-typography",
      title: "Design: Typography",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-header",
      title: "Design: Header",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-table",
      title: "Design: Table",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-checkboxes",
      title: "Design: Checkboxes",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-dialog",
      title: "Design: Dialog",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-snackbar",
      title: "Design: Snackbar",
      type: "MenuRow",
    },
    {
      linkTo: "/design-system-preloader",
      title: "Design: Preloader",
      type: "MenuRow",
    },
    {
      type: "Divider",
    },
    {
      title: "Firestore",
      linkTo: "/firestore",
      type: "MenuRow",
    },
    {
      type: "Divider",
    },
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
