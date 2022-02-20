import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "../../components/core";

export function ButtonsPage(): JSX.Element {
  return (
    <div className="page-content page-content__design-system">
      <h2>Buttons</h2>
      <div>
        <Button variant="contained">Cancel</Button>
      </div>
    </div>
  );
}
