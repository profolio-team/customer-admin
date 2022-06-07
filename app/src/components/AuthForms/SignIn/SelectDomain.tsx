import { Button, MenuItem, Select } from "@mui/material";
import { useState } from "react";

interface SelectDomainProps {
  domainList: string[];
  redirect: (selectDomain: string) => void;
}

export function SelectDomain({ domainList, redirect }: SelectDomainProps): JSX.Element {
  const [selectDomain, setSelectDomain] = useState(domainList[0]);

  return (
    <>
      <Select value={selectDomain} onChange={(e) => setSelectDomain(e.target.value)}>
        {domainList.map((domain) => (
          <MenuItem value={domain}>{domain}</MenuItem>
        ))}
      </Select>

      <Button variant="contained" onClick={() => redirect(selectDomain)} sx={{ marginTop: "1rem" }}>
        Continue
      </Button>
    </>
  );
}
