import React from "react";
import Registration from "../component/Registration";

export default function RegistrationPage() {
  return (
    <div
      style={{
        border: "3px dotted tomato",
        width: "500px",
        padding: "20px",
      }}
    >
      <h3>Registration page</h3>
      <Registration />
    </div>
  );
}
