import React from "react";
import Status from "../component/Status";

export default function StatusPage() {
  return (
    <div
      style={{
        border: "3px dotted tomato",
        width: "500px",
        padding: "20px",
      }}
    >
      <Status />
    </div>
  );
}
