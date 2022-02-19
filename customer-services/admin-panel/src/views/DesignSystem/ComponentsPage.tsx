import React, { useContext } from "react";
import {Input} from '../../components/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export function ComponentsPage(): JSX.Element {
  return (
    <div className="page-content page-content__design-system">
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
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="simple-input">
          Label for input
        </InputLabel>
        <Input defaultValue="Default value" placeholder="Placeholder" id="simple-input" />
      </FormControl>
      </div>
    </div>
  );
}
