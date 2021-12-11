import React from "react";
import { Header } from "../../../component";
import { OnboardingPage } from "../OnboardingPage/OnboardingPage";

export function WelcomePage(): JSX.Element {
  return (
    <div>
      <Header />
      <OnboardingPage />
    </div>
  );
}
