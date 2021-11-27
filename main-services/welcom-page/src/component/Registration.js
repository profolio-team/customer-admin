import React from "react";

export default function Registration() {
  return (
    <div>
      <h3>Registartion</h3>
      <div>
        <label>
          Email:
          <input type="text" />
        </label>
      </div>
      <div>
        <label>
          Domain:
          <input type="text" />
        </label>
      </div>
      <button>Registration</button>
    </div>
  );
}
