import BaseHeader, { HeaderMenuElement } from "../components/Header/BaseHeader";

export default {
  title: "Components/Header",
};

export function HeaderPage(): JSX.Element {
  const rightHeaderMenuItems: HeaderMenuElement[] = [
    { linkTo: "/examples", title: "Examples", type: "Tab" },
    { linkTo: "/contacts", title: "Contact Us", type: "Tab" },
    {
      linkTo: "/",
      title: "With dropdown menu",
      type: "Tab",
      childs: [
        {
          linkTo: "/design-system-inputs",
          title: "Inputs",
          type: "MenuRow",
        },
        {
          linkTo: "/design-system-buttons",
          title: "Buttons",
          type: "MenuRow",
        },
      ],
    },
    { linkTo: "/sign-in", title: "Sign In", type: "Tab" },
  ];

  const leftHeaderMenuItems: HeaderMenuElement[] = [
    { linkTo: "/left", title: "Left Menu", type: "Tab" },
  ];

  return (
    <BaseHeader
      leftHeaderMenuItems={leftHeaderMenuItems}
      rightHeaderMenuItems={rightHeaderMenuItems}
    />
  );
}
HeaderPage.storyName = "StaticHeader";
