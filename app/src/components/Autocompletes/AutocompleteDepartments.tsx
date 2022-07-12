import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { limit, orderBy, query, where } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import db from "../../services/firebase/firestore";
import { QueryConstraint } from "@firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";

export function AutocompleteDepartments({
  control,
}: {
  control: Control<UserInfo>;
  fieldName: keyof UserInfo;
}) {
  const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>([]);
  const [users] = useCollectionOnce(
    query(db.collections.departments, ...queryConstraint, orderBy("name"), limit(5))
  );
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
          id={"department"}
          onChange={(event, value) => {
            onChange(value ? value.value : undefined);
          }}
          value={value ? options.find((option) => option.value === value) : null}
          options={options}
          renderInput={(params) => (
            <TextField
              onChange={(event) => {
                setQueryConstraint([
                  where("name", ">=", event.target.value),
                  where("name", "<=", `${event.target.value}~`),
                ]);
              }}
              {...params}
              label="Department"
            />
          )}
        />
      )}
      name={"departmentId"}
      control={control}
    />
  );
}
