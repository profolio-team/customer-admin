import React from "react";
import { Header } from "../component/Header/Header";
import ContentWelcomePage from "../component/Content-welcome-page/Content-welcome-page";

export default function WelcomePage(): JSX.Element {
  return (
    <div>
      <Header />
      <ContentWelcomePage />
    </div>
  );
}
