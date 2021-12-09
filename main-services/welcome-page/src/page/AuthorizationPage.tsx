import React from "react";
import { Wallpaper } from "../component/Wallpaper/Wallpaper";
import { Card } from "../component/Card/Card";
import { AuthorizationForm } from "../component/Authorization Form/AuthorizationForm";
import { AuthorizationPageInterface } from "../interfaces/AuthorizationPage.interface";
export default function AuthorizationPage({ form }: AuthorizationPageInterface): JSX.Element {
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
