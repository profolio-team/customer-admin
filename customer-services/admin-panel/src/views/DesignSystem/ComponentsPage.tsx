import React, { useContext } from "react";

export function ComponentsPage(): JSX.Element {
  return (
    <div className="page-content">
      <h1>Components view page</h1>
      <hr />
      <h2>Buttons</h2>
      <div>
        <button>Example 1</button>
        <button>Example 2</button>
      </div>
      <hr />
      <h2>Inputs</h2>
      <div>
        <input type="text" placeholder="example of placeholder"/>
      </div>
    </div>
  );
}

