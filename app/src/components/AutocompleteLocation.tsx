import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../services/firebase/firestore";
import { limit, orderBy, query } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import { FilteringFields } from "../views/Users/UsersPage";
import { createWhereForStringSearch, toUpperFirstChar } from "./Autocompletes/utils";

export function AutocompleteLocation({
  control,
  fieldName,
}: {
  control: Control<FilteringFields>;
  fieldName: keyof FilteringFields;
}) {
  const [q, setQ] = useState(
    query(
      db.collections.users,
      ...createWhereForStringSearch(fieldName, ""),
      orderBy(fieldName),
      limit(5)
    )
  );
  const [users] = useCollectionData(q);
  const createQuery = (name: string) => {
    const fullName = toUpperFirstChar(name.trim());
    return query(
      db.collections.users,
      ...createWhereForStringSearch(fieldName, fullName),
      orderBy(fieldName),
      limit(5)
    );
  };

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Autocomplete
          id="location"
          onChange={(event, value) => onChange(value ? value : undefined)}
          options={users ? users.map((user) => user.location) : ["Not find"]}
          renderInput={(params) => (
            <TextField
              onChange={(event) => {
                setQ(createQuery(event.target.value));
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
