import { isExtendedUrl } from "../../utils/url.utils";
import BaseHeader, { HeaderMenuElement } from "./BaseHeader";

export function StaticHeader(): JSX.Element {
  let menuItems: HeaderMenuElement[] = [];

  if (isExtendedUrl) {
    menuItems = [
      { linkTo: "/contacts", title: "Contact Us", type: "Tab" },
      { linkTo: "/sign-in", title: "Sign In", type: "Tab" },
    ];
  } else {
    menuItems = [
      { linkTo: "/examples", title: "Examples", type: "Tab" },
      { linkTo: "/contacts", title: "Contact Us", type: "Tab" },
      { linkTo: "/sign-in", title: "Sign In", type: "Tab" },
      { linkTo: "/sign-up", title: "Create Account", type: "Button" },
    ];
  }

  return <BaseHeader rightHeaderMenuItems={menuItems} />;
}
