import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { limit, orderBy, query } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import { FilteringFields } from "../../views/Users/UsersPage";
import { createWhereForStringSearch, toUpperFirstChar } from "./utils";
import { QueryConstraint } from "@firebase/firestore";

export function AutocompleteLocation({
  control,
  fieldName,
}: {
  control: Control<FilteringFields>;
  fieldName: keyof FilteringFields;
}) {
  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>([
    ...createWhereForStringSearch(fieldName, ""),
  ]);
  const [users] = useCollectionData(
    query(db.collections.users, ...queryConstraint, orderBy(fieldName), limit(5))
  );
  const createQueryConstraint = (name: string) => {
    const fullName = toUpperFirstChar(name.trim());
    setQueryConstraint([...createWhereForStringSearch(fieldName, fullName)]);
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          id="location"
          onChange={(event, value) => {
            onChange(value ? value : undefined);
          }}
          value={typeof value === "string" ? value : null}
          options={users ? users.map((user) => user.location) : ["Not find"]}
          renderInput={(params) => (
            <TextField
              onChange={(event) => {
                createQueryConstraint(event.target.value);
              }}
              {...params}
              label="Location"
            />
          )}
        />
      )}
      name={fieldName}
      control={control}
    />
  );
}
