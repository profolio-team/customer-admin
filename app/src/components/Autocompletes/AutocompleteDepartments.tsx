import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { documentId, limit, orderBy, query, where } from "firebase/firestore";
import { Control, Controller } from "react-hook-form";
import db from "../../services/firebase/firestore";
import { QueryConstraint } from "@firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";

export function AutocompleteDepartments({ control }: { control: Control<UserInfo> }) {
  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        const [queryConstraint, setQueryConstraint] = useState<QueryConstraint[]>(
          value ? [where(documentId(), "in", [value])] : []
        );
        const [users, loading] = useCollectionOnce(
          query(db.collections.departments, ...queryConstraint)
        );
        const [options, setOptions] = useState([{ value: "", label: "Loading.." }]);
        const [first, setFirst] = useState(true);

        useEffect(() => {
          if (users) {
            setOptions(
              users.docs.map((user) => {
                return {
                  label: user.data().name,
                  value: user.id,
                };
              })
            );
          }
        }, [users]);
        return (
          <Autocomplete
            loading={loading}
            id={"department"}
            onChange={(event, value) => {
              onChange(value ? value.value : undefined);
              if (value) {
                setFirst(true);
              }
            }}
            value={
              first
                ? options.find((p) => p.value === value)
                  ? options.find((p) => p.value === value)
                  : null
                : null
            }
            options={options}
            onInputChange={(event, value: string, reason: string) => {
              if ((reason === "reset" && !value) || reason === "clear" || reason === "input") {
                const valueForFind = reason === "input" ? value : "";
                setFirst(false);
                setQueryConstraint([
                  where("name", ">=", `${valueForFind}`),
                  where("name", "<=", `${valueForFind}~`),
                  orderBy("name"),
                  limit(5),
                ]);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Department" />}
          />
        );
      }}
      name={"departmentId"}
      control={control}
    />
  );
}
