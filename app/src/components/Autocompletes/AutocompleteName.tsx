import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import db from "../../services/firebase/firestore";
import { limit, orderBy, query, startAfter } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import { FilteringFields } from "../../views/Users/UsersPage";
import { createQueryConstraint } from "./utils";
import { QueryConstraint } from "@firebase/firestore";

export function AutocompleteName({ control }: { control: Control<FilteringFields> }) {
  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>(
    createQueryConstraint("")
  );
  const [users] = useCollectionData(
    query(db.collections.users, orderBy("firstName"), ...queryConstraint, startAfter(0), limit(5))
  );
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
                setQueryConstraint(createQueryConstraint(event.target.value));
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
