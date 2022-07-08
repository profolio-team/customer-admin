import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { limit, orderBy, query, where } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import { FilteringFields } from "./UsersPage";
import db from "../../services/firebase/firestore";

export function AutocompleteDepartments({
  control,
  fieldName,
}: {
  control: Control<FilteringFields>;
  fieldName: keyof FilteringFields;
}) {
  const [q, setQ] = useState(query(db.collections.departments, orderBy("name"), limit(5)));
  const [users] = useCollectionOnce(q);
  const createQuery = (name: string) => {
    return query(
      db.collections.departments,
      where("name", ">=", name),
      where("name", "<=", `${name}~`),
      orderBy("name"),
      limit(5)
    );
  };
  const options = users
    ? users.docs.map((user) => {
        return {
          label: user.data().name,
          value: user.id,
        };
      })
    : [{ label: "Not find", value: "" }];
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          id="location"
          onChange={(event, value) => {
            onChange(value ? value.value : undefined);
          }}
          value={value ? options.find((option) => option.value === value) : null}
          options={options}
          renderInput={(params) => (
            <TextField
              onChange={(event) => {
                setQ(createQuery(event.target.value));
              }}
              {...params}
              label="Department"
            />
          )}
        />
      )}
      name={fieldName}
      control={control}
    />
  );
}
