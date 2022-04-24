import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

export function SelectDomain({
  domainList,
  selectedDomain,
  onChange,
}: {
  domainList: string[];
  selectedDomain: string;
  onChange: (selectedDomain: string) => void;
}): JSX.Element {
  return (
    <>
      {domainList.length > 0 && (
        <FormControl>
          <FormLabel id="domain">Domain</FormLabel>
          <RadioGroup
            value={selectedDomain}
            onChange={(e) => onChange(e.target.value)}
            style={{ marginLeft: "5px" }}
            aria-labelledby="domain"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {domainList.map((domainName) => (
              <FormControlLabel
                value={domainName}
                key={domainName}
                control={<Radio />}
                label={domainName}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    </>
  );
}
