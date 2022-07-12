import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { limit, orderBy, query } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import { createWhereForStringSearch, toUpperFirstChar } from "./utils";
import { QueryConstraint } from "@firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";

export function AutocompleteDataInDB({
  control,
  fieldName,
  label,
}: {
  control: Control<UserInfo>;
  fieldName: keyof UserInfo;
  label: string;
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
          options={users ? users.map((user) => user[fieldName]) : ["Not find"]}
          renderInput={(params) => (
            <TextField
              onChange={(event) => {
                createQueryConstraint(event.target.value);
              }}
              {...params}
              label={label}
            />
          )}
        />
      )}
      name={fieldName}
      control={control}
    />
  );
}
