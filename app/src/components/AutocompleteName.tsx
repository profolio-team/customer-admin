import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../services/firebase/firestore";
import { limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import { FilteringFields } from "../views/Users/UsersPage";
import { createWhereForStringSearch, toUpperFirstChar } from "./Autocompletes/utils";

export function AutocompleteName({ control }: { control: Control<FilteringFields> }) {
  const [q, setQ] = useState(
    query(
      db.collections.users,
      ...createWhereForStringSearch("firstName", ""),
      orderBy("firstName"),
      startAfter(0),
      limit(5)
    )
  );
  const [users] = useCollectionData(q);
  const createQuery = (name: string) => {
    const fullName = toUpperFirstChar(name.trim()).split(" ");
    if (fullName.length > 1) {
      const firsName = fullName[0];
      const lastName = toUpperFirstChar(fullName[1]);
      return query(
        db.collections.users,
        ...createWhereForStringSearch("lastName", lastName),
        where("firstName", "==", firsName),
        orderBy("firstName"),
        limit(5)
      );
    }

    return query(
      db.collections.users,
      ...createWhereForStringSearch("firstName", fullName[0]),
      orderBy("firstName"),
      limit(5)
    );
  };
  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Autocomplete
          disablePortal
          id="fullName"
          onChange={(event, value) => onChange(value ? value : undefined)}
          options={users ? users.map((u) => `${u.firstName} ${u.lastName}`) : ["Not find"]}
          renderInput={(params) => (
            <TextField
              onChange={(event) => {
                setQ(createQuery(event.target.value));
              }}
              {...params}
              label="Full name"
            />
          )}
        />
      )}
      name="name"
      control={control}
    />
  );
}
