import React from "react";
import { Wallpaper, Card, AuthorizationForm } from "../../component";
import { AuthorizationPageInterface } from "./AuthorizationPage.types";

export function AuthorizationPage({ form }: AuthorizationPageInterface): JSX.Element {
  return (
    <div>
      <Wallpaper>
        <Card>
          <AuthorizationForm form={form} />
        </Card>
      </Wallpaper>
    </div>
  );
}
